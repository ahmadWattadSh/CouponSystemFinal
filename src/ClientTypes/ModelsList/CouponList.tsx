/**
 * This component functions as a coupons' data passage it passes the data from the - ShowCoupons component(Company Component) 
 * or CustomerCoupons component(Customer Component) or AddToCart component(Customer Component) - to 
 * the CouponModel component through the props
 */
import { CouponType } from '../Models/CouponModel';
import Coupon from '../Models/CouponModel';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Fragment } from 'react';
import React from 'react';

type Props = {
  couponList: CouponType[]
  token: string
  onDelete?: (id: number) => void
  onUpdate?: (coupon: CouponType) => void
  onAddToCart?: (coupon: CouponType) => void
  idsAddedToCart?: number[]
}

const CouponList: React.FC<Props> = (props) => {
  return (<Fragment>
    {props.couponList.map((coupon) => (
      <Grid item key={coupon.id} xs={4} sm={5} md={3}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Coupon
            key={coupon.id}
            id={coupon.id}
            category={coupon.category}
            title={coupon.title}
            description={coupon.description}
            startDate={coupon.startDate}
            endDate={coupon.endDate}
            amount={coupon.amount}
            price={coupon.price}
            image={coupon.image}
            companyId={coupon.companyId}
            onUpdate={props.onUpdate}
            onDelete={props.onDelete}
            onAddToCart={props.onAddToCart}
            idsAddedToCart={props.idsAddedToCart}
          />
        </Card>
      </Grid>
    ))}
  </Fragment>
  );
};

export default CouponList;