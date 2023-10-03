import React from 'react'
import { CircularProgress, Box, Typography } from '@mui/material';

export const LoadingSnipet = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
    >
      <CircularProgress size={60} thickness={4} color='primary' />
      <Typography variant='h6' color='textSecondary' mt={2}>
        Loading...
      </Typography>
    </Box>
  );
}
