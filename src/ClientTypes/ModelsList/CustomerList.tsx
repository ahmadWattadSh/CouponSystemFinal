import { Fragment } from "react"
import Customer, { CustomerType } from "../Models/CustomerModel";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';



type Props = {
  customerList: CustomerType[]
  token: string
  onDelete?: (id: number) => void
  onUpdate?: (customer: CustomerType) => void
}

const CustomerList: React.FC<Props> = (props) => {
  return (
    <Fragment>
      {props.customerList.map((customer) => (
        <Grid item key={customer.id} xs={2} sm={3} md={4}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Customer
              key={customer.id}
              id={customer.id}
              firstName={customer.firstName}
              lastName={customer.lastName}
              password={customer.password}
              email={customer.email}
              onUpdate={props.onUpdate}
              onDelete={props.onDelete}
            />
          </Card>
        </Grid>
      ))}
    </Fragment>
  );
};

export default CustomerList;