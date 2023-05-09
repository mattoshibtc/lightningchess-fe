import * as React from 'react';
import Button from '@mui/material/Button';
import CreateChallenge from './CreateChallenge';
import Modal from '@mui/material/Modal';

const ChallengeButton = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size="large">Create challenge</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateChallenge setOpen={setOpen}/>
      </Modal>
    </div>
  )
}

export default ChallengeButton