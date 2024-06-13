import { SearchBar } from "../../components";
import { BookCard } from "../../components"; 

import { Button } from "@mui/material";

import './Index.css';

export const Index = () => {
    return (
        <div className='index'>
            <SearchBar />
            <div className='index__books-cards'>
                <BookCard 
                    bookTitle='La metamorfosis' 
                    image="https://robohash.org/${contact.id}.png?size=200x200" 
                    bookAutor='Lorem ipsum' 
                    quantity={0} 
                    numBorrowed={3}
                >
                    <Button variant='contained'>
                        Hola
                    </Button>
                    <Button variant='contained'>
                        Hola
                    </Button>
                </BookCard>
                <BookCard 
                    image="https://robohash.org/${contact.id}.png?size=200x200"
                    bookTitle='La metamorfosis' 
                    bookAutor='Lorem ipsum'
                >
                    <p style={{margin: 0}}>Adquirido, devolver el 27/10/2024</p>
                </BookCard>
            </div>
        </div>
    );
};

