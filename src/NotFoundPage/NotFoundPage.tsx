import { Grid, Paper } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import img2 from "../Assets/images/vignesh-moorthy-n9dBt4g2Ss4-unsplash.jpg"
import classes from './NotFoundPage.module.css';
import { SvgIcon } from "../LandingPage/common/SvgIcon";
import Button from '@mui/material/Button';

type Props = {
}

const PageNotFound: React.FC<Props> = (props) => {
    const history = useHistory()

    const clickHandler = () => {
        history.push('/welcome')
    }

    return (
        <Grid container sx={{ backgroundImage: `url(${img2})`, height: '100vh', backgroundSize: "contain" }}>
            <div className={classes.modal} style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
                borderRadius: "15px",
            }} >
                <Paper sx={{ height: '60vh', backgroundColor: "transparent" }} >
                    <Paper sx={{ height: '50vh', backgroundColor: "transparent" }}>
                        <SvgIcon src={"—Pngtree—error 404 page not found_6501259.png"} width="100%" height="100%" />
                    </Paper>
                    <Button
                        variant="contained"
                        onClick={clickHandler}
                        sx={{ width: 100, mx: "40%", mt: "1em", fontWeight: "bold" }}
                    >
                        HomePage
                    </Button>
                </Paper>
            </div>
        </Grid>
    );
}

export default PageNotFound;