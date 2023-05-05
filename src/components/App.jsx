import React,{useState} from 'react';
// import BookForm from './BookForm';
import BooksTable from './BooksTable';
import BookForm from './BookForm';
import NavBar from './NavBar';
import useLocalStorage from '../hooks/useLocalStorage';
import { BooksContext } from '../context/BooksContext';


function App() {

  const [authors] = useLocalStorage('authors',[
    {
      id: 1,
      name: "Carlos Sebastian"
    },
    {
      id: 2,
      name: "Arturo Gonzales"
    }
  ]);
  const [genres] = useLocalStorage('genres',[
    {
      id: 1,
      name: "Action"
    },
    {
      id: 2,
      name: "Adventure"
    }
  ]);

  const [books, setBooks] = useLocalStorage('books',[]);

  return (
    <div className='min-h-screen '>
      <NavBar></NavBar>
      <main className="p-10" id='main'>
        <BooksContext.Provider value={{books,setBooks,authors,genres}}>
          <BookForm></BookForm>
          <BooksTable></BooksTable>
        </BooksContext.Provider>
      </main>
    </div>
  );
}

export default App;
