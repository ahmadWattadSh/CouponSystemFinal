/*This component is responsible for presenting the coupons added to the cart by the customer and the purchase details */
import { CouponType } from '../../ClientTypes/Models/CouponModel';
import CouponList from '../../ClientTypes/ModelsList/CouponList';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Fragment, useState } from 'react';
import { Alert, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useHistory } from 'react-router-dom';

type Props = {
  token?: string
  coupons?: CouponType[]
  couponsReset: () => void
  couponsToSend?: CouponType[]
  totalPrice?: number
  onPurchase?: () => void
  onRemoveFromCart?: (coupon: CouponType) => void
}

const Cart: React.FC<Props> = (props) => {
  const [checkList, setCheckList] = useState([])
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [click, setClick] = useState(false);
  const history = useHistory()
  const theme = createTheme();

  const style = {
    width: '100%',
    maxWidth: 800,
    bgcolor: 'background.paper',
  };

  /*post method - the customer purchasing the coupon in the backend */
  const purchaseHandler = async () => {
    {
      let requestOptions: RequestInit = {
        method: 'POST',
        headers: { "Content-Type": "application/json", "token": props.token },
        body: JSON.stringify(props.couponsToSend)
      };
      let response
      try {
        response = await fetch("http://localhost:8080/customerApi/purchaseAllCoupons", requestOptions);
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
      setCheckList(data);
      setIsOpen(true);
      props.onPurchase();
    }
    setClick(true);
    props.couponsReset();
  }

  return (
    <Fragment>
      {!click && <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Details
            </Typography>
          </Container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="left">Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Price</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center" />
                </TableRow>
              </TableHead>
              <TableBody>
                {props.couponsToSend.map((row) => (
                  <TableRow
                    key={row.title}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center" >${row.price}</TableCell>
                    <TableCell align="center"><Button variant="outlined" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { props.onRemoveFromCart(row) }}>Delete</Button></TableCell>
                  </TableRow>))}
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Total Price:${props.totalPrice}</TableCell>
                  <TableCell align="center" />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Container sx={{ py: 8 }} >
            <Grid container spacing={4}>
              <CouponList token={props.token} couponList={props.coupons}></CouponList>
            </Grid>
            <br /><br /><br /><br />
            <Button size='medium' variant='contained' onClick={purchaseHandler} disabled={props.totalPrice > 0 ? false : true}>Purchase All</Button>
          </Container>
        </main>
      </ThemeProvider>}
      {click && isOpen && <List sx={style} component="nav" aria-label="mailbox folders">
        {checkList.map((item) => <ListItem key={item.id}>
          {item.includes('successfully') && <Alert style={{
            width: '100%',
          }} severity="success"> {item} </Alert>}
          {!item.includes('successfully!') && <Alert style={{
            width: '100%',
          }} severity="error"> {item}</Alert>}
        </ListItem>)}
      </List>}
    </Fragment>
  );
};

export default Cart;