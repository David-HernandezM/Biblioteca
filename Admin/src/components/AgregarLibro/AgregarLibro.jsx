import React, { useState } from 'react';
import './AgregarLibro.css';

function AgregarLibro({ onAgregarLibro }) {
  const [nombre, setNombre] = useState('');
  const [autor, setAutor] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && autor) {
      onAgregarLibro({ nombre, autor, imagen });
      setNombre('');
      setAutor('');
      setImagen(null);
    }
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  return (
    <form className="agregar-libro-form" onSubmit={handleSubmit}>
      <h2>Agregar libro</h2>
      <input
        type="text"
        placeholder="Nombre del libro"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default AgregarLibro;

