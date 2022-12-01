import { Fragment, useEffect, useState } from "react";
import Card from "../../LoginComponents/Card/Card";
import classes from './UpdateCustomer.module.css';
import { Button, Grid, Typography } from '@mui/material';
import { useHistory } from "react-router-dom";

type Props = {
  token: string
  onConfirmDelete: () => void
  id: number
}

const DeleteCustomer: React.FC<Props> = (props) => {
  const [finished, setFinished] = useState<boolean>(false);
  const history = useHistory();

  const deleteCustomerDB = async () => {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: { "Content-Type": "application/json", "token": props.token },
    };
    let response
    try {
      response = await fetch(`http://localhost:8080/adminApi/deleteCustomer/${props.id}`, requestOptions);
    }
    catch (error: any) {
      history.push('/PageNotFound');
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

  useEffect(() => {
    deleteCustomerDB();
  }, [])

  return (
    <Fragment>
      {!finished &&
        <>
          <div className={classes.backdrop} />
          <Card className={classes.modal} >
            <div className={classes.content}></div>
            <h1>Loading...</h1>
          </Card>
        </>}
      {finished &&
        <>
          <div className={classes.backdrop} onClick={props.onConfirmDelete} />
          <Card className={classes.modal} >
            <div className={classes.content}></div>
            <Grid item sx={{ ml: 9, mt: 5, mb: 3 }}>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "1.6em" }}
              >TThe Customer was Deleted successfull</Typography>
            </Grid>
            <footer className={classes.actions}>
              <Button onClick={props.onConfirmDelete}>Okay</Button>
            </footer>
          </Card>
        </>
      }
    </Fragment>
  );
};

export default DeleteCustomer;