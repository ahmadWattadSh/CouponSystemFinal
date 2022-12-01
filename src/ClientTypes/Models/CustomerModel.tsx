import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export type CustomerType = {
  id?: number
  firstName: string
  lastName: string
  email: string
  password: string
}

type Props = {
  onUpdate: (company: CustomerType) => void,
  onDelete: (id: number | undefined) => void,
  id?: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string
  key: number
}

const Customer: React.FC<Props> = (props) => {

  const customer = {
    id: props.id,
    firstName: props.firstName,
    lastName: props.lastName,
    email: props.email,
    password: props.password
  }

  const updateHandler = () => {
    props.onUpdate(customer)
  }

  const deleteHandler = () => {
    props.onDelete(customer.id)
  }

  return (
    <Fragment>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h1">
          {props.firstName}
        </Typography>
        <Typography>
          {props.lastName}
        </Typography>
        <Typography>
          {props.email}
        </Typography>
        <Typography>
          {props.password}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={deleteHandler} variant="contained" size="small">Delete</Button>
        <Button onClick={updateHandler} variant="contained" size="small">Update</Button>
      </CardActions>
    </Fragment>
  );
};

export default Customer;