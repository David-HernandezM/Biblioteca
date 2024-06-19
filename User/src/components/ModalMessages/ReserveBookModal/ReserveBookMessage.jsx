import PropTypes from 'prop-types'
import { Button } from '@mui/material';

import './ReserveBookMessage.css';

export const ReserveBookModalMessage = props => {
  return (
    <div className='reserve-book-message'>
        <h2 className='reserve-book-message__title'>
            Reservar libro
        </h2>
        <p
            className='reserve-book-message__text'
        >
            Reservaras: { props.bookTitle }
        </p>
        <p
            className='reserve-book-message__text reserve-book-message__text--secondary'
        >
            Tendrás un día para recoger el libro
        </p>
        <div className='reserve-book-message__buttons'>
            <Button
                variant='contained'
                onClick={props.onCloseModal}
                sx={{width: "150px"}}
            >
                Cancelar
            </Button>
            <Button
                variant='contained'
                color='success'
                sx={{width: "150px"}}
                onClick={() => {
                    console.log(props.bookId);
                }}
            >
                Reservar
            </Button>
        </div>
    </div>
  )
}

ReserveBookModalMessage.propTypes = {
    bookId: PropTypes.string.isRequired,
    bookTitle: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func
}