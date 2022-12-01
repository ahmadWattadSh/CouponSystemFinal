import { useEffect, useState } from "react";
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "@mui/material";

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
  actionchange?: (action: String) => void
}

const AdminButtons = (props: Props) => {
  const [companySelect, setCompanySelect] = useState<boolean>(false)
  const [customerSelect, setCustomerSelect] = useState<boolean>(false)

  const dispatch = useDispatch()
  const history = useHistory()
  const logoutHandler = () => {
    dispatch(authActions.logout())
    history.push("/login")
  }
  const [action, setAction] = useState<String>("");
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    if (action !== "") {
      props.actionchange(action)
    }
  }, [action, reload]);

  const companiesHandler = () => {
    setAction("allCompanies");
    setReload(!reload);
    setCompanySelect(true)
    if (customerSelect ===true) {
      setCustomerSelect(false)
    }
  }

  const customersHandler = () => {
    setAction("allCustomers");
    setReload(!reload);
    setCustomerSelect(true)
    if (companySelect ===true) {
      setCompanySelect(false)
    }
  }

  const profileHandler = () => {
    setAction("Profile")
    setReload(!reload);
  }

  return (
    <Drawer
      open={true}
      variant="persistent"
      PaperProps={{ style: { width: drawerWidth } }}
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
          <ListItem disablePadding key="Profile">
            <ListItemButton onClick={profileHandler} selected={false} sx={item}>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText>"Profile"</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding key="Companies">
            <ListItemButton onClick={companiesHandler} selected={companySelect} sx={item}>
              <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
              <ListItemText>"Companies"</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding key="Customers">
            <ListItemButton onClick={customersHandler} selected={customerSelect} sx={item}>
              <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
              <ListItemText>"Customers"</ListItemText>
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
  )
}

export default AdminButtons;
