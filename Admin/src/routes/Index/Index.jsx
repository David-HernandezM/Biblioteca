import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
    MessageModal, 
    UserLoginMessage,
} from "../../components";
import { userDataContext } from "../../app/Context";
import axios from "axios";
import { FaBook, FaHandHolding, FaCheck, FaTrash, FaEdit } from 'react-icons/fa';
import { Boton } from "../../components";
import './Index.css';

// import { booksData } from "../../app/booksdata";

import { booksData as booksDataTest } from "../../app/booksdata";

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


export const Index = () => {
    const navigate = useNavigate();

    const { userId, userName } = useContext(userDataContext);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(userId == null);

    const handleLoginCloseModal = () => setLoginModalIsOpen(false);

    const handleButtonClick = (pathToGo) => {
        if (!userId) {
            setLoginModalIsOpen(true);
            return;
        }

        navigate(pathToGo);
    }
    
    return (
        <div className='index'>
            <MessageModal openModal={loginModalIsOpen} handleModalClose={handleLoginCloseModal}>
                <UserLoginMessage
                    onLoginModalClose={handleLoginCloseModal}
                />
            </MessageModal>
            <h2
                className="indexTitle"
            >
                Administrador: { userName ?? '' }
            </h2>
            <div className="botones-container">
                <Boton 
                    icono={<FaBook />} 
                    texto="Agregar libro" 
                    onClick={() => handleButtonClick('/addbook')}
                />
                <Boton 
                    icono={<FaHandHolding />} 
                    texto="Prestar libro" 
                    onClick={() => handleButtonClick('/borrowbook')}
                />
                <Boton 
                    icono={<FaCheck />} 
                    texto="Devolver libro" 
                    onClick={() => handleButtonClick('/getbackbook')}
                />
                <Boton 
                    icono={<FaTrash />} 
                    texto="Eliminar libro" 
                    onClick={() => handleButtonClick('/deletebook')}
                />
                <Boton 
                    icono={<FaEdit />} 
                    texto="Editar libro" 
                    onClick={() => handleButtonClick('/editbook')}
                />
            </div>
          
        </div>
    );
};

