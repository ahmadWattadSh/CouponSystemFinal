/**
 * This component is responsible for the layout of the entire admin dashboard:
 * Left-navBar - <adminButton> component is responsible for presenting it.
 * Header - <Header> component is responsible for presenting it.
 * Content - It shows one of the four possible outcomes:
 * 1. <AdminDashboardLayout> component 
 * 2. <ShowCompanies> component
 * 3. <ShowCustomers> component
 * 4. <AccountProfile> component
 * Timer - <Timer> is responsible for presenting it
 * 
 */
import React, { PropsWithChildren, useState } from 'react';
import CustomerButtons from './CustomerButtons';
import AddToCart from '../CustomerActions/AddToCart';
import CustomerCoupons from '../CustomerActions/CustomerCoupons';
import CustomerDetails from '../CustomerActions/CustomerDetails';
import Cart from '../CustomerActions/Cart';
import { CouponType } from '../../ClientTypes/Models/CouponModel';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from "../../DashboardLayout/Header";
import Timer from '../../Timer.tsx/Timer';
import theme from '../../AdminComponents/AdminLayout/Theme';
import CustomerDashboardLayout from './CustomerDashboardLayout';

const drawerWidth = 256;

type Props = {
}

const CustomerDashBoard: React.FC<PropsWithChildren<Props>> = (props) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [action, setAction] = useState<String>("");
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = useState(false);
  const [couponsToSend, setCouponsToSend] = useState([])
  const [idsAddedToCart, setIdsAddedToCart] = useState<number[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // responsible for opening and closing the navBar by the <Header>
  const handleDrawerToggle = (drawerAction: String) => {
    setOpen(!open);
    setAction(drawerAction)
  };

  //It sends the coupon to cart, updates the total price, adds it to the current coupons
  const onAddToCart = (coupon: CouponType) => {
    const dataToSend = {
      id: coupon.id,
      category: coupon.category,
      title: coupon.title,
      description: coupon.description,
      startDate: new Date(coupon.startDate),
      endDate: new Date(coupon.endDate),
      amount: coupon.amount,
      price: coupon.price,
      image: coupon.image,
    }

    setIdsAddedToCart([...idsAddedToCart, coupon.id]);
    setTotalPrice(totalPrice + Number.parseInt(coupon.price));
    setCouponsToSend([...couponsToSend, dataToSend]);
    setCoupons([...coupons, coupon]);
  }

  //reset total price and coupons sent to cart.
  const onPurchaseHandler = () => {
    setTotalPrice(0);
    setCouponsToSend([]);
    setIdsAddedToCart([]);
  }

  // responisble for changing the possible outcome for content. <AdminButton> is responsible for the change.
  const actionchange = (msg: String) => {
    setAction(msg)
  }

  //reset coupons
  const coupounsReset = () => {
    setCoupons([]);
  }

  //removes a coupon from cart
  const removeFromCart = (couponToDelete: CouponType) => {
    setCouponsToSend(couponsToSend.filter((item) => item.id !== couponToDelete.id));
    setIdsAddedToCart(idsAddedToCart.filter((item) => item !== couponToDelete.id));
    setTotalPrice(totalPrice - Number.parseInt(couponToDelete.price));
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        {!open && <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <CustomerButtons
            actionchange={actionchange}
          />
        </Box>}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} action={action} />
          <Timer />
          {action === "" && <CustomerDashboardLayout />}
          {action !== "" &&
            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
              {action === "add" && <AddToCart token={token} onAddToCart={onAddToCart} idsAddedToCart={idsAddedToCart} />}
              {action === "showAll" && <CustomerCoupons token={token} />}
              {action === "details" && <CustomerDetails token={token} />}
              {action === "cart" && <Cart couponsReset={coupounsReset} token={token} couponsToSend={couponsToSend} totalPrice={totalPrice} coupons={coupons} onPurchase={onPurchaseHandler} onRemoveFromCart={removeFromCart} />}
            </Box>}
        </Box>
      </Box>
    </ThemeProvider>
  )
};

export default CustomerDashBoard;