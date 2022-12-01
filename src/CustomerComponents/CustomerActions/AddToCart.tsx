/*This component is responsible for  displaying all the coupons from all the companies participating in the system 
-  the customers can purchase them*/
import { CouponType } from '../../ClientTypes/Models/CouponModel';
import CouponList from '../../ClientTypes/ModelsList/CouponList';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Fragment, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { useHistory } from 'react-router-dom';

type Props = {
  token?: string
  onAddToCart?: (coupon: CouponType) => void
  idsAddedToCart?: number[]
}

const AddToCart: React.FC<Props> = (props) => {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(10)
  const theme = createTheme();
  const history = useHistory();
  const pageSize = 25;


  const changeHandler = (e, p) => {
    setPage(p)
  }

  /*getting all the coupons from the backend*/
  const showAllCoupons = async () => {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: { "Content-Type": "application/json", "token": props.token },
    };
    let response;
    try {
      response = await fetch("http://localhost:8080/customerApi/displayAllCoupons", requestOptions);
    } catch (e) {
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
    setCount(Math.ceil(data.length / pageSize))
    const pageData = data.slice((page * pageSize) - pageSize, page * pageSize);
    setCoupons(pageData);
    setIsLoading(false)
  }

  useEffect(() => {
    showAllCoupons();
  }, [page])

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h3"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Purchase Our Coupons
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} >
            <Grid container spacing={4}>
              {isLoading && <p>Loading...</p>}
              {!isLoading && <CouponList couponList={coupons} token={props.token} onAddToCart={props.onAddToCart} idsAddedToCart={props.idsAddedToCart} />}
            </Grid>
          </Container>
          <Grid sx={{ alignItems: "center", mx: "6" }}>
            <Pagination style={{ display: "flex", justifyContent: "center" }}
              count={count}
              variant="outlined"
              color="primary"
              size="large"
              page={page}
              onChange={changeHandler}
            />
          </Grid>
        </main>
      </ThemeProvider>
    </Fragment>
  );
};

export default AddToCart;