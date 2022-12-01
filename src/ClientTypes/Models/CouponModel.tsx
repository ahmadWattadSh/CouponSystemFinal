/**
 * This component is responsible for presenting coupon raw data received by the props from the couponList component to proper UI
 * It also loads the proper buttons (lift up)  - delete,update,addToCart
*/
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Fragment, useEffect, useState } from 'react';
import React from 'react';

export type CouponType = {
  id?: number
  category: string,
  title: string,
  description: string,
  startDate: string,
  endDate: string,
  amount: string,
  price: string,
  image?: string,
  companyId?: number
}

type Props = {
  onUpdate?: (coupon: CouponType) => void
  onDelete?: (id: number) => void,
  onAddToCart?: (coupon: CouponType) => void,
  id?: number,
  category: string | undefined,
  title: string | undefined,
  description: string | undefined,
  startDate: string | undefined,
  endDate: string | undefined,
  amount: string | undefined,
  price: string | undefined,
  image?: string | undefined,
  companyId?: number,
  idsAddedToCart?: number[]
}

const Coupon: React.FC<Props> = (props) => {
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  useEffect(() => {
    if (props.idsAddedToCart !== undefined) {
      if (props.idsAddedToCart.includes(props.id)) { setIsAddedToCart(true); }
    }
  }, [])

  const [click, setClick] = useState<boolean>(false);

  const coupon = {
    id: props.id,
    category: props.category,
    title: props.title,
    description: props.description,
    startDate: props.startDate,
    endDate: props.endDate,
    amount: props.amount,
    price: props.price,
    image: props.image,
    companyId: props.companyId,
  }

  const updateHandler = () => {
    props.onUpdate(coupon)
  }

  const deleteHandler = () => {
    props.onDelete(coupon.id)
  }

  const addToCartHandler = () => {
    setClick(true)
    props.onAddToCart(coupon)
  }

  return (
    <Fragment>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h1">
          {props.title}
        </Typography>
        <CardMedia
          component="img"
          sx={{
            pt: '1%',
          }}
          image={props.image}
          alt="random"
        />
        <p>{props.description}
        </p>
        <Button color='secondary' variant='contained' size="small" >
          {props.category}
        </Button>
        <Typography>
          placed on {props.startDate.toString()}
        </Typography>
        <Typography>
          expires on {props.endDate.toString()}
        </Typography>
        <Typography >
          Amount:{props.amount}
        </Typography>
        <> {props.onAddToCart === undefined && <Typography>Price: ${props.price}</Typography>}</>
      </CardContent>
      <CardActions>
        {props.onUpdate !== undefined && <Button onClick={updateHandler} variant="contained" size="small">Update</Button>}
        {props.onUpdate !== undefined && <Button onClick={deleteHandler} variant="contained" size="small">delete</Button>}
        {props.onAddToCart !== undefined && (!click && !isAddedToCart) && <Button onClick={addToCartHandler} variant="contained" size="small">Add To Cart&nbsp;&nbsp;${props.price}</Button>}
        {props.onAddToCart !== undefined && (click || isAddedToCart) && <div>Added to cart</div>}
      </CardActions>
    </Fragment>
  );
};

export default Coupon;