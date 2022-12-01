/** 
*This component is responsible for displaying all the customer's coupons -  coupons that had been purchased by the customer
 * It also loads one or none of the three components: AddCoupon, DeleteCoupon, UpdateCoupon
 * It also  gives the possibility to load  all the company coupons
 * or filtered by maxPrice or filtered by category
*/
import React, { useCallback, useEffect, useState } from 'react';
import CouponList from '../../ClientTypes/ModelsList/CouponList';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, CircularProgress } from '@mui/material';
import { useHistory } from 'react-router-dom';


type Props = {
  token: string
}

const CustomerCoupons: React.FC<Props> = (props) => {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState("");
  const [click, setClick] = useState(false);
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [filterError, setFilterError] = useState<boolean>(false);
  const [side, setSide] = useState<boolean>(false);
  const maxPriceRef = React.useRef<HTMLInputElement>(null);
  const history = useHistory();
  const theme = createTheme();

  /*to filter coupons by selected maxPrice */
  const priceHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (maxPriceRef.current.value !== '') {
      setFilterError(false);
      setAction("filterByMaxPrice");
      setClick(!click);
    }
    else {
      setFilterError(true);
      setSide(false);
    }
  }

  /*to filter coupons by selected category */
  const categoryHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (categoryValue !== '') {
      setFilterError(false);
      setAction("filterByCategory");
      setClick(!click)
    }
    else {
      setFilterError(true);
      setSide(true);
    }
  }
  /*to display all the customer's coupons */
  const allHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterError(false);
    setAction("showAll");
    setClick(!click);
  }

  /*getting the customer's coupons, all the customer's coupons / coupons filtered by maxPrice / coupons filtered by category 
 according to the action state value */
  const fetchHandler = useCallback(async () => {
    setIsLoading(true);
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: { "Content-Type": "application/json", "token": props.token },
    }
    let response
    try {
      switch (action) {
        case "":
        case "showAll":
          response = await fetch("http://localhost:8080/customerApi/getCustomerCoupons", requestOptions);
          break;
        case "filterByCategory":
          response = await fetch(`http://localhost:8080/customerApi/getCustomerCouponsByCategory/${categoryValue}`, requestOptions);
          break;
        case "filterByMaxPrice":
          response = await fetch(`http://localhost:8080/customerApi/getCustomerCouponsByMaxPrice/${maxPriceRef.current.value}`, requestOptions);
          break;
        default:
          response = await fetch("http://localhost:8080/customerApi/getCustomerCoupons", requestOptions);
          break;
      }
    } catch (error) {
      history.push('/PageNotFound')
    }
    if (!response.ok) {
      if (await response.text() === "Service is not found")
        history.push('/login')
      else {
        history.push('/PageNotFound')
      }
    }
    const data = await response.json();
    setCoupons(data);
    setIsLoading(false);
    setCategoryValue('');
    maxPriceRef.current.value = '';
  }, [click])

  useEffect(() => {
    fetchHandler();
  }, [click])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container maxWidth="sm">
          <Typography
            component="h2"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            My Coupons
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Box sx={{ minWidth: 120 }}>
              <FormControl>
                <InputLabel >Choose </InputLabel>
                <Select
                  label="category"
                  onChange={(e) => { setCategoryValue(e.target.value); }}
                  value={categoryValue}
                  sx={{ width: 150 }}
                >
                  <MenuItem value='FURNITURE' >Furniture</MenuItem>
                  <MenuItem value='TOYS' >Toys</MenuItem>
                  <MenuItem value='FOOD'>Food</MenuItem>
                  <MenuItem value='ELECTRICITY' >Electricity</MenuItem>
                </Select>
                <Button variant="contained" onClick={categoryHandler} sx={{ width: 150 }}>Filter By Category</Button>
              </FormControl>
              &nbsp; &nbsp; &nbsp;
              <Button variant="outlined" onClick={allHandler} sx={{ width: 150, mt: 5, fontWeight: "bold" }}>Show All Coupons</Button>
              &nbsp; &nbsp; &nbsp;
              <FormControl  >
                <TextField id="maxPrice" label="Filter By Price" variant="outlined" inputRef={maxPriceRef} type="number" sx={{ width: 150 }} />
                <Button id="maxPrice" variant="contained" onClick={priceHandler} sx={{ width: 150 }}>Filter By Price</Button>
                {!side && filterError && <Alert sx={{ width: 180 }} severity="error">Enter a value! </Alert>}
              </FormControl  >
              {side && filterError && <Alert sx={{ width: 180 }} severity="error">Enter a value! </Alert>}
            </Box>
          </Stack>
        </Container>
        <Container sx={{ py: 8 }} >
          <Grid container spacing={4}>
            {!isLoading && coupons.length > 0 &&
              <CouponList couponList={coupons} token={props.token} />}
            {!isLoading && coupons.length === 0 && <p>No coupons Found.</p>}
            {isLoading && <Box sx={{ display: 'flex', mx: "50%" }}>
              <CircularProgress />
            </Box>}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default CustomerCoupons;