import { useState, useContext } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import {
    SearchBar,
    BookCard,
    MessageModal,
    ReserveBookModalMessage,
    UserLoginMessage,
    NoBooksMessage
} from "../../components/App";
import { Box, Button } from "@mui/material";
import { userDataContext } from "../../app/Context";
import axios from "axios";

import './Index.css';

// import { booksData } from "../../app/booksdata";

import { booksData as booksDataTest } from "../../app/booksdata";
import { MediaCard } from "../../components";

// Se crea una instancia de axios para hacer pruebas
// de conexion con el backend
const mockAxios = axios.create();

// Se intercepta la peticion, donde se configura
// el tiempo en el que se hizo la "peticion"
mockAxios.interceptors.request.use(
    req => {
        req.time = { startTime: new Date() };
        return req;
    },
    err => {
        return Promise.reject(err);
    }
);

// Se intercepta la respuesta, en donde utilizaremos
// informacion que nosotros tenemos para mandarla como
// respuesta, y modificaremos el campo de cuando se mando
// la respuesta y cuando duro en procesarse la peticion
mockAxios.interceptors.response.use(
    function (res) {
        res.config.time.endTime = new Date();

        res.data = booksDataTest;

        res.duration = res.config.time.endTime - res.config.time.startTime;
        return res;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export const loader = async () => {

    // Parte donde se hacen pruebas 
    try {
        const serverResponse = await mockAxios.get('books/');
        const { data } = serverResponse;

        return data.map((bookInfo) => {
            return {
                id: bookInfo.id_libro,
                title: bookInfo.titulo,
                autor: bookInfo.autor,
                image: bookInfo.imagen,
                description: bookInfo.descripcion,
                quantity: bookInfo.cantidad
            }
        });
    } catch (e) {
        console.log('ERROR EN EL SERVIDOR');
        throw new Error('ERRROR EN EL SERVIDOR');
    }

    // Parte que funciona haciendo una llamada GET al servidor.
    try {
        const serverResponse = await axios.get('http://localhost:5000/books/');
        const { data } = serverResponse;

        // console.log(JSON.stringify(data));

        return data.map((bookInfo) => {
            return {
                id: bookInfo.id_libro,
                title: bookInfo.titulo,
                autor: bookInfo.autor,
                image: bookInfo.imagen,
                description: bookInfo.descripcion,
                quantity: bookInfo.cantidad
            }
        });
    } catch (e) {
        console.log('ERROR EN EL SERVIDOR');
        throw new Error('ERRROR EN EL SERVIDOR');
    }
}



export const Index = () => {
    const navigate = useNavigate();
    const opciones = ['Agregar', 'Prestar', 'Devolver', 'Eliminar', 'Editar'];

    const redireccionar = (ruta) => {
        switch (ruta) {
            case 'Agregar':
                navigate('/agregar-libro');
                break;
            case 'Prestar':
                navigate('/prestar-libro');
                break;
            case 'Devolver':
                navigate('/devolver-libro');
                break;
            case 'Eliminar':
                navigate('/eliminar-libro');
                break;
            case 'Editar':
                navigate('/editar-libro');
                break;
            default:
                break;
        }
    }

    return (
        <div className='index'>
            <h1>Biblioteca</h1>
            <div className='index-options'>
                {opciones.map((opcion, index) => {
                    return (
                        <Box key={index} onClick={() => redireccionar(opcion)} sx={{ cursor: 'pointer' }} >
                            <MediaCard name={opcion} />
                        </Box>
                    )
                })
                }
            </div>
        </div>
    );
};



