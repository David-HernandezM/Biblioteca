import { useRouteError } from "react-router-dom";
import './ErrorPage.css';

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className='error-page'>
        <h2 className="error-page__title">Oops!</h2>
        <p className="error-page__description">Lo sentimos, la pagina no esta disponible o verifique que haya ingresado correctamente el enlace</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
    </div>
  );
}
