import React, { useCallback, useEffect, useState } from 'react';
import { CouponType } from '../../ClientTypes/Models/CouponModel';
import CouponList from '../../ClientTypes/ModelsList/CouponList';
import DeleteCoupon from './DeleteCoupon';
import UpdateCoupon from './UpdateCoupon';
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
  reload: boolean
}

const ShowCoupons: React.FC<Props> = (props) => {
  const maxPriceRef = React.useRef<HTMLInputElement>(null);
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [couponIdForRemove, setCouponIdForRemove] = useState<number>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [couponToUpdate, setCouponToUpdate] = useState<CouponType>(null);
  const [currency, setCurrency] = useState<string>("Choose one");
  const [filterError, setFilterError] = useState<boolean>(false);
  const [side, setSide] = useState<boolean>(false);
  const history = useHistory();
  const theme = createTheme();

  const updateCouponHandler = (dataForUpdate) => {
    const newState = coupons.map(couponToChange => { if (couponToChange.id === couponToUpdate.id) { return { ...couponToChange, title: dataForUpdate.title, description: dataForUpdate.description, startDate: dataForUpdate.startDate, endDate: dataForUpdate.endDate, amount: dataForUpdate.amount, price: dataForUpdate.price, category: dataForUpdate.category } } return couponToChange; });
    setCoupons(newState);
  }

  const onUpdate = (coupon: CouponType) => {
    setCouponToUpdate(coupon);
    setIsUpdating(true);
  }

  const onConfirm = () => {
    setIsUpdating(false)
  }

  const priceHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (maxPriceRef.current.value !== '') {
      setFilterError(false);
      setAction("filterByMaxPrice");
      setRefresh(!refresh);
    }
    else {
      setFilterError(true);
      setSide(false);
    }
  }

  const categoryHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (currency !== '') {
      setFilterError(false);
      setAction("filterByCategory");
      setRefresh(!refresh);
    }
    else {
      setFilterError(true);
      setSide(true);
    }
  }
  const showAllHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterError(false);
    setAction("showAll");
    setRefresh(!refresh);
  }

  const onDelete = (id: number) => {
    const couponsDummy = coupons;
    const removeIndex = couponsDummy.findIndex(item => item.id === id);
    coupons.splice(removeIndex, 1);
    setCoupons(couponsDummy)
    setCouponIdForRemove(id);
    setIsDeleting(true);
  }

  const onConfirmDelete = () => {
    setIsDeleting(false)
  }

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
          response = await fetch("http://localhost:8080/companyApi/getCompanyCoupons", requestOptions);
          break;
        case "filterByCategory":
          response = await fetch(`http://localhost:8080/companyApi/getCompanyCouponsByCategory/${currency}`, requestOptions);
          break;
        case "filterByMaxPrice":
          response = await fetch(`http://localhost:8080/companyApi/getCompanyCouponsByMaxPrice/${maxPriceRef.current.value}`, requestOptions);
          break;
        default:
          response = await fetch("http://localhost:8080/companyApi/getCompanyCoupons", requestOptions);
          break;
      }
    } catch (error) { }
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
    setCurrency('');
    maxPriceRef.current.value = '';
  }, [refresh, props.reload]);

  useEffect(() => {
    fetchHandler()
  }, [refresh])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container maxWidth='sm'>
          <Typography
            component="h2"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Company Coupons
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Box sx={{ minWidth: 120 }} >
              <FormControl >
                <InputLabel >Choose</InputLabel>
                <Select
                  onChange={(e) => { setCurrency(e.target.value) }}
                  value={currency}
                  sx={{ width: 150 }}
                  label="category" >
                  <MenuItem value='FURNITURE' >Furniture</MenuItem>
                  <MenuItem value='TOYS' >Toys</MenuItem>
                  <MenuItem value='FOOD'>Food</MenuItem>
                  <MenuItem value='ELECTRICITY' >Electricity</MenuItem>
                </Select>
                <Button variant="contained" onClick={categoryHandler} sx={{ width: 150, mt: 1, backgroundColor: "#115293" }}>Filter By Category</Button>
              </FormControl>
              &nbsp; &nbsp; &nbsp;
              <Button variant="outlined" onClick={showAllHandler} sx={{ width: 150, mt: 5, fontWeight: "bold" }} >Show All Coupons</Button>
              &nbsp; &nbsp; &nbsp;
              <FormControl  >
                <TextField id="maxPrice" label="Filter Price" variant="outlined" sx={{ width: 150 }} type='number' inputRef={maxPriceRef} />
                <Button id="maxPrice" variant="contained" onClick={priceHandler} sx={{ width: 150, backgroundColor: "#115293", mt: 1 }} >Filter By Price</Button>
                {!side && filterError && <Alert sx={{ width: 180 }} severity="error">Enter a value! </Alert>}
              </FormControl  >
              {side && filterError && <Alert sx={{ width: 180 }} severity="error">Enter a value! </Alert>}
            </Box>
          </Stack>
        </Container>
        <Container sx={{ py: 8 }} >
          <Grid container spacing={8}>
            {!isLoading && coupons.length > 0 &&
              <CouponList couponList={coupons} token={props.token} onDelete={onDelete} onUpdate={onUpdate} />}
            {!isLoading && coupons.length === 0 && <p>No coupons Found.</p>}
            {isLoading && <Box sx={{ display: 'flex', mx: "50%" }}>
              <CircularProgress />
            </Box>}
            {isDeleting && <DeleteCoupon token={props.token} onConfirmDelete={onConfirmDelete} id={couponIdForRemove} />}
            {isUpdating && <UpdateCoupon token={props.token} coupon={couponToUpdate} onConfirm={onConfirm}  updateCoupon={updateCouponHandler} />}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default ShowCoupons;