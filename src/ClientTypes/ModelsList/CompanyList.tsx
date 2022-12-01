import { Fragment } from "react"
import Company, { CompanyType } from "../Models/CompanyModel"
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

type Props = {
  companyList: CompanyType[]
  token: string
  onDelete?: (id: number) => void
  onUpdate?: (company: CompanyType) => void
}

const CompanyList: React.FC<Props> = (props) => {
  return (
    <Fragment>
      {props.companyList.map((company) => (
        <Grid item key={company.id} xs={1} sm={2} md={4}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Company
              key={company.id}
              id={company.id}
              name={company.name}
              password={company.password}
              email={company.email}
              onUpdate={props.onUpdate}
              onDelete={props.onDelete}
            />
          </Card>
        </Grid>
      ))}
    </Fragment>
  );
};

export default CompanyList;