/**
 * This component is responsible for displaying the profile details of the companies and customers and not the admin
 * The admin has final values but the companies an the customers have varied values and this component is used for this 
 * purpose.
 * 
 */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import companyImg from "../Assets/images/images.jpg"
import customerImg from "../Assets/images/istockphoto-1164727148-612x612.jpg"

type companyUser = {
  avatar?: string,
  name: string | undefined,
  email: string,
  password: string
}

type customerUser = {
  avatar?: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

type User = {
  avatar?: string,
  name?: string | undefined,
  firstName?: string,
  lastName?: string,
  email: string,
  password: string
}

export const AccountProfile: React.FC<User> = (props) => {
  const [user, setUser] = useState<User>(null);
  const [isCompany, setIsCompany] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  //it checks if the details are that of a company or customers and sets everything accordingly
  useEffect(() => {
    if (props.name === undefined) {
      setIsCompany(false)
      const customerUser: customerUser = {
        avatar: companyImg,
        firstName: props.firstName,
        lastName: props.lastName,
        email: props.email,
        password: props.password
      }
      setUser(customerUser)
    }
    else {
      setIsCompany(true)
      const companyUser: companyUser = {
        avatar: customerImg,
        name: props.name,
        email: props.email,
        password: props.password
      }
      setUser(companyUser)
    }
    setIsFinished(true)
  }, [])

  return (<Fragment>
    {isFinished &&
      <Card {...props}>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                height: 64,
                mb: 2,
                width: 64
              }}
            />
            {isCompany && <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              {user.name}
            </Typography>
            }
            {!isCompany && <><Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              {user.firstName}
            </Typography>
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
              >
                {user.lastName}
              </Typography>
            </>
            }
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {`${user.email}`}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {user.password}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            fullWidth
            variant="text"
          >
            Upload picture
          </Button>
        </CardActions>
      </Card>
    }
  </Fragment>
  );
}