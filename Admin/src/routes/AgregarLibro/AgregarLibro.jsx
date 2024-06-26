import { Button, TextField } from '@mui/material'
import React from 'react'

import './agregar-libro.css'

export const AgregarLibro = () => {
    const [nombre, setNombre] = React.useState('');
    const [autor, setAutor] = React.useState('');

    return (
        <div className="al-body">
            <div className="al-contenedor">
                <h1>Agregar libro</h1>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Nombre del libro"
                    variant="outlined"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Autor"
                    variant="outlined"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                />
                <div className="al-archivo">
                    <input type="file" id="archivo" name="archivo" />
                </div>
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
                    Agregar
                </Button>
            </div>
        </div>
    )
}
