import { useState, useContext } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { 
    SearchBar,
    BookCard,
    MessageModal, 
    ReserveBookModalMessage,
    UserLoginMessage,
    NoBooksMessage
} from "../../components";
import { Button } from "@mui/material";
import { userDataContext } from "../../app/Context";
import axios from "axios";

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

export const loader = async () => {

    // Parte donde se hacen pruebas 
    try {
        const serverResponse = await mockAxios.get('http://localhost:5000/books/');
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
    const booksData = useLoaderData();

    const { userId } = useContext(userDataContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [bookData, setBookData] = useState({
        bookId: '',
        bookTitle: ''
    });

    const handleCloseModal = () => setModalIsOpen(false);
    const handleLoginCloseModal = () => setLoginModalIsOpen(false);

    return (
        <div className='index'>
            <MessageModal openModal={loginModalIsOpen} handleModalClose={handleLoginCloseModal}>
                <UserLoginMessage
                    onLoginModalClose={handleLoginCloseModal}
                />
            </MessageModal>
            <MessageModal openModal={modalIsOpen} handleModalClose={handleCloseModal}>
                <ReserveBookModalMessage 
                    bookId={bookData.bookId} 
                    bookTitle={bookData.bookTitle}
                    onCloseModal={handleCloseModal}
                />
            </MessageModal>
            <SearchBar />
            <div className='index__books-cards'>
                {
                    booksData.length > 0 ? (
                        booksData.map((data) => {
                            return (
                                <BookCard
                                    key={data.id}
                                    bookTitle={data.title}
                                    image={data.image}
                                    bookAutor={data.autor}
                                    quantity={data.quantity}
                                >
                                    <>
                                        <Button 
                                            variant='contained'
                                            style={{width: "40%"}}
                                            onClick={() => {
                                                navigate(''+data.id);
                                            }}
                                        >
                                            Detalles
                                        </Button>
                                        <Button 
                                            variant='contained' 
                                            color='success'
                                            style={{width: "40%"}}
                                            disabled={data.quantity == 0}
                                            onClick={() => {
                                                if (!userId) {
                                                    setLoginModalIsOpen(true);
                                                    return;
                                                }
                                                setModalIsOpen(true);
                                                setBookData({
                                                    bookId: data.id,
                                                    bookTitle: data.title
                                                });
                                                // navigate("djfjs3/reserve")
                                            }}
                                        >
                                            Reservar
                                        </Button>
                                    </>
                                </BookCard>
                            );
                        })
                    ) : (
                        <NoBooksMessage />
                    )
                }
            </div>
        </div>
    );
};

