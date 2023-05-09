import React, { useContext } from 'react'
import { AuthContext } from '../contexts/Auth'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const userProfile = useContext(AuthContext)
  let username = null
  let authedComponent = null
  if (userProfile && userProfile.username) {
    username = <Typography>{userProfile.username}</Typography>
  }

  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: 'relative',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <Link to="/dashboard" component={RouterLink} underline="none" variant="h5" color="inherit">
          Lightning Chess
        </Link>
        <Link to="/faq" component={RouterLink} underline="none" variant="subtitle2" color="inherit" noWrap sx={{ ml: 4, flexGrow: 1}}>
          FAQ
        </Link>
        {username}
      </Toolbar>
    </AppBar>
  )
}

export default Header