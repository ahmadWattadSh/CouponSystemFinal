/**
 * This component is responsible for adding new company in the backend and frontend 
 */
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { CompanyType } from "../../ClientTypes/Models/CompanyModel";
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
  finishAdding: (company: CompanyType) => void
}
const AddCompany: React.FC<Props> = (props) => {

  const nameRef = React.useRef<HTMLInputElement>(null);
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

  //It requsests to add the company to the backend, if it has error it goes to error page and resets the details
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataToSend = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordState?.val
    }
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { "Content-Type": "application/json", "token": props.token },
      body: JSON.stringify(dataToSend)
    };

    let response
    try {
      response = await fetch("http://localhost:8080/adminApi/addCompany", requestOptions);
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
    const company = {
      id: idFromDB,
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordState?.val

    }
    props.finishAdding(company);
    nameRef.current.value = ""
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
              Add New Company
            </Typography>
            <Button onClick={cancelHandler} variant="text" >
              Cancel
            </Button>
            <Button type='submit' variant="text" >
              Add Company
            </Button>
          </Toolbar>
        </AppBar>
        {/* layer to add on*/}
        <Paper sx={{ height: '60vh', backgroundColor: "transparent" }}>
          <Paper sx={{
            height: '50vh', mx: "30%", my: "6%",
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
                <TextField sx={{ mt: 6, fontWeight: "bold" }}
                  required
                  label="Name"
                  variant="standard"
                  inputRef={nameRef}
                />
                <TextField sx={{ fontWeight: "bold" }}
                  type="email"
                  required
                  label="Email"
                  variant="standard"
                  inputRef={emailRef}
                />
                <TextField sx={{ mb: 2, fontWeight: "bold" }}
                  required
                  label="Password"
                  variant="standard"
                  error={!passwordState.isValid && passwordState.isValid !== undefined}
                  value={passwordState.val}
                  onChange={passwordChangeHandler}
                />
                <br />
              </Stack>
              <Grid container alignItems="center" >
                <Grid item sx={{ my: 3, ml: 10 }}>
                  <Button onClick={cancelHandler} variant="contained" >
                    Cancel
                  </Button>
                </Grid>
                <Grid item sx={{ my: 3, mx: 5 }}>
                  <Button type='submit' variant="contained" disabled={passwordState.isValid ? false : true} >
                    Add Company
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Paper>
          <br />
        </Paper>
      </Paper>
    </form>
  );
};

export default AddCompany;