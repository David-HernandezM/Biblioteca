import React from 'react'
import ReactDOM from 'react-dom/client'

import { Root } from './routes'
import { ErrorPage } from './routes'
import { 
  Index,
} from './routes'
import { BookInfo, bookInfoLoader } from './routes'
import { AddBook, addBookLoader} from './routes'

import { 
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom'

import { UserDataProvider } from './app/Context'
import { SnackbarProvider } from 'notistack'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [{
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: 'addBook',
          element: <AddBook />,
          loader: addBookLoader
        },
        {
          path: 'apartados',
          element: <h2>Apartados</h2>
        },
        {
          path: ':bookId',
          element: <BookInfo />,
          loader: bookInfoLoader
        }
      ]
    }]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={10} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
      <UserDataProvider>
        <RouterProvider router={router} />
      </UserDataProvider>
    </SnackbarProvider>
  </React.StrictMode>,
);
