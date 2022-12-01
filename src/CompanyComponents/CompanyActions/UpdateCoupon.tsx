/*This component is responsible for updating the coupon by the owning company */
import React, { Fragment, useState } from 'react';
import { CouponType } from '../../ClientTypes/Models/CouponModel';
import classes from '../CompanyLayout/UpdateCoupon.module.css';
import { useHistory } from 'react-router-dom';
import Card from '../../LoginComponents/Card/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, InputAdornment, InputLabel, OutlinedInput, Stack } from "@mui/material";



type Props = {
  token: string
  coupon?: CouponType
  onConfirm?: () => void
  updateCoupon: (dataForUpdate) => void
}
const UpdateCoupon: React.FC<Props> = (props) => {
  const [titleEditing, setTitleEditing] = useState<string>(props.coupon.title);
  const [categoryEditing, setCategoryEditing] = useState<string>(props.coupon.category);
  const [descriptionEditing, setDescriptionEditing] = useState<string>(props.coupon.description)
  const [amountEditing, setAmountEditing] = useState<string>(props.coupon.amount.toString())
  const [priceEditing, setPriceEditing] = useState<string>(props.coupon.price.toString())
  const [startDateEditing, setStartDateEditing] = useState<string>(props.coupon.startDate)
  const [endDateEditing, setEndDateEditing] = useState<string>(props.coupon.endDate)
  const [imageEditing, setImageEditing] = useState<string>(props.coupon.image)
  const [finished, setFinished] = useState<boolean>(false);
  const history = useHistory();

  const selectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryEditing(event.target.value);
  }


  const dataForUpdate = {
    title: titleEditing,
    description: descriptionEditing,
    amount: amountEditing,
    price: priceEditing,
    startDate: startDateEditing,
    category: categoryEditing,
    endDate: endDateEditing,
    image: imageEditing
  }

  /*Updating the coupon in the backend */
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataToSend = {
      id: props.coupon.id,
      category: categoryEditing,
      title: titleEditing,
      description: descriptionEditing,
      startDate: new Date(startDateEditing),
      endDate: new Date(endDateEditing),
      amount: amountEditing,
      price: priceEditing,
      image: imageEditing
    }
    props.updateCoupon(dataForUpdate);

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: { "Content-Type": "application/json", "token": props.token },
      body: JSON.stringify(dataToSend)
    };
    let response
    try {
      response = await fetch("http://localhost:8080/companyApi/updateCoupon", requestOptions);
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
    setFinished(true);
  }

  const content: JSX.Element | JSX.Element[] =
    <>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal} >
        <header className={classes.header}>
          <h2>Update Coupon</h2>
        </header>
        <form onSubmit={submitHandler} >
          <Typography variant="h6" component="div" align="center" sx={{ my: 2, mx: 2, flexGrow: 1, fontWeight: "bold", }}>
          </Typography>
          <Grid container
            justifyContent="center"
            spacing={3}
            alignItems="center">
            <Grid sx={{ mb: 2, fontWeight: "bold" }}>
              <TextField sx={{ mt: 3, mx: 3, fontWeight: "bold" }}
                label="Title"
                variant="standard"
                value={titleEditing}
                onChange={(event) => setTitleEditing(event.target.value)}
              />
            </Grid>
            <Box sx={{ minWidth: 180 }}>
              <Grid sx={{ mt: 5, fontWeight: "bold" }}
                style={{ marginLeft: "2em" }} >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    fullWidth
                    value={categoryEditing}
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
              label="Description"
              variant="standard"
              value={descriptionEditing}
              onChange={(event) => setDescriptionEditing(event.target.value)}
              multiline={true}
              rows={2}
            />
          </Grid>
          <Stack direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
            sx={{ mt: "2em" }}>
            <TextField sx={{ mr: 5, fontWeight: "bold" }}
              type="date"
              value={startDateEditing} onChange={(event) => setStartDateEditing(event.target.value)}
              label="Start-Date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              style={{ width: "12em" }}
            />
            <TextField sx={{ mb: 2, fontWeight: "bold" }}
              value={endDateEditing} onChange={(event) => setEndDateEditing(event.target.value)}
              type="date"
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
              value={amountEditing}
              onChange={(event) => setAmountEditing(event.target.value)}
              label="Amount"
              variant="outlined"
            />
            <FormControl sx={{ mb: 2 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                value={priceEditing}
                onChange={(event) => setPriceEditing(event.target.value)}
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
            <Grid item sx={{ mb: 2, mt: 2, mx: 10 }}>
              <TextField sx={{ fontWeight: "bold", innerWidth: "100%", outerWidth: "100%" }}
                type="url"
                label="Url Image"
                variant="outlined"
                fullWidth
                value={imageEditing}
                onChange={(event) => setImageEditing(event.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Stack>
          <footer className={classes.actions}>
            <Button type='submit' variant="contained" sx={{ mx: 3, }} >
              Update Coupon
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
              >The coupon was Updated Successfully</Typography>
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

export default UpdateCoupon;