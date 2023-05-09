import React, { useState } from 'react'

import GenerateInvoice from './GenerateInvoice'
import ViewTx from './ViewTx'
import Withdrawal from './Withdrawal'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal';


const TransactionTable = ({rows, isGenerateOpen, isWithdrawalOpen, setIsGenerateOpen, setIsWithdrawalOpen}) => {
  const [isViewTxOpen, setIsViewTxOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState({})

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => {
                  setSelectedRow(row)
                  setIsViewTxOpen(true)
                }}
                hover
                selected= {selectedRow.id === row.id}
              >
                <TableCell>{row.ttype}</TableCell>
                <TableCell>{row.detail}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={isGenerateOpen}
        onClose={() => setIsGenerateOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <GenerateInvoice setIsOpen={setIsGenerateOpen} setIsViewTxOpen={setIsViewTxOpen} setSelectedRow={setSelectedRow}/>
      </Modal>
      <Modal
        open={isViewTxOpen}
        onClose={() => {
          setSelectedRow({})
          setIsViewTxOpen(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ViewTx selectedTx={selectedRow} setIsOpen={setIsViewTxOpen}/>
      </Modal>
      <Modal
        open={isWithdrawalOpen}
        onClose={() => setIsWithdrawalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Withdrawal setIsOpen={setIsWithdrawalOpen}/>
      </Modal>
    </div>
  )
}

export default TransactionTable