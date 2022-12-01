import React, { PropsWithChildren, useState } from 'react';
import AddCoupon from '../CompanyActions/AddCoupon';
import CompanyButtons from './CompanyButtons';
import ShowCoupons from '../CompanyActions/ShowCoupons';
import CompanyDetails from '../CompanyActions/CompanyDetails';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from "../../DashboardLayout/Header";
import Timer from '../../Timer.tsx/Timer';
import theme from '../../AdminComponents/AdminLayout/Theme';
import CompanyDashboardLayout from './CompanyDashboardLayout';

const drawerWidth = 256;

type Props = {
}

const CompanyDashBoard: React.FC<PropsWithChildren<Props>> = (props) => {

  const token = useSelector((state: RootState) => state.auth.token);
  const [action, setAction] = useState<String>("");
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false)

  const handleDrawerToggle = (action1: String) => {
    setOpen(!open);
    setAction(action1)
  };

  const actionChange = (msg: String) => {
    setAction(msg)
  }

  const reloading = () => {
    setReload(!reload);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        {!open && <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <CompanyButtons
            actionChange={actionChange}
            reloading={reloading}
          />
        </Box>}
        <Timer />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} action={action} />
          {action === "" && <CompanyDashboardLayout />}{action !== "" &&
            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
              {action === "add" && <AddCoupon token={token} />}
              {action === "showAll" && <ShowCoupons token={token} reload={reload} />}
              {action === "details" && <CompanyDetails token={token} />}
            </Box>}
        </Box>
      </Box>
    </ThemeProvider>
  )
};

export default CompanyDashBoard;