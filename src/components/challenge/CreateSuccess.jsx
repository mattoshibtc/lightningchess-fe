import React from 'react'

import {Container, Paper, Typography } from '@mui/material'

const CreateSuccess= ({ sats }) => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 12, mb: 4 }}>
      <Paper variant="outlined" sx={{ px: 4, pt: 4, pb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2}}>Challenge created!</Typography>
        <Typography variant="body1" sx={{ mb: 1}}>Next steps:</Typography>
        <Typography variant="body1" sx={{ mb: 1}}>1. Reach out to your opponent to accept the challenge</Typography>
        <Typography variant="body1" sx={{ mb: 1}}>2. You will get alerted when the game is ready</Typography>
        <Typography variant="body1" sx={{ mb: 1}}>3. If they don't accept in 30 minutes, the challenge will expire and your sats will be refunded</Typography>
        <Typography variant="body1" sx={{ mb: 2}}>4. Profit. Winner gets all the sats (minus 2% fee)</Typography>
      </Paper>
    </Container>
  )
}

export default CreateSuccess