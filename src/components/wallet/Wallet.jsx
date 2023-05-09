import React, { useState } from 'react'
import { useInterval } from 'usehooks-ts'

import TransactionTable from './TransactionTable'
import Balance from '../Balance'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const Wallet = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [isGenerateOpen, setIsGenerateOpen] = useState(false)
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false)
  
  const fetchTransactions = () => {
    fetch('/api/transactions', { mode: 'no-cors' })
      .then(res => {
        if (res.ok) return res.json()
        else return {}
      })
      .then(transactions => {
        let sorted = transactions.sort((a, b) => b.transaction_id - a.transaction_id )
        setIsLoading(false)
        setTransactions(sorted)
      })
  }

  useInterval(fetchTransactions, 2000)
  
  let loadingBox = (
    <Box sx={{ display: 'flex', m: 10 }} justifyContent="center">
      <CircularProgress />
    </Box>
  )
  let transactionBox = (
    <Box sx={{m: 4}}>
      <Button onClick={() => setIsGenerateOpen(true)} variant="contained" size="large" sx={{mr: 4}}>Fund</Button>
      <Button onClick={() => setIsWithdrawalOpen(true)} variant="outlined" size="large">Withdraw</Button>
      <Typography variant="h5" align="left" sx={{mt: 2, ml: 1, mb: 1}}>Transactions</Typography>
      <TransactionTable 
        rows={transactions} 
        isGenerateOpen={isGenerateOpen} 
        isWithdrawalOpen={isWithdrawalOpen} 
        setIsGenerateOpen={setIsGenerateOpen}
        setIsWithdrawalOpen={setIsWithdrawalOpen}
        /> 
    </Box>
  )
  let txComponent = isLoading ? loadingBox : transactionBox;

  return (
    <Box textAlign='center'>
      <Balance />
      {txComponent}
    </Box>)
}

export default Wallet