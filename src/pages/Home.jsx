import React, { useEffect } from 'react';
import useLocalStorage from './../hooks/useLocalStorage'
import BookForm from '../components/BookForm';
import BooksTable from '../components/BooksTable';
import { BooksContext } from '../context/BooksContext';


function Home() {

  const [authors,setAuthors] = useLocalStorage('authors',[
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
    <BooksContext.Provider value={{books,setBooks,authors,genres}}>
      <div className='p-10'>
        <BookForm></BookForm>
        <BooksTable></BooksTable>
      </div>
    </BooksContext.Provider>
  );
}

export default Home;
