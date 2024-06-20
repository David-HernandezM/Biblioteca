
import React from 'react';
import Boton from './components/Boton';
import { FaBook, FaHandHolding, FaCheck, FaTrash, FaEdit } from 'react-icons/fa';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Biblioteca</h1>
                <p>Administrador: apartados xd</p>
            </header>
            <div className="botones-container">
                <Boton icono={<FaBook />} texto="Agregar libro" />
                <Boton icono={<FaHandHolding />} texto="Prestar libro" />
                <Boton icono={<FaCheck />} texto="Devolver libro" />
                <Boton icono={<FaTrash />} texto="Eliminar libro" />
                <Boton icono={<FaEdit />} texto="Editar libro" />
            </div>
        </div>
    );
}

export default App;
