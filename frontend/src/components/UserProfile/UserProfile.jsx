import React from 'react'
import { Container, Paper, Typography, Divider, Button } from '@mui/material';
import {Link} from 'react-router-dom'

export const UserProfile = ({user}) => {
  return (
    <>
      <Container>
        <Paper elevation={3} sx={{ padding: 4, marginTop: 2 }}>
          <Typography variant='h4' gutterBottom>
            User Profile
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant='h6'>Name: {user?.username} </Typography>

          <Typography variant='body1'>Email: {user?.email}</Typography>
          <Link to='/edit/account'>
            <Button variant='contained' color='primary' sx={{ marginTop: 2 }}>
              Edit Account
            </Button>
          </Link>
        </Paper>
      </Container>
    </>
  );
}
