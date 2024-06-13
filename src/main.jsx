import React from 'react'
import ReactDOM from 'react-dom/client'

import { Root } from './routes'
import { ErrorPage } from './routes'
import { Index } from './routes'
import { 
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom'
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
          element: <Index />
        },
        {
          path: 'apartados',
          element: <h2>Apartados</h2>
        }
      ]
    }]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
