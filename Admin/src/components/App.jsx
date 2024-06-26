export { NavOption } from "./NavOption/NavOption";
export { NavOptions } from "./NavOptions/NavOptions";
export { Header } from "./layout";
export { SearchBar } from "./SearchBar/SearchBar";
export { BookCard } from "./BookCard/BookCard";
export { MessageModal } from "./MessageModal/MessageModal";
export { 
    ReserveBookModalMessage,
    UserLoginMessage
} from "./ModalMessages";
export { NoBooksMessage } from "./NoBooksMessage/NoBooksMessage";


import React from 'react';
import EditBook from './EditarBotones/EditBook';

const App = () => {
  return (
    <div>
      <EditBook />
    </div>
  );
};

export default App;
