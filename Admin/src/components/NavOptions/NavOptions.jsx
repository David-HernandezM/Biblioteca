import { useState } from "react";
import { NavOption } from "../NavOption/NavOption"

import './NavOptions.css';

export const NavOptions = () => {
  const [catalogueOpen, setCatalogueOpen] = useState(true);

  return (
    <nav className="nav">
        <ul className="nav options">
            <NavOption 
              pageRedirectionName='/' 
              pageRedirectionText="Catálogo"
              selected={catalogueOpen}
              onClick={() => setCatalogueOpen(true)}
            />
            <NavOption 
              pageRedirectionName='/apartados' 
              pageRedirectionText="Apartados"
              selected={!catalogueOpen}
              onClick={() => setCatalogueOpen(false)}
            />
        </ul>
    </nav>
  )
}
