import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { getDashboardTime, getUseFriendlyStatus, getOpponent } from '../../utils/utils'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const ChallengeTable = ({rows, selectedRow, setSelectedRow, setOpen, title}) => {
  const userProfile = useContext(AuthContext)

  const table = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="right">Opponent</TableCell>
            <TableCell align="right">Created at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => {
                setSelectedRow(row)
                setOpen(true)
              }}
              hover
              selected= {selectedRow.id === row.id}
            >
              <TableCell component="th" scope="row">{getUseFriendlyStatus(userProfile,row)}</TableCell>
              <TableCell align="right">{getOpponent(userProfile, row)}</TableCell>
              <TableCell align="right">{getDashboardTime(row.created_on)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  const tableComponent = (rows && rows.length > 0) ? table : <Typography variant="body1" align="left">No challenges yet!</Typography>

  return (
    <Box>
      <Typography variant="h5" align="left" sx={{mt: 2, ml: 1, mb: 1}}>{title}</Typography>
      {tableComponent}
    </Box>
  );
}

export default ChallengeTable