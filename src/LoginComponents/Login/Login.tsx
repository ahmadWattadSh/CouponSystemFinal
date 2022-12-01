/**
 * This component is responsible for the login page. It checks the email, password and type in the database and if all are valid,
 * it redirects to the desired dashboard.
 * 
 * 
 */
import React, { useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Alert, InputLabel, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import loginImage from '../../Assets/images/LoginImage.avif'

type EmailAction = {
  type: string,
  val?: string
}

type PasswordAction = {
  type: string,
  val?: string
}

type State = {
  val: string | undefined
  isValid: boolean | undefined
}

//It validates the email according to the input and blur
const emailReducer = (state: State, action: EmailAction): State => {
  if (action.type === 'USER_INPUT') {
    if (action.val === undefined) {
      return;
    } else {
      const newState = {
        val: action.val,
        isValid: action.val.includes('@')
      }
      return newState;
    }
  }
  if (action.type === 'INPUT_BLURE') {
    if (state.val === undefined) {
      return;
    } else {
      const newState = {
        val: state.val,
        isValid: state.val.includes('@')
      }
      return newState;
    }
  }
  return state;
}

//It validates the password according to the input and blur
const passwordReducer = (state: State, action: PasswordAction): State => {
  if (action.type === 'USER_INPUT') {
    if (action.val === undefined) {
      return;
    } else {
      const newState = {
        val: action.val,
        isValid: action.val.trim().length > 6
      }
      return newState;
    }
  }
  if (action.type === 'INPUT_BLURE') {
    if (state.val === undefined) {
      return;
    } else {
      const newState = {
        val: state.val,
        isValid: state.val.trim().length > 6
      }
      return newState;
    }
  }
  return state;
}

type Props = {
}

const Login: React.FC<Props> = (props) => {
  const theme = createTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState<boolean>();
  const [formIsValid, setFormIsValid] = useState<boolean>();
  const [clientType, setClientType] = useState<string>("choose one");
  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    val: '',
    isValid: undefined
  });
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
    val: '',
    isValid: undefined
  });

  // once email, password and type are valid, the login button is enabled
  useEffect(() => {
    setFormIsValid(emailState.isValid && passwordState.isValid && (clientType !== "choose one"));
  }, [emailState.isValid, passwordState.isValid, clientType]);

  //traces all the written changes in email input and checks validation
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const action: EmailAction = { type: 'USER_INPUT', val: event.target.value };
    dispatchEmailState(action);
  };

  //traces all the written changes in email input and checks validation
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const action: PasswordAction = { type: 'USER_INPUT', val: event.target.value };
    dispatchPasswordState(action);
  };

  //onblur checks the validation of email
  const validateEmailHandler = () => {
    dispatchEmailState({ type: 'INPUT_BLURE' });
  };

  //onblur checks the validation of password
  const validatePasswordHandler = () => {
    dispatchPasswordState({ type: 'INPUT_BLURE' })
  };

  // when all details of user are submitted, it requests validation from backend to confirm the user's details and redirect to the desired dashboard. 
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestOptions = {
      method: 'GET',
    };
    let response
    let data
    switch (clientType) {
      case "Company":
        response = await fetch(`http://localhost:8080/companyApi/login/${emailState.val}/${passwordState.val}`, requestOptions);
        data = await response.text();
        if (data === "Invalid User")
          setLoginError(true);
        else {
          dispatch(authActions.login(data))
          history.push('/login/Company');
        }
        break;
      case "Customer":
        response = await fetch(`http://localhost:8080/customerApi/login/${emailState.val}/${passwordState.val}`, requestOptions);
        data = await response.text();
        if (data === "Invalid User")
          setLoginError(true);
        else {
          dispatch(authActions.login(data))
          history.push('/login/Customer');
        }
        break;
      case "Admin":
        response = await fetch(`http://localhost:8080/adminApi/login/${emailState.val}/${passwordState.val}`, requestOptions);
        data = await response.text();
        if (data === "Invalid User")
          setLoginError(true);
        else {
          dispatch(authActions.login(data))
          history.push('/login/Admin');
        }
        break;
    }
  };

  //traces select changes of category
  const selectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientType(event.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      {/* the picture design */}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={10}
          md={7}
          sx={{
            backgroundImage: `url(${loginImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* the sign in design */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" >
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 1, alignItems: 'center' }}>
              <TextField
                error={!emailState.isValid && emailState.isValid !== undefined}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={emailState.val}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
              />
              <TextField
                error={!passwordState.isValid && passwordState.isValid !== undefined}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={passwordState.val}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
              />
              <InputLabel sx={{ marginLeft: 24 }} id="demo-simple-select-label">Select</InputLabel>
              <Select sx={{ marginLeft: 20 }}
                size='small'
                value={clientType}
                label="select"
                onChange={selectHandler}>
                <MenuItem key="choose one" value="choose one">choose one</MenuItem>
                <MenuItem key="Admin" value="Admin">Admin</MenuItem>
                <MenuItem key="Customer" value="Customer">Customer</MenuItem>
                <MenuItem key="Company" value="Company">Company</MenuItem>
              </Select>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!formIsValid}
              >
                Sign In
              </Button>
              {loginError && <Alert severity="error">Login Failed: Either email or password is incorrect!</Alert>}
              <Stack direction="column" alignContent="center" alignItems="center">
                <Grid item sx={{ my: 2 }}>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                <Grid item sx={{ my: 3, padding: 1, border: "solid", borderColor: "rgb(105, 130, 195,0.5)" }} >
                  <Link href="/welcome" variant="h6" sx={{
                    '&:hover': {
                      color: 'rgb(24, 37, 69)',
                    }
                  }}>
                    <Grid direction="row">
                      <Grid item sx={{}}>
                        {"Home"}
                      </Grid>
                      <Grid item sx={{ ml: 2 }}>
                        <HomeIcon></HomeIcon>
                      </Grid>
                    </Grid>
                  </Link>
                </Grid>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;