import { Form } from "react-router-dom"

import './SearchBar.css';

export const SearchBar = () => {
  return (
    <div className="search-bar">
        <Form role='search'>
            <input 
                className="search-bar input"
                type="search" 
                name="bookName" 
                id="bookName" 
                placeholder="Buscar"
                aria-label="Buscar libro"
            />
        </Form>
    </div>
    
  );
}

// SearchBar.propTypes = {}
