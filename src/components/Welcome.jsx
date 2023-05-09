import React, { useContext } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Navigate } from "react-router-dom"
import Typography from '@mui/material/Typography'

import { AuthContext } from '../contexts/Auth'

const Welcome = () => { 
  const userProfile = useContext(AuthContext)
  console.log(`userProfile: ${JSON.stringify(userProfile, null, ' ')}`)
  if (userProfile && userProfile.username) {
    return <Navigate to="/dashboard"/>
  }

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt: 5
    }}>
      <Typography sx={{ mb: 3 }} variant="h3" component="div">
        Welcome to Lightning Chess!
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h4" color="text.secondary">
            How it works<br />
          </Typography>
          <Typography sx={{ mt: 3, mb: 4, ml: 2 }} variant="h6">
            1. Login with Lichess (a free and open source chess server)<br />
            2. Challenge a friend for some sats<br />
            3. Play the game on Lichess<br />
            4. The winner gets all of the sats (minus a 2% fee)<br />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Button href="/login"variant="contained" size="large">Login with Lichess</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Welcome