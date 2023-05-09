import React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const Faq = () => {
  return (
    <Box sx={{mx: 6, mt: 4}}>
      <Paper sx={{p: 2}}>
      <Typography variant="h5" sx={{mb: 1}}>How does this site work?</Typography>
        <Typography variant="body1" sx={{mb: 3}}>
          1. Login with Lichess (a free and open source chess server)<br />
          2. Challenge a friend for some sats<br />
          3. Play the game on Lichess<br />
          4. The winner gets all of the sats (minus a 2% fee)<br />
        </Typography>
        <Typography variant="h5" sx={{mb: 1}}>Why is there a fee?</Typography>
        <Typography variant="body1" sx={{mb: 3}}>Value for value economy baby!</Typography>
        <Typography variant="h5" sx={{mb: 1}}>How do I report an issue/feedback?</Typography>
        <Typography variant="body1" sx={{mb: 3}}>Email mattlightningchess@gmail.com.</Typography>
        <Typography variant="h5" sx={{mb: 1}}>What happens if the other person cheats?</Typography>
        <Typography variant="body1" sx={{mb: 3}}>Unfortunately nothing. Please try to play with people you somewhat trust or for money you don't mind losing.</Typography>
        <Typography variant="h5" sx={{mb: 1}}>Can I donate?</Typography>
        <Typography variant="body1" sx={{mb: 1}}>
          Yes. Lichess is awesome and is the main part of this site, so please <a href="https://lichess.org/patron" target="_blank" rel="noreferrer">support them first</a>.<br/>
          If you have any sats left over you can send them to:
            BTC: 3NfpJUvabijt5CCKBr6M7Qv6w5GAJ4JP8w
            Lightning: herclose55@walletofsatoshi.com
        </Typography>
      </Paper>
    </Box>
  )
}

export default Faq