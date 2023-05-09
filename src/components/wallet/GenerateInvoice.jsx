import React, {useState} from 'react'

import { useFormik } from 'formik'
import {Alert, Button, Container, Paper, TextField, Typography} from '@mui/material'

const GenerateInvoice = ({setIsOpen, setIsViewTxOpen, setSelectedRow}) => {
  const [error, setError] = useState(false)

  const generateInvoice = async (values) => {
    values.sats = Number(values.sats)

    let constValuesJson = JSON.stringify(values, null, " ")
    console.log(`values: ${constValuesJson}`)
    
    fetch('/api/invoice', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: constValuesJson,
      mode: 'no-cors', 
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong')
    })
    .then((responseJson) => {
      setSelectedRow(responseJson)
      setIsOpen(false)
      setIsViewTxOpen(true)
    })
    .catch((error) => {
      console.log(error)
      setError(true)
    })
  }

  const formik = useFormik({
    initialValues: { sats: '1000'},
    onSubmit: generateInvoice,
  })

  let errorComponent = null
  if (error) {
    errorComponent = <Alert sx={{height: '88%', fontSize: '0.86rem'}} severity="error">Error creating challenge</Alert>
  }


  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        {errorComponent}
        <Typography component="h1" variant="h4" align="center">
          Generate invoice
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField id="sats" value={formik.values.sats} onChange={formik.handleChange} label="Sats" variant="outlined" margin="normal"/><br/>
          <Button variant="contained" type="submit">Generate</Button>
        </form>
      </Paper>
    </Container>
  )
}

export default GenerateInvoice