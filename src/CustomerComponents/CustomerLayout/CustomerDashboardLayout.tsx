import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fade, Slide } from 'react-awesome-reveal';
import { Grid, Paper } from '@mui/material';
import { SvgIcon } from '../../LandingPage/common/SvgIcon';
import img3 from "../../Assets/images/3593965.jpg"
import { itemForText1, itemForText2 } from '../../AdminComponents/AdminLayout/ItemsForText';

type Props = {
}

const CustomerDashboardLayout: React.FC<Props> = () => {
    return (<Paper sx={{ width: "100%", height: "100vh", backgroundImage: `url(${img3})`, backgroundSize: "cover" }}>
        <Grid container direction="row">
            <Grid item>
                <Slide direction="left" delay={100} duration={2000} >
                    <h1 style={{ marginLeft: "1em", marginTop: "1em", fontFamily: "Copperplate, Papyrus, fantasy" }}>Welcome to our CouponSystem</h1>
                </Slide>
            </Grid>
            <Grid item sx={{ ml: 80 }}>
                <SvgIcon src="tenor (6).gif" width="100vh" height="100vh" />
            </Grid>
        </Grid>
        <Grid container direction="row">
            <Grid item>
                <Box>
                    <Fade cascade damping={0.2} duration={3000}>
                        <Paper sx={{ mt: 4, ml: 6, width: "25em", height: "35em", backgroundColor: "rgba(18, 16, 16, 0.75)" }}>
                            <Fade cascade damping={0.3}>
                                <Typography sx={itemForText1}>Home</Typography>
                                <Typography sx={itemForText2}> This button leads you to the Main Page</Typography>
                                <Typography sx={itemForText1}>Customer Details</Typography>
                                <Typography sx={itemForText2}> Here are the details of the account</Typography>
                                <Typography sx={itemForText1}>Customer Coupons</Typography>
                                <Typography sx={itemForText2}> You can see and filter your purchased coupons</Typography>
                                <Typography sx={itemForText1}>Purchase</Typography>
                                <Typography sx={itemForText2}> Let's go shopping and add some coupons to cart</Typography>
                                <Typography sx={itemForText1}>Cart</Typography>
                                <Typography sx={itemForText2}> View coupons that were added and purchase them</Typography>
                            </Fade >
                        </Paper>
                    </Fade >
                </Box>
            </Grid>
            <Grid item sx={{ ml: 65, mt: 8 }}>
                <Fade delay={200} cascade damping={0.4} duration={3000}>
                    <Paper sx={{ pt: 2, width: "18em", height: "22em", backgroundColor: "rgba(18, 16, 16, 0.75)" }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: "1.2em", color: "white", pl: 2, fontFamily: "Copperplate, Papyrus, fantasy" }}> Wacth out for the new product</Typography>
                        <Paper sx={{ pt: 2, ml: 2, width: "16em", height: "18em", backgroundColor: "rgba(18, 16, 16, 0)" }}>
                            <SvgIcon src="tenor (4).gif" width="100%" height="100%" />
                        </Paper>
                    </Paper>
                </Fade>
            </Grid>
        </Grid>
    </Paper>
    )
}

export default CustomerDashboardLayout;