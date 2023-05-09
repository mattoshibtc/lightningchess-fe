import React, { useState } from 'react'

import { useFormik } from 'formik'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const Withdrawal = ({setIsOpen}) => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const sendPayment = async (values) => {
    setLoading(true)
    let constValuesJson = JSON.stringify(values, null, " ")
  
    const response = await fetch('api/send-payment', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: constValuesJson,
      mode: 'no-cors', 
    })
    console.log(`response: ${response}`)
    if (response.ok) {
      const data = await response.json()
      console.log(`data: ${data}`)
      console.log(`data: ${JSON.stringify(data, null, ' ')}`)
      if (data.complete) {
        setIsOpen(false)
      } else {
        setError(true)
      }
    } else {
      setError(true)
    }
    setLoading(false)
  }

  const formik = useFormik({
    initialValues: { payment_request: ''},
    onSubmit: sendPayment,
  })

  let errorComponent = null
  if (error) {
    errorComponent = <Alert sx={{mt: 1, height: '88%', fontSize: '0.86rem'}} severity="error">Error withdrawing</Alert>
  }

  let loadingComponent = null
  if (loading) {
    loadingComponent = (
    <Box textAlign='center' sx={{mt: 2}}>
      <CircularProgress sx={{mt: 2}} size="2rem"/>
    </Box>)
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Invoice
        </Typography>
        {errorComponent}
        <form onSubmit={formik.handleSubmit}>
          <TextField fullWidth multiline id="payment_request" value={formik.values.payment_request} onChange={formik.handleChange} label="Invoice" variant="outlined" margin="normal"/><br/>
          {loadingComponent}
          <Button sx={{mt: 2}} disabled={loading} variant="contained" type="submit">Withdrawal</Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Withdrawal