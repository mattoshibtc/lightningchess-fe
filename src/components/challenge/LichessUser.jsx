import React from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'

const LichessUser = ({user}) => {
  if (user && user.username) {
    let bullet = `bullet: ${user.perfs.bullet.rating}`
    let blitz =  `blitz: ${user.perfs.blitz.rating}`
    let classical = `classical: ${user.perfs.classical.rating}`
    return (
      <Box sx={{mt: 1}}>
        <Alert sx={{height: '88%', fontSize: '0.77rem'}} severity="success">
          Username found on Lichess<br/>
          {bullet}, {blitz}, {classical}
        </Alert>
      </Box>
    )
  } else {
    return (
    <Box sx={{mt: 1}}>
      <Alert sx={{height: '88%', fontSize: '0.86rem'}} severity="error">Username not found on Lichess</Alert>
    </Box>  
    )
  }
}

export default LichessUser