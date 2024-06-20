import PropTypes from 'prop-types'
// import Modal from '@mui/material/Modal';
import { Modal, Box } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: "20px",
    boxShadow: 24,
    p: 2,
};

export const MessageModal = props => {
  return (
    <Modal
        open={props.openModal}
        onClose={props.handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            { props.children }
        </Box>
    </Modal>
  )
}

MessageModal.propTypes = {
    openModal: PropTypes.bool.isRequired,
    handleModalClose: PropTypes.func.isRequired,
    children: PropTypes.element
}




