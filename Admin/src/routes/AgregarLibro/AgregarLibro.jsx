import { Button, TextField } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import './agregar-libro.css'

export const AgregarLibro = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [nombre, setNombre] = React.useState('');
    const [autor, setAutor] = React.useState('');
    const [descripcion, setDescripcion] = useState('');
    const [b64Image, setB64Image] = useState('');

    const soloCaracteres = (cadena) => {
        return /^[a-zA-Z0-9]+$/.test(cadena);
    }

    const sendBookToBackend = () => {
        return new Promise((resolve, reject) => {
            const bookData = {
                titulo: nombre,
                autor: autor,
                portada: b64Image,
                descripcion: descripcion,
                cantidad: 1,
                cantidadPrestados: 0
            };
            axios.post('http://localhost:5000/books', bookData)
            .then(() => {
                resolve();
            })
            .catch(error => {
                console.log(error);
                reject();
            })
        });
    };

    const handleSubmitButton = async () => {
        const formatNombre = nombre.trim();
        const formatAutor = autor.trim();
        const formatDescripcion = descripcion.trim();

        if (formatNombre == '') {
            enqueueSnackbar('Nombre esta vacio!', {variant: 'error'});
            return;
        }

        if (!soloCaracteres(formatNombre)) {
            enqueueSnackbar('Nombre solo debe contener letras!', {variant: 'error'});
            return;
        }

        if (formatAutor == '') {
            enqueueSnackbar('Autor esta vacio!', {variant: 'error'});
            return;
        }

        if (!soloCaracteres(formatAutor)) {
            enqueueSnackbar('Autor solo debe contener letras!', {variant: 'error'});
            return;
        }

        if (formatDescripcion == '') {
            enqueueSnackbar('Descriocion esta vacio!', {variant: 'error'});
            return;
        }

        if (b64Image == '') {
            enqueueSnackbar('falta imagen de libro!', {variant: 'error'});
            return;
        }

        try {
            await sendBookToBackend();
            enqueueSnackbar('Se agrego un nuevo libro!', {variant: 'success'});
            navigate('/addbook');
        } catch (error) {
            enqueueSnackbar('Error al agregar libro!', {variant: 'error'});
        }
    };


    // Verifica si es una imagen por extensión
    const esImagenPorExtension = (nombreArchivo) => {
        const extension = nombreArchivo.toLowerCase().split('.').pop();
        return ['.jpg', '.jpeg', '.png'].includes(`.${extension}`);
    };

    // Verifica si es una imagen por tipo MIME
    const esImagenPorTipoMIME = (tipoMIME) => {
        return tipoMIME.startsWith('image/');
    };

    return (
        <div className="al-body">
            <div className="al-contenedor">
                <h1>Agregar libro</h1>
                <TextField
                    fullWidth
                    id="nombreLibro"
                    name='nombreLibro'
                    label="Nombre del libro"
                    variant="outlined"
                    required={true}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <TextField
                    fullWidth
                    id="autorLibro"
                    name='autorLibro'
                    label="Autor"
                    variant="outlined"
                    value={autor}
                    required={true}
                    onChange={(e) => setAutor(e.target.value)}
                />
                <TextField
                    fullWidth
                    id="autorLibro"
                    name='autorLibro'
                    label="Descipcion"
                    variant="outlined"
                    value={descripcion}
                    required={true}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <div className="al-archivo">
                    <input 
                        type="file" 
                        id="archivo" 
                        name="archivo" 
                        required
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                if (esImagenPorExtension(file.name) && esImagenPorTipoMIME(file.type)) {
                                    const b64Image = event.target.result;
                                    setB64Image(b64Image);
                                } else {
                                    enqueueSnackbar('No es una imagen valida!', {variant: 'error'});
                                }
                            }
                            reader.readAsDataURL(file);
                        }}
                    />
                </div>
                <Button
                    variant='contained'
                    onClick={handleSubmitButton}
                    sx={{
                        backgroundColor: 'rgb(0, 130, 25, 0.7)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#008219'
                        }
                    }}
                >
                    Agregar
                </Button>
            </div>
        </div>
    )
}
