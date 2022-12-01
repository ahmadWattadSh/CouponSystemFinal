/**
 * This component is responsible for presenting company raw data received by the props from the companyList component to proper UI
 * It also loads the buttons (lift up)  - delete,update
*/
import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export type CompanyType = {
  id?: number
  name: string
  email: string
  password: string
}

type Props = {
  onUpdate: (company: CompanyType) => void,
  onDelete: (id: number) => void,
  id?: number,
  name: string,
  email: string,
  password: string
  key: number
}

const Company: React.FC<Props> = (props) => {

  const company = {
    id: props.id,
    name: props.name,
    email: props.email,
    password: props.password
  }


  const updateHandler = () => {
    props.onUpdate(company)
  }

  const deleteHandler = () => {
    props.onDelete(company.id)
  }

  return (
    <Fragment>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h1">
          {props.name}
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

export default Company;