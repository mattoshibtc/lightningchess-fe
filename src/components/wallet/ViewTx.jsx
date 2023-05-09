import React, {useState} from 'react'
import { useInterval } from 'usehooks-ts'
import Payment from './Payment'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

const ViewTx = ({setIsOpen, selectedTx}) => {
  const [tx, setTx] = useState(selectedTx);
  const isOpenInvoice = tx.state === "OPEN" && tx.ttype === "invoice"
  const isCanceledInvoice = tx.state === "CANCELED" && tx.ttype === "invoice"

  const fetchInvoice = () => {
    if (isOpenInvoice) {
      fetch(`/api/transaction/${tx.transaction_id}`, { method: 'POST', mode: 'no-cors' })
        .then(res => {
          if (res.ok) return res.json()
          else return {}
        })
        .then(i => {
          console.log(`fetched invoice: ${JSON.stringify(i, null, ' ')}`);
          if (i.status !== tx.state) {
            // update transaction if in different state
            setTx(i)
          }
        })
    }
  }

  useInterval(fetchInvoice, 2000)

  let amountText = "Amount:"
  let amountValue = tx.amount

  let payment = null
  if (isOpenInvoice) {
    payment = <Payment text={selectedTx.payment_request} />
    amountText = null
    amountValue = null
  } 

  let canceledMessage = null
  if (isCanceledInvoice) {
    canceledMessage = "Invoice canceled"
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        { canceledMessage }
        { payment }
        <Box sx={{ml: 8, mr: 7, my: 4}}>
          <Typography variant="h6">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid xs={4}>Type:</Grid>
              <Grid xs={8}>{tx.ttype}</Grid>
              <Grid xs={4}>Detail:</Grid>
              <Grid xs={8}>{tx.detail}</Grid>
              <Grid xs={4}>State:</Grid>
              <Grid xs={8}>{tx.state}</Grid>
              <Grid xs={4}>{amountText}</Grid>
              <Grid xs={8}>{amountValue}</Grid>
            </Grid>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default ViewTx