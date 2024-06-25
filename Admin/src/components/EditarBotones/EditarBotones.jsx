// src/EditBook.jsx

import React, { useState } from 'react';
import './EditBook.css';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleCancel = () => {
 
    setTitle('');
    setDescription('');
    setImage(null);
  };

  const handleSave = () => {
   
    const bookData = {
      title,
      description,
      image,
    };
    console.log('Book data saved:', bookData);
    
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="edit-book-container">
      <h2>Editar libro</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título libro"
          className="input-field"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Lorem ipsum"
          className="input-field"
        />
      </div>
      <div className="image-upload-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="file-input-label">
          {image ? <img src={image} alt="Foto del libro" className="image-preview" /> : 'Foto del libro'}
        </label>
      </div>
      <button onClick={handleCancel} className="cancel-button">Cancelar</button>
      <button onClick={handleSave} className="save-button">Guardar</button>
    </div>
  );
};

export default EditBook;
