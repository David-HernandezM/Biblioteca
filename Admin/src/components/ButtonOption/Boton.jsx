
import './Boton.css'; 

export const Boton = ({ icono, texto, onClick }) => {
    return (
        <div className="boton" onClick={() => {
            if (onClick) onClick();
        }}>
            {icono}
            <p>{texto}</p>
        </div>
    );
};

