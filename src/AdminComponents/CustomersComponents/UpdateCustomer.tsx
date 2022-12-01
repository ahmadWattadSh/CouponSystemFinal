/**
 * This component is responsible for updating a customer in the frontend
 * 
 */
import React, { Fragment, useState } from 'react';
import classes from './UpdateCustomer.module.css';
import { useHistory } from 'react-router-dom';
import { CustomerType } from '../../ClientTypes/Models/CustomerModel';
import Card from '../../LoginComponents/Card/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";

type Props = {
  token: string
  customer?: CustomerType
  onConfirm?: () => void
  updateCustomer: (dataForUpdate) => void
}
const UpdateCustomer: React.FC<Props> = (props) => {

  const [firstNameEditing, setFirstNameEditing] = useState<string>(props.customer.firstName);
  const [lastNameEditing, setLastNameEditing] = useState<string>(props.customer.lastName);
  const [emailEditing, setEmailEditing] = useState<string>(props.customer.email);
  const [finished, setFinished] = useState<boolean>(false);
  const [passwordState, setPasswordState] = useState({ val: props.customer.password, isValid: true });
  const history = useHistory();

  //it is for the validiation of the password. will not validate if not longer than 6 characters
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState({
      val: event.target.value,
      isValid: event.target.value.trim().length > 6
    })
  }

  const dataForUpdating = {
    firstName: firstNameEditing,
    lastName: lastNameEditing,
    email: emailEditing,
    password: passwordState.val,
  }

  //it updates the company in the backend, if error comes up  it opens the error page.
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataToSend = {
      id: props.customer.id,
      firstName: firstNameEditing,
      lastName: lastNameEditing,
      email: emailEditing,
      password: passwordState.val,
    }

    props.updateCustomer(dataForUpdating);

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: { "Content-Type": "application/json", "token": props.token },
      body: JSON.stringify(dataToSend)
    };
    let response
    try {
      response = await fetch("http://localhost:8080/adminApi/updateCustomer", requestOptions);
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
    console.log("it is updated");
    setFinished(true);
  }

  const content: JSX.Element | JSX.Element[] =
    <>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal} >
        <header className={classes.header}>
          <h2>Update Customer</h2>
        </header>
        <form onSubmit={submitHandler} >
          <Typography variant="h6" component="div" align="center" sx={{ my: 2, mx: 2, flexGrow: 1, fontWeight: "bold", }}>
          </Typography>
          <Stack
            direction="column"
            justifyContent="center"
            spacing={2}
            alignItems="center">
            <Grid container
              justifyContent="center"
              spacing={3} >
              <Grid sx={{ mb: 3, mt: 6, fontWeight: "bold" }}>
                <TextField sx={{ mx: 3, fontWeight: "bold" }}
                  label="First-Name"
                  variant="outlined"
                  value={firstNameEditing}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setFirstNameEditing(event.target.value) }}
                />
              </Grid>
              <Grid sx={{ mb: 3, mt: 6, fontWeight: "bold" }}>
                <TextField sx={{ mx: 3, fontWeight: "bold" }}
                  label="Last-Name"
                  variant="outlined"
                  value={lastNameEditing}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setLastNameEditing(event.target.value) }}
                />
              </Grid>
            </Grid>
            <Grid sx={{ my: 2, fontWeight: "bold" }}>
              <TextField sx={{ mx: 3, fontWeight: "bold" }}
                type="email"
                label="Email"
                variant="outlined"
                value={emailEditing}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmailEditing(event.target.value)}
              />
            </Grid>
            <Grid sx={{ my: 3, fontWeight: "bold" }}>
              <TextField sx={{ mt: 3, mb: 5, mx: 3, fontWeight: "bold" }}
                label="Password"
                variant="outlined"
                error={!passwordState.isValid}
                value={passwordState.val}
                onChange={passwordChangeHandler}
              />
            </Grid>
          </Stack>
          <footer className={classes.actions}>
            <Button type='submit' variant="contained" sx={{ mx: 3, }} disabled={passwordState.isValid ? false : true} >
              Update Customer
            </Button>
            <Button onClick={props.onConfirm} type="button" variant="contained" >
              Cancel
            </Button>
          </footer>
        </form>
      </Card>
    </>

  return (
    <Fragment>
      {!finished && content}
      {finished &&
        <>
          <div className={classes.backdrop} onClick={props.onConfirm} />
          <Card className={classes.modal} >
            <div className={classes.content}></div>
            <Grid item sx={{ ml: 9, mt: 5, mb: 3 }}>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "1.6em" }}
              >The customer was updated successfully</Typography>
            </Grid>
            <footer className={classes.actions}>
              <Button onClick={props.onConfirm}>Okay</Button>
            </footer>
          </Card>
        </>
      }
    </Fragment>
  );
};

export default UpdateCustomer;