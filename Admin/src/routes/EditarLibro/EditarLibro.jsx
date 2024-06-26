import { Button, TextField } from "@mui/material";
import { useState } from "react";

import './editar-libro.css';

export const EditarLibro = () => {
    const [nombre, setNombre] = useState('');
    const [autor, setAutor] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const fileURL = URL.createObjectURL(file);
        setPreview(fileURL);
    };

    return (
        <div className="el-body">
            <div className="el-component">
                <h1>Editar libro</h1>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Nombre del libro"
                    variant="outlined"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Autor"
                    variant="outlined"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                />
                <div className={`el-imagen ${selectedFile ? 'img' : ''}`}>
                    {
                        selectedFile ?
                            <>
                                {preview &&
                                    <>
                                        <img src={preview} alt="Vista previa" style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
                                    </>
                                }
                            </> :
                            <div className="el-texto">
                                <p>Imagen</p>
                            </div>
                    }
                </div>
                <input type="file" id="archivo" accept="image/*" onChange={handleFileChange} />
                <div className="el-botones">
                    <Button
                        variant='contained'
                        onClick={() => { }}
                        sx={{
                            backgroundColor: 'rgb(0, 125, 255, 0.7)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#007dff'
                            }
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => { }}
                        sx={{
                            backgroundColor: 'rgb(0, 130, 25, 0.7)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#008219'
                            }
                        }}
                    >
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    )
}
