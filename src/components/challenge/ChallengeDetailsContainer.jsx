import React, { useContext, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { AuthContext } from '../../contexts/Auth';
import ChallengeDetails from './ChallengeDetails'
import { Button, Box, Container, CircularProgress, Paper, Typography } from '@mui/material';

const ChallengeDetailsContainer = ({selectedChallenge}) => {
  // selectedChallenge is starting state
  const [challengeDetails, setChallengeDetails] = useState(selectedChallenge)
  const userProfile = useContext(AuthContext)

  const fetchInvoice = () => {
    if (challengeDetails.status !== "COMPLETED") {
      fetch(`/api/challenge/${challengeDetails.id}`, { mode: 'no-cors' })
        .then(res => {
          if (res.ok) return res.json()
          else return {}
        })
        .then(c => {
          console.log(`fetched challenge: ${JSON.stringify(c, null, ' ')}`);
          if (challengeDetails.status !== c.state) {
            // update challenge details if different
            setChallengeDetails(c)
          }
        })
    }
  }

  useInterval(fetchInvoice, 2000)
  
  const submitAcceptChallenge = async () => {
    let id = challengeDetails.id
    let constValuesJson = JSON.stringify({id}, null, " ")
    console.log(`values: ${constValuesJson}`)
  
    const response = await fetch('/api/accept-challenge', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: constValuesJson,
      mode: 'no-cors', 
    })

    console.log(`response: ${response}`)
    const data = await response.json()
    console.log(`data: ${data}`)
    console.log(`data: ${JSON.stringify(data, null, ' ')}`)
    setChallengeDetails(data)
  }

  let loadingComponent = null
  if (challengeDetails.status === "WAITING FOR ACCEPTANCE" && userProfile.username === challengeDetails.username) { 
    loadingComponent = (
      <Box textAlign='center' sx={{mt: 2}}>
        <Typography variant="body1">Link to game will be available here when opponent accepts</Typography>
        <CircularProgress sx={{mt: 2}} size="2rem"/>
      </Box>
    )
  }

  let acceptChallengeButton = null
  if (challengeDetails.status === "WAITING FOR ACCEPTANCE" && userProfile.username === challengeDetails.opp_username) { 
    acceptChallengeButton = (
    <Box textAlign='center' sx={{mt: 2}}>
      <Button variant="contained" onClick={submitAcceptChallenge} type="submit" size="large">Accept challenge</Button>
    </Box>
    )
  }

  let playHereButton = null
  if (challengeDetails.status === "ACCEPTED") {
    playHereButton = 
    (<Box textAlign='center' sx={{mt: 2}}>
      <Button onClick={() => window.open(`https://lichess.org/${challengeDetails.lichess_challenge_id}`, '_blank')} variant="contained" size="large" color="success">Play Here!</Button>
    </Box>)
  }
  
  return (
    <Container component="main" maxWidth="sm" sx={{ my: 10, mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <ChallengeDetails challenge={challengeDetails}/>
        {playHereButton}
        {acceptChallengeButton}
        {loadingComponent}
      </Paper>
    </Container>
  )
}

export default ChallengeDetailsContainer