/**This component is responsible for presenting the logged in customer details */
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AccountProfile } from '../../DashboardLayout/account-profile';
import { CustomerType } from '../../ClientTypes/Models/CustomerModel';

type Props = {
  token: string
}

const CustomerDetails: React.FC<Props> = (props) => {
  const [finished, setFinished] = useState<boolean>(false);
  const [customerDetails, setCustoemrDetails] = useState<CustomerType>(null);
  const history = useHistory();

  /*Getting the customer details from backend */
  const getCustomerDetails = async () => {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: { "Content-Type": "application/json", "token": props.token }
    };
    let response
    try {
      response = await fetch("http://localhost:8080/customerApi/getCustomerDetails", requestOptions);
    } catch (error) {
    }
    if (!response.ok) {
      if (await response.text() === "Service is not found")
        history.push('/login')
      else {
        history.push('/PageNotFound')
      }
    }
    const data = await response.json();
    setCustoemrDetails(data);
    setFinished(true)
  }

  useEffect(() => {
    getCustomerDetails();
  }, [])

  return (
    <Fragment>
      {finished &&
        <AccountProfile firstName={customerDetails.firstName} lastName={customerDetails.lastName} email={customerDetails.email} password={customerDetails.password} />
      }
    </Fragment>
  );
};

export default CustomerDetails;