import React, { useState } from 'react'
import { useInterval } from 'usehooks-ts'

import {Alert, Box, Typography, Skeleton } from '@mui/material'

import { Link, useLocation } from "react-router-dom";

const Balance = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [sats, setSats] = useState(0)
  const location = useLocation()
  const fetchBalance = () => {
    fetch(`/api/balance`, { mode: 'no-cors' })
      .then(res => {
        if (res.ok) return res.json()
        else return {}
      })
      .then(b => {
        console.log(`fetched balance: ${JSON.stringify(b, null, ' ')}`);
        setSats(b.balance)
        setIsLoading(false)
      })
  }

  useInterval(fetchBalance, 3000)

  let satsDisplay = isLoading ? <Skeleton variant="rounded" width={77} height={"2.125rem"} /> : <Typography variant="h4">{sats}</Typography>
  let warning = null 
  if (!isLoading && sats === 0 && location.pathname === "/dashboard") {
    warning = (
     <Box display="flex" justifyContent="center" alignItems="center"> 
      <Box width="70%" sx={{ mb: 1}}>
        <Alert severity="warning" variant="outlined">
          <Typography variant="body1">You'll need some sats in your account to play any games. Check out the Money tab or click <Link to="/money">here</Link>.</Typography>
        </Alert>
      </Box>
     </Box>
    )
  }
  return (
    <Box textAlign='center' sx={{my: 3}}>
      {warning}
      <Box sx={{display: 'inline-flex'}}>
        <Typography variant="h4" sx={{mr: 1 }}>Sats: </Typography>
        {satsDisplay}
      </Box>
    </Box>
  )
}

export default Balance