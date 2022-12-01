/**
 * This component is responsible for the layout of the entire admin dashboard:
 * Left-navBar - <adminButton> component is responsible for presenting it.
 * Header - <Header> component is responsible for presenting it.
 * Content - It shows one of the four possible outcomes:
 * 1. <AdminDashboardLayout> component 
 * 2. <ShowCompanies> component
 * 3. <ShowCustomers> component
 * 4. <AccountProfile> component
 * Timer - <Timer> is responsible for presenting it
 * 
 */
import { PropsWithChildren, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AdminButtons from "./AdminButtons";
import ShowCompanies from "../CompaniesComponents/ShowCompanies";
import ShowCustomers from "../CustomersComponents/ShowCustomers";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from "../../DashboardLayout/Header";
import Timer from "../../Timer.tsx/Timer";
import theme from "./Theme";
import { AccountProfile } from "./account-profile";
import AdminDashboardLayout from "./AdminDashboardLayout";

const drawerWidth = 256;

type Props = {
}
const AdminDashBoard: React.FC<PropsWithChildren<Props>> = (props) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [action, setAction] = useState<string>("");
  const [reload, setReload] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  // responsible for opening and closing the navBar by the <Header>
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // responisble for changing the possible outcome for content. <AdminButton> is responsible for the change.
  const actionChange = (msg: string) => {
    setAction(msg);
    setReload(!reload);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        {!open && <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <AdminButtons
            actionchange={actionChange} />
        </Box>}
        <Timer />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          {action === "" && <AdminDashboardLayout />}
          {action !== "" && <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            {action === "allCompanies" && <ShowCompanies token={token} reload={reload} />}
            {action === "allCustomers" && <ShowCustomers token={token} reload={reload} />}
            {action === "Profile" && <AccountProfile />}
          </Box>
          }
        </Box>
      </Box>
    </ThemeProvider>
  )
};

export default AdminDashBoard;