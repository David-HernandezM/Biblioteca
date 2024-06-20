import React, { useState } from 'react';
import './Editarlibro.css';

function App() {
  // Usamos useState para manejar el estado de los campos del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // Funciones para manejar los cambios en los campos de entrada
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Función para manejar el cambio de la imagen
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Función para guardar 
  const handleSave = () => {
    console.log('Saved', { title, description, image });
   
  };

  //cancelar el editar o borrar
  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setImage(null);
  };

  return (
    <div className="App">
      <div className="edit-book">
        <h2>Editar libro</h2>
        <input
          type="text"
          placeholder="Titulo libro"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Lorem ipsum"
          value={description}
          onChange={handleDescriptionChange}
        />
        <div className="image-preview">
          {image ? <img src={image} alt="Book" /> : <div>Image</div>}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="buttons">
          <button onClick={handleCancel} className="cancel-button">Cancelar</button>
          <button onClick={handleSave} className="save-button">Guardar</button>
        </div>
      </div>
    </div>
  );
}
export default App;
