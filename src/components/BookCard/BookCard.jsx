import PropTypes from 'prop-types'
import './BookCard.css';

export const BookCard = props => {
  return (
    <div className='book-card'>
        <div className='book-card__image'>
            <img src={props.image} alt="portada de libro" />
        </div>
        <div className='book-card__info'>
          <div className='book-card__info__container'>
            <div className='book-card__info__book-info'> 
              <h2>
                {props.bookTitle}
              </h2>
              <h3>
                {props.bookAutor}
              </h3>
            </div>
            <div className='book-card__info__book-extra-info'>
              {
                props.numBorrowed != null ? <p>Prestados: {props.numBorrowed}</p> : ''
              }
              {
                props.quantity != null ? <p>Cantidad: {props.quantity}</p> : ''
              }
            </div>
          </div>
          <div className='book-card__bottom'>
            { props.children }
          </div>
        </div>
    </div>
  );
}

BookCard.propTypes = {
  image: PropTypes.string.isRequired,
  bookTitle: PropTypes.string.isRequired,
  bookAutor: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  numBorrowed: PropTypes.number,
  children: PropTypes.element
}

