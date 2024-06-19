import { useState } from 'react';
import { 
    useLoaderData,
    useNavigate
} from "react-router-dom";
import { Button } from "@mui/material";
import { 
    MessageModal,
    ReserveBookModalMessage
} from '../../components';
import { useSnackbar } from 'notistack';
import axios from 'axios';

import './BookInfo.css';


const mockAxios = axios.create();
// mockAxios.interceptors.request.use(config => {
//     console.log('Intercepting request: ', config);
//     // Aquí puedes verificar la URL o los parámetros de la petición y retornar una respuesta simulada
//     if (config.url === '/ruta/simulada') {
//         console.log('No pues si paso la mdre esa');
//         return Promise.resolve({
//             data: { mockkey: 'mockvaluexddddd' },
//             status: 200,
//             statusText: 'OK',
//             headers: {
//             },
//             config
//         });
//     }
//     // Si no es una petición que quieras simular, simplemente retorna la configuración sin cambios
//     console.log('Se retornara el pdo sin cambios');
//     return config;
//   }, error => {
//     console.log('Hubo un error!!');
//     return Promise.reject(error);
//   });

// // mockAxios.interceptors.request.use(request => {
// //     console.log('Intercepting request: ', request);
    
    
// // });

// mockAxios.interceptors.response.use(response => {
//     console.log('Se intercepto la respuesta!!');
//     console.log(response.config);

//     return Promise.resolve({
//         data: { mockkey: 'mockvaluexddddd' },
//         status: 200,
//         statusText: 'OK',
//         headers: {
//         },
//         config: response.config
//     });
// });


mockAxios.interceptors.request.use(
    function (req) {
      req.time = { startTime: new Date() };
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  mockAxios.interceptors.response.use(
    function (res) {
      res.config.time.endTime = new Date();
      res.duration =
        res.config.time.endTime - res.config.time.startTime;
      return res;
    },
    (err) => {
      return Promise.reject(err);
    }
  );





import { getBookData } from '../../app/booksdata';




export const action = () => {
    
}

export const loader = async ({ params }) => {
    // aca se llama al backend para obtener la informacion.
    // De igual forma estaria bien almacenar el contenido por si se
    // vuelve a checar la informacion del libro.
    // const book = getBook(); 

    // mockAxios.get('/ruta/simulada')
    //     .then(response => {
    //         console.log('Lo que se optubo;');
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.log('Se recibio un error!');
    //         console.log(error);
    //     });

    mockAxios
    .get("http://localhost:3000")
    .then((res) => {
      console.log(res.duration)
    })
    .catch((err) => {
      console.log(err);
    });


    console.log('LEYENDO CON AXIOOOOOOOOOOOOOOS');

    // parte donde funciona haciendo GET en el servidor.
    try {
        const bookData = await axios
            .get(`http://localhost:5000/books/${params.bookId}`);

        const { data } = bookData;


        const book = {
            title: data.titulo,
            autor: data.autor,
            image: data.portada,
            description: data.descripcion
        };
    
        return {
            book,
            bookId: params.bookId
        };
    } catch(e) {
        console.log(e.response.status);
        console.log('terminado mostrar errores');
        const errorStatus = e.response.status;
        let errorMessage;

        if (errorStatus >= 500) {
            errorMessage = 'Error en el servidor!';
        } else if (errorStatus >= 400) {
            errorMessage = 'No se encontro lo que estas buscando!';
        } else {
            errorMessage = 'A ocurrido un error!';
        }

        throw new Error(errorMessage);
    }

    

}

export const BookInfo = () => {
    const navigate = useNavigate();
    const { book, bookId } = useLoaderData();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();


    const handleCloseModal = () => setModalIsOpen(false);

    return (
        <div>
            <MessageModal openModal={modalIsOpen} handleModalClose={handleCloseModal}>
                <ReserveBookModalMessage 
                    bookId={bookId} 
                    bookTitle={book.title}
                    onCloseModal={handleCloseModal}
                />
            </MessageModal>
            <div className="book-details">
                <div className="book-details__image">
                    <img 
                        src={book.image} 
                        alt="portada de libro" 
                    />
                </div>
                <div className="book-details__container">
                    <div className="book-details__title-reserve">
                        <h2
                            className="book-details__title"
                        >
                            {book.title}
                        </h2>
                        <div className='book-details__buttons-options'>
                            <Button 
                                variant='contained'
                                onClick={() => navigate(-1)}
                            >
                                Regresar
                            </Button>
                            <Button 
                                variant='contained'
                                color='success'
                                onClick={() => {
                                    console.log(bookId);
                                    setModalIsOpen(true);
                                    enqueueSnackbar('Libro apartado!', {variant: 'success'});
                                }}
                            >
                                Reservar
                            </Button>
                        </div>
                        
                    </div>
                    <h2
                        className="book-details__autor"
                    >
                        {book.autor}
                    </h2>
                    <p
                        className="book-details__description"
                    >
                        {book.description}
                    </p>
                </div>
            </div>
        </div>
        
    )
}
