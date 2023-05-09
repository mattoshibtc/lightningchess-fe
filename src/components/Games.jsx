import React, { useState } from 'react'

import ChallengeTable from './challenge/ChallengeTable'
import ChallengeDetailsContainer from './challenge/ChallengeDetailsContainer'
import { useInterval } from 'usehooks-ts'
import { Box, CircularProgress, Modal } from '@mui/material'

const Games = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [challenges, setChallenges] = useState([])
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const handleClose = () => {
    setSelectedRow({});
    setOpen(false);
  }

  const fetchChallenges = () => {
    fetch('/api/challenges', { mode: 'no-cors' })
      .then(res => {
        if (res.ok) return res.json()
        else return {}
      })
      .then(challenges => {
        let sorted = challenges.sort((a, b) => b.id - a.id )
        setIsLoading(false)
        setChallenges(sorted.slice(0, 20))
      })
  }

  useInterval(fetchChallenges, 2000)

  let tableComponent = null
  if (isLoading) {
    tableComponent = <CircularProgress size="2rem"/>
  } else {
    tableComponent = (
      <Box>
        <ChallengeTable rows={challenges} selectedRow={selectedRow} setSelectedRow={setSelectedRow} setOpen={setOpen} title={"Games"}/>
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
    <Box textAlign='center' sx={{m: 4}}>
      {tableComponent}
    </Box>)
}

export default Games