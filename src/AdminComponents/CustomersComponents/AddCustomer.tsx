/**
 * This component is responsible for adding new Customer in the backend and frontend 
 */
import React, { useState } from "react";
import { CustomerType } from "../../ClientTypes/Models/CustomerModel";
import { Stack } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from "react-router-dom";
import img1 from "../../Assets/images/tamanna-rumee-pny3ApzBVEk-unsplash.jpg"

type Props = {
  token?: string
  cancel: () => void
  finish: (customer: CustomerType) => void
}

const AddCustomer: React.FC<Props> = (props) => {
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const [passwordState, setPasswordState] = useState({ val: '', isValid: undefined });
  const history = useHistory();

  //It sets the value of password at every moment and checks its validation length>6
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState({
      val: event.target.value,
      isValid: event.target.value.trim().length > 6
    })
  }

  //It requsests to add the customer to the backend, if it has error it goes to error page and resets the details
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataToSend = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordState?.val
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { "Content-Type": "application/json", "token": props.token },
      body: JSON.stringify(dataToSend)
    };

    let response;

    try {
      response = await fetch("http://localhost:8080/adminApi/addCustomer", requestOptions);
    }
    catch (e) {
      history.push('/PageNotFound')
    }

    if (!response.ok) {
      if (await response.text() === "Service is not found")
        history.push('/login')
      else {
        history.push('/PageNotFound')
      }
    }

    const idFromDB = await response.json();
    const customer = {
      id: idFromDB,
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordState?.val
    }
    props.finish(customer);
    firstNameRef.current.value = ""
    lastNameRef.current.value = ""
    emailRef.current.value = ""
    setPasswordState({ val: '', isValid: false })
  }

  // cancel the adding
  const cancelHandler = () => {
    props.cancel();
  }

  return (
    <form onSubmit={submitHandler}>
      <Paper sx={{ maxWidth: 1000, mx: "auto", overflow: 'hidden', backgroundImage: `url(${img1})`, backgroundSize: "cover" }}>
        {/* The appbar above*/}
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              Add New Customer
            </Typography>
            <Button onClick={cancelHandler} variant="text" >
              Cancel
            </Button>
            <Button type='submit' variant="text" >
              Add Customer
            </Button>
          </Toolbar>
        </AppBar>
        <Paper sx={{ height: '60vh', backgroundColor: "transparent" }}>
          <Paper sx={{
            height: '50vh', mx: "23%", my: "6%",
            backgroundColor: "rgba(244, 244, 244, 0.5)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
            borderRadius: "15px",
          }}>
            <Paper sx={{ height: '50vh', backgroundColor: "transparent" }}>
              <Stack direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4}
              >
                <Grid direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={4}
                >
                  <TextField sx={{ mt: 6, mx: 3, fontWeight: "bold" }}
                    required
                    label="firstName"
                    variant="standard"
                    inputRef={firstNameRef}
                  />
                  <TextField sx={{ mt: 6, mx: 3, fontWeight: "bold" }}
                    required
                    label="LastName"
                    variant="standard"
                    inputRef={lastNameRef}
                  />
                </Grid>
                <TextField sx={{ mb: 2, fontWeight: "bold" }}
                  required
                  label="Email"
                  variant="standard"
                  inputRef={emailRef}
                />
                <TextField sx={{ mb: 2, mt: 2, pt: 1, fontWeight: "bold" }}
                  required
                  label="Password"
                  error={!passwordState.isValid && passwordState.isValid !== undefined}
                  value={passwordState.val}
                  onChange={passwordChangeHandler}
                />
                <br />
              </Stack>
              <Grid container alignItems="center">
                <Grid item sx={{ my: 2, ml: 20 }}>
                  <Button onClick={cancelHandler} variant="contained" >
                    Cancel
                  </Button>
                </Grid>
                <Grid item sx={{ my: 2, mx: 3 }}>
                  <Button type='submit' variant="contained" disabled={passwordState.isValid ? false : true} >
                    Add Customer
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Paper>
        </Paper>
      </Paper>
    </form>);
};

export default AddCustomer;

