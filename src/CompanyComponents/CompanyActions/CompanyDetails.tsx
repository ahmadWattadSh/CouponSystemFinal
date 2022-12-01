import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AccountProfile } from '../../DashboardLayout/account-profile';

type Company = {
  id: number,
  name: string,
  email: string,
  password: string
}

type Props = {
  token: string
}

const CompanyDetails: React.FC<Props> = (props) => {
  const [finished, setFinished] = useState<boolean>(false);
  const [companyDetails, setCompanyDetails] = useState<Company>(null);
  const history = useHistory();

  const getCompanyDetails = async () => {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: { "Content-Type": "application/json", "token": props.token }
    };
    let response
    try {
      response = await fetch("http://localhost:8080/companyApi/getCompanyDetails", requestOptions);
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
    setCompanyDetails(data);
    setFinished(true)
  }

  useEffect(() => {
    getCompanyDetails();
  }, [])
  
  return (
    <Fragment>
      {finished &&
        <AccountProfile name={companyDetails.name} email={companyDetails.email} password={companyDetails.password} />}
    </Fragment>
  );
};

export default CompanyDetails;