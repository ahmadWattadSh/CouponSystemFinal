/**
 * This component is responsible for the navBar at the left side in the adminDashboard. 
 * 
 */
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

const drawerWidth = 256;

type Props = {
  actionChange?: (action: String) => void
  reloading?: () => void
}

const CompanyButtons: React.FC<Props> = (props) => {
  const [action, setAction] = useState<String>("");
  const [reload, setReload] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!(action === "")) {
      props.actionChange(action)
    }
    props.reloading()
  }, [reload]);

  // This changes the action to "add" in the CompanyDashboard by lift-up
  const addHandler = () => {
    setAction("add");
    setReload(!reload)
  }

  // This changes the action to "showAll" in the CompanyDashboard by lift-up
  const showAllHandler = () => {
    setAction("showAll");
    setReload(!reload)
  }

  // This changes the action to "details" in the CompanyDashboard by lift-up
  const detailsHandler = () => {
    setAction("details");
    setReload(!reload)
  }

  //this will lead to log-out
  const logoutHandler = () => {
    dispatch(authActions.logout())
    history.push("/login")
  }

  return (
    <Fragment>
      <Drawer variant="permanent" PaperProps={{ style: { width: drawerWidth } }}
        sx={{ display: { sm: 'block', xs: 'none' } }}>
        <List disablePadding>
          <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
            Dashboard
          </ListItem>
          <ListItem sx={{ ...item, ...itemCategory }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <Link
              href="/welcome"
              variant="body2"
              sx={{
                textDecoration: 'none',
                color: lightColor,
                '&:hover': {
                  color: 'common.white',
                },
              }}
            >Home</Link>
          </ListItem>
          <Box sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>Functions</ListItemText>
            </ListItem>
            <ListItem disablePadding key="Company Details">
              <ListItemButton onClick={detailsHandler} selected={false} sx={item}>
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText>"Company Details"</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding key="showAllHandler">
              <ListItemButton onClick={showAllHandler} selected={false} sx={item}>
                <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                <ListItemText>"Company Coupons"</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding key="AddCoupon">
              <ListItemButton onClick={addHandler} selected={false} sx={item}>
                <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
                <ListItemText>"Add Coupon"</ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider sx={{ mt: 2 }} />
          </Box>
          <Box sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>Settings</ListItemText>
            </ListItem>
            <ListItem disablePadding key="LogOut">
              <ListItemButton onClick={logoutHandler} selected={false} sx={item}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText>"Log out"</ListItemText>
              </ListItemButton>
            </ListItem>
          </Box>
        </List>
      </Drawer>
    </Fragment>
  )
}

export default CompanyButtons; 
