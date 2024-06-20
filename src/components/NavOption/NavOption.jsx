import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './NavOption.css';

export const NavOption = ({pageRedirectionName, pageRedirectionText, selected, onClick=() => {}}) => {
  return (
    <li className='navoption'>
        <Link
          className={`navoption link link--pad10 ${selected ? 'link--selected' : ''}`}
          onClick={onClick}
          to={pageRedirectionName}
        >
            { pageRedirectionText }
        </Link>
    </li>
  )
}

NavOption.propTypes = {
    pageRedirectionName: PropTypes.string.isRequired,
    pageRedirectionText: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func
}