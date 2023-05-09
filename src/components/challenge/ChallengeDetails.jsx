import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { getColor, getLocalTime, getUseFriendlyStatus, getOpponent } from '../../utils/utils'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const ChallengeDetails = ({challenge}) => {
  const userProfile = useContext(AuthContext)
  
  return (
    <Box sx={{mx: 1, mt: 4, mb: 2}}>
      <Typography variant="h6">
        <Grid container rowSpacing={1}>
          <Grid xs={1} />
          <Grid xs={5}>Status:</Grid>
          <Grid xs={6}>{getUseFriendlyStatus(userProfile, challenge)}</Grid>
          <Grid xs={1} />
          <Grid xs={5}>Created at:</Grid>
          <Grid xs={6}>{getLocalTime(challenge.created_on)}</Grid>
          <Grid xs={1} />
          <Grid xs={5}>Opponent:</Grid>
          <Grid xs={6}>{getOpponent(userProfile, challenge)}</Grid>
          <Grid xs={1} />
          <Grid xs={5}>Your color:</Grid>
          <Grid xs={6}>{getColor(userProfile, challenge)}</Grid>
          <Grid xs={1} />
          <Grid xs={5}>Your time:</Grid>
          <Grid xs={6}>{challenge.time_limit / 60} minutes</Grid>
          <Grid xs={1} />
          <Grid xs={5}>Opponent's time:</Grid>
          <Grid xs={6}>{challenge.opponent_time_limit / 60} minutes</Grid>
          <Grid xs={1} />
          <Grid xs={5}>Increment:</Grid>
          <Grid xs={6}>{challenge.increment} seconds</Grid>
          <Grid xs={1} />
          <Grid xs={5}>Sats:</Grid>
          <Grid xs={6}>{challenge.sats}</Grid>
        </Grid>
      </Typography>
    </Box>
  )
}

export default ChallengeDetails