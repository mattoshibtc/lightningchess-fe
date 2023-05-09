import React, { useState, useContext } from 'react'

import Games from './Games'
import ChallengeTable from './challenge/ChallengeTable'
import ChallengeButton from './challenge/ChallengeButton'
import ChallengeDetailsContainer from './challenge/ChallengeDetailsContainer'
import { AuthContext } from '../contexts/Auth';
import { useInterval } from 'usehooks-ts'

import { Box, CircularProgress, Modal, Snackbar, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [challenges, setChallenges] = useState([])
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({})
  const userProfile = useContext(AuthContext)
  const [newChallengeOpen, setNewChallengeOpen] = useState(false)
  const [newChallengeMessage, setNewChallengeMessage] = useState("")
  const [acceptedChallengeOpen, setAcceptedChallengeOpen] = useState(false)
  const [acceptedChallengeMessage, setAcceptedChallengeMessage] = useState("")

  const handleClose = () => {
    setSelectedRow({});
    setOpen(false);
  }

  const handleAcceptedChallengeClose = () => {
    setAcceptedChallengeOpen(false)
  }

  const handleNewChallengeClose = () => {
    setNewChallengeOpen(false)
  }

  const fetchChallenges = () => {
    fetch('/api/challenges', { mode: 'no-cors' })
      .then(res => {
        if (res.ok) return res.json()
        else return {}
      })
      .then(c => {
        let sorted = c.filter(c => c.status !== "COMPLETED").sort((a, b) => b.id - a.id )

        // notify if new challenge
        if (sorted.length > challenges.length) {
          console.log("new challenge!")
          // check the most recent game
          if (sorted[0].username !== userProfile.username) {
            console.log("setting new challenge true")
            let link = <Typography>New challenge from {sorted[0].username}!</Typography>
            setNewChallengeMessage(link)
            setNewChallengeOpen(true)
          }
        }
        // notify if challenge turned ready to play
        let challengesReadyToPlay = sorted.filter(c => c.status === "ACCEPTED")
        let ogChallengesAccepted = challenges.filter(c => c.status === "ACCEPTED")
        if (challengesReadyToPlay.length > 0 &&  challengesReadyToPlay.length > ogChallengesAccepted.length) {
          let opp_username = challengesReadyToPlay[0].opp_username
          let lichessLink = challengesReadyToPlay[0].lichess_challenge_id
          if (userProfile.username !== opp_username) {
            let link = <Typography>{opp_username} accepted. Play <a href={`https://lichess.org/${lichessLink}`} target="_blank" rel="noreferrer">here</a>!</Typography>
            setAcceptedChallengeMessage(link)
            setAcceptedChallengeOpen(true)
          }
        }
        setIsLoading(false)
        setChallenges(sorted)
      })
  }

  useInterval(fetchChallenges, 2000)

  let tableComponent = null
  if (isLoading) {
    tableComponent = <CircularProgress size="2rem"/>
  } else if (challenges && challenges.length !== 0) {

    tableComponent = (
      <Box>
        <ChallengeTable rows={challenges} selectedRow={selectedRow} setSelectedRow={setSelectedRow} setOpen={setOpen} title={"Pending challenges"}/>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ChallengeDetailsContainer selectedChallenge={selectedRow} setOpen={setOpen}/>
        </Modal>
      </Box>
    )
  }

  return (
    <Box textAlign='center'>
      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
        autoHideDuration= {30000}
        open={acceptedChallengeOpen}
        onClose={handleAcceptedChallengeClose}
        message={acceptedChallengeMessage}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleAcceptedChallengeClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
        autoHideDuration= {30000}
        open={newChallengeOpen}
        onClose={handleNewChallengeClose}
        message={newChallengeMessage}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleNewChallengeClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
      <ChallengeButton variant="contained" size="large" sx={{m: 4}}/>
      <Games/>
    </Box>
  )
}

export default Dashboard