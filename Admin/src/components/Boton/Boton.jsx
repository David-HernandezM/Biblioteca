
import React from 'react';
import { FaBook, FaHandHolding, FaCheck, FaTrash, FaEdit } from 'react-icons/fa';
import './Boton.css'; 

const Boton = ({ icono, texto }) => {
    return (
        <div className="boton">
            {icono}
            <p>{texto}</p>
        </div>
    );
};

export default Boton;
