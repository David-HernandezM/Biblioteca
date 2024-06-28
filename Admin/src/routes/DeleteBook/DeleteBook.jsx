import { useState, useContext } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { 
    SearchBar,
    BookCard,
    MessageModal, 
    UserLoginMessage,
    NoBooksMessage
} from "../../components";
import { Button } from "@mui/material";
import { userDataContext } from "../../app/Context";
import { useSnackbar } from "notistack";
import axios from "axios";

import '../AddBook/AddBook.css';

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

    // // Parte donde se hacen pruebas 
    // try {
    //     const serverResponse = await mockAxios.get('books/');
    //     const { data } = serverResponse;

    //     return data.map((bookInfo) => {
    //         return {
    //             id: bookInfo.id_libro,
    //             title: bookInfo.titulo,
    //             autor: bookInfo.autor,
    //             image: bookInfo.imagen,
    //             description: bookInfo.descripcion,
    //             quantity: bookInfo.cantidad
    //         }
    //     });
    // } catch (e) {
    //     console.log('ERROR EN EL SERVIDOR');
    //     throw new Error('ERRROR EN EL SERVIDOR');
    // }

    // Parte que funciona haciendo una llamada GET al servidor.
    try {
        const serverResponse = await axios.get('http://localhost:5000/books');

        const { data } = serverResponse;

        // console.log(JSON.stringify(data));

        return data.map((bookInfo) => {
            return {
                id: bookInfo.id_libro,
                title: bookInfo.titulo,
                autor: bookInfo.autor,
                image: bookInfo.portada,
                description: bookInfo.descripcion,
                quantity: bookInfo.cantidad
            }
        });
    } catch (e) {
        console.log('ERROR EN EL SERVIDOR');
        throw new Error('ERRROR EN EL SERVIDOR');
    }
}


export const DeleteBook = () => {
    const navigate = useNavigate();
    const booksData = useLoaderData();
    const { enqueueSnackbar } = useSnackbar();

    const { userId } = useContext(userDataContext);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

    const handleLoginCloseModal = () => setLoginModalIsOpen(false);


    const deleteOne = (bookId) => {
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:5000/books/deleteCopy/${bookId}`)
            .then(() => {
                resolve();
            })
            .catch(() => {
                reject();
            });
        });
    }

    const handleIncrementBook = async (bookId) => {
        try {
            await addOneBook(bookId);
            enqueueSnackbar('Se agrego una copia!', { variant: 'success' });
            navigate('/addbook');
        } catch(error) {
            enqueueSnackbar('Error al agregar copia!', { variant: 'error' });
        }
    }

    const deleteBook = (bookId) => {
        return new Promise((resolve, reject) => {
            axios.delete(`http://localhost:5000/books/${bookId}`)
            .then(() => {
                resolve();
            })
            .catch(() => {
                reject();
            });
        });
    }

    const handleDeleteBook = async (bookId) => {
        try { 
            await deleteBook(bookId);
            enqueueSnackbar('Se elimino el libro con exito!', {variant: 'success'});
            navigate('/deletebook');
        } catch(e) {
            enqueueSnackbar('Error al eliminar libro!', { variant: 'error'});
        }
    }

    return (
        <div className='addbook'>
            <MessageModal openModal={loginModalIsOpen} handleModalClose={handleLoginCloseModal}>
                <UserLoginMessage
                    onLoginModalClose={handleLoginCloseModal}
                />
            </MessageModal>

            <SearchBar />
            
            <div className='addbook__books-cards'>
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
                                            onClick={async () => {
                                                if (data.quantity == 0) {
                                                    enqueueSnackbar('No se tienen copias!', { variant: 'error' });
                                                    return;
                                                }

                                                try {
                                                    await deleteOne(data.id);
                                                    enqueueSnackbar('Se elimino una copia!');
                                                    navigate('/deletebook');
                                                } catch(error) {
                                                    enqueueSnackbar('Hubo un error al eliminar copia!', {variant: 'success'});
                                                }
                                            }}
                                        >
                                            Eliminar 1
                                        </Button>
                                        <Button 
                                            variant='contained' 
                                            color='success'
                                            style={{width: "40%"}}
                                            onClick={async () => {
                                                if (!userId) {
                                                    // setLoginModalIsOpen(true);
                                                    navigate('/');
                                                    return;
                                                }
                                                // setBookData({
                                                //     bookId: data.id,
                                                //     bookTitle: data.title
                                                // });
                                                // navigate("djfjs3/reserve")

                                                await handleDeleteBook(data.id);
                                            }}
                                        >
                                            Eliminar libro
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