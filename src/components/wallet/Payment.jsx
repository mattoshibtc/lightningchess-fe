import React from 'react'
import { useQRCode } from 'next-qrcode'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const Payment = ({text}) => {
  const { SVG } = useQRCode();

  return (
    <React.Fragment>
      <Box textAlign='center' my={2}>
        <SVG
            text={text}
            options={{
              margin: 2,
              width: 200,
            }}
        />
      </Box>
      <Box sx={{ display: 'flex', my: 2 }} justifyContent="center">
        <CircularProgress />
      </Box>
    </React.Fragment>
  )

}

export default Payment