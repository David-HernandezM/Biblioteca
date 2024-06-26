import { NavOptions } from "../../NavOptions/NavOptions";

import './Header.css';

export const Header = () => {
    return (
        <header className="header">
            <h1
                className="header logo"
            >
                Biblioteca
            </h1>
            <NavOptions />
        </header>
    );
}