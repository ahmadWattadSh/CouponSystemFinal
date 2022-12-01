import React, { Fragment, useState } from 'react';
import { Box, InputAdornment, InputLabel, OutlinedInput, Snackbar, Stack } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MuiAlert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';
import img1 from "../../Assets/images/tamanna-rumee-pny3ApzBVEk-unsplash.jpg"

type Props = {
  token?: string
}

const AddCoupon: React.FC<Props> = (props) => {
  const history = useHistory()
  const [category, setCategory] = useState("")
  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLInputElement>(null);
  const startDateRef = React.useRef<HTMLInputElement>(null);
  const endDateRef = React.useRef<HTMLInputElement>(null);
  const amountRef = React.useRef<HTMLInputElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);
  const imageRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const drawerOpenHandler = () => {
    setOpen(true);
  };

  const alertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const selectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  }
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataToSend = {
      category: category,
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      startDate: new Date(startDateRef.current.value),
      endDate: new Date(endDateRef.current.value),
      amount: amountRef.current?.value,
      price: priceRef.current?.value,
      image: imageRef.current?.value
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { "Content-Type": "application/json", "token": props.token },
      body: JSON.stringify(dataToSend)
    };
    let response
    try {
      response = await fetch("http://localhost:8080/companyApi/addCoupon", requestOptions);
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
    const idFromDB = await response.text();
    setCategory(null)
    titleRef.current.value = ""
    descriptionRef.current.value = ""
    startDateRef.current.value = null
    endDateRef.current.value = null
    amountRef.current.value = ""
    priceRef.current.value = ""
    imageRef.current.value = ""
    drawerOpenHandler()
  }

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <Paper sx={{ maxWidth: 1000, height: '90vh', mx: "auto", overflow: 'hidden', backgroundImage: `url(${img1})`, backgroundSize: "cover" }}>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
          >
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                Add New Coupon
              </Typography>
              <Button type='submit' variant="text" >
                Add Coupon
              </Button>
            </Toolbar>
          </AppBar>
          <Paper sx={{ height: '90vh', backgroundColor: "transparent" }}>
            <Paper sx={{
              height: '75vh', mx: "20%", my: "6%",
              backgroundColor: "rgba(244, 244, 244, 0.5)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
              borderRadius: "15px",
            }}>
              <Paper sx={{ height: '75vh', backgroundColor: "transparent" }}>
                <Grid container
                  justifyContent="center"
                  spacing={3}
                  alignItems="center">
                  <Grid sx={{ mb: 2, fontWeight: "bold" }}>
                    <TextField sx={{ mt: 3, mx: 3, fontWeight: "bold" }}
                      required
                      label="Title"
                      variant="standard"
                      inputRef={titleRef}
                    />
                  </Grid>
                  <Box sx={{ minWidth: 180 }}>
                    <Grid sx={{ mt: 5, fontWeight: "bold" }}
                      style={{ marginLeft: "2em" }} >
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                          required
                          fullWidth
                          value={category}
                          label="Choose Category"
                          onChange={selectHandler}
                        >
                          <MenuItem value="FOOD">FOOD</MenuItem>
                          <MenuItem value="ELECTRICITY">ELECTRICITY</MenuItem>
                          <MenuItem value="FURNITURE">FURNITURE</MenuItem>
                          <MenuItem value="TOYS">TOYS</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={15} sx={{ alignSelf: "center" }}>
                  <TextField sx={{ mb: 3, mt: 2, fontWeight: "bold" }}
                    style={{ width: "60%", marginLeft: "20%" }}
                    required
                    label="Description"
                    variant="standard"
                    inputRef={descriptionRef}
                    multiline={true}
                    rows={2}
                  />
                </Grid>
                <Stack direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={4}
                  sx={{ mt: "2em" }}
                >
                  <TextField sx={{ mr: 5, fontWeight: "bold" }}
                    type="date"
                    inputRef={startDateRef}
                    required
                    label="Start-Date"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "12em" }}
                  />
                  <TextField sx={{ mb: 2, fontWeight: "bold" }}
                    inputRef={endDateRef}
                    type="date"
                    required
                    label="End-Date"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "12em" }}
                  />
                  <br />
                </Stack>
                <Stack direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={4}
                  sx={{ mt: "2em" }}
                >
                  <TextField sx={{ mr: 5, fontWeight: "bold" }}
                    type="number"
                    inputRef={amountRef}
                    required
                    label="Amount"
                    variant="outlined"
                  />
                  <FormControl sx={{ mb: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                    <OutlinedInput
                      inputRef={priceRef}
                      required
                      type="number"
                      id="outlined-adornment-amount"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Price"
                    />
                  </FormControl>
                  <br />
                </Stack >

                <Stack
                  direction="column"
                  spacing={2}
                  sx={{ mt: "2em" }}>
                  <Grid item sx={{ mb: 2, mt: 2, mx: 20 }}>
                    <TextField sx={{ fontWeight: "bold" }}
                      type="url"
                      required
                      label="URL Image"
                      variant="outlined"
                      inputRef={imageRef}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Stack>
                <Grid item sx={{ mb: 2, ml: 30, width: "30%" }}>
                  <Button type='submit' variant="contained" >
                    Add Coupon
                  </Button>
                </Grid>
              </Paper>
            </Paper>
          </Paper>
          <br />
        </Paper>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={alertClose}>
        <MuiAlert elevation={6} onClose={alertClose} sx={{ width: '100%' }}>
          Copoun was added successfully!
        </MuiAlert>
      </Snackbar>
    </Fragment>
  );
};

export default AddCoupon;