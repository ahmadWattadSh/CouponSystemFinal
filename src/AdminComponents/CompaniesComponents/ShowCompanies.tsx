import { useCallback, useEffect, useState } from "react";
import { CompanyType } from "../../ClientTypes/Models/CompanyModel";
import CompanyList from "../../ClientTypes/ModelsList/CompanyList";
import DeleteCompany from "./DeleteCompany";
import AddCompany from "./AddCompany";
import UpdateCompany from "./UpdateCompany";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import { CircularProgress, Snackbar } from "@mui/material";
import { useHistory } from "react-router-dom";



type Props = {
  token: string
  reload: boolean
  open?: boolean
}
const ShowCompanies: React.FC<Props> = (props) => {

  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [companyIdForRemove, setCompanyIdForRemove] = useState<number>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [companyToUpdate, setCompanyToUpdate] = useState<CompanyType>(null);
  const [open, setOpen] = useState(false);
  const theme = createTheme();
  const history = useHistory();

  const drawerOpenHandler = () => {
    setOpen(true);
  };

  const alertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const updateCompanyHandler = (dataForUpdate) => {
    const newState = companies.map(companyToChange => { if (companyToChange.id === companyToUpdate.id && companyToUpdate.name === dataForUpdate.name) { return { ...companyToChange, name: dataForUpdate.name, email: dataForUpdate.email, password: dataForUpdate.password } } return companyToChange; });
    setCompanies(newState);
  }

  const cancelAddHandler = () => {
    setIsAdding(false);
  }

  const finishAdding = (company: CompanyType) => {
    setCompanies([company, ...companies])
    setIsAdding(false)
    drawerOpenHandler()
  }

  const onUpdate = (company: CompanyType) => {
    setCompanyToUpdate(company)
    setIsUpdating(true)
  }

  const onConfirmUpdate = () => {
    setIsUpdating(false)
  }

  const onDelete = (id: number) => {
    const companiesDummy = companies;
    const removeIndex = companiesDummy.findIndex(item => item.id === id);
    companies.splice(removeIndex, 1);
    setCompanies(companiesDummy)
    setCompanyIdForRemove(id);
    setIsDeleting(true);
  }

  const onConfirmDelete = () => {
    setIsDeleting(false)
  }

  const fetchHandler = useCallback(async () => {
    setIsLoading(true);
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: { "Content-Type": "application/json", "token": props.token },
    }

    let response;
    try {
      response = await fetch("http://localhost:8080/adminApi/getAllCompanies", requestOptions);
    }
    catch (e) {
      history.push('/PageNotFound')
    }

    if (!response.ok) {
      if (await response.text() === "Service is not found")
        history.push('/login')
      else {
        history.push('/PageNotFound')
      }
    }

    const data = await response.json();
    setCompanies(data);
    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchHandler();
    setIsAdding(false);
  }, [props.reload, props.open])

  return (
    <>
      <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={2}
        justifyContent="center"
      >
        {!isAdding && <Button onClick={() => setIsAdding(true)} variant="contained" size="large" >+</Button>}
      </Stack>
      <br /><br />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {!isAdding && <Container maxWidth='xs'>
            <Typography
              component="h2"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              All Companies
            </Typography>
          </Container>}
          <br />
          <Container sx={{ py: 0 }} >
            <Grid container spacing={1}>
              {!isAdding && !isLoading && companies.length > 0 && <CompanyList companyList={companies} token={props.token} onDelete={onDelete} onUpdate={onUpdate} />}
              {!isLoading && companies.length === 0 && <p>No companies Found.</p>}
              {isLoading && <Box sx={{ display: 'flex', mx: "50%" }}>
                <CircularProgress />
              </Box>}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
      {isDeleting && <DeleteCompany token={props.token} onConfirmDelete={onConfirmDelete} id={companyIdForRemove} />}
      {isUpdating && <UpdateCompany token={props.token} company={companyToUpdate} onConfirm={onConfirmUpdate} updateCompany={updateCompanyHandler} />}
      {isAdding && <AddCompany token={props.token} cancel={cancelAddHandler} finishAdding={finishAdding} />}
      <Snackbar open={open} autoHideDuration={6000} onClose={alertClose}>
        <MuiAlert elevation={6} onClose={alertClose} sx={{ width: '100%' }}>
          Company was added successfully!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ShowCompanies;




