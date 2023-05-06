import React, { useEffect, useState } from 'react';
import useLocalStorage from './../hooks/useLocalStorage'
import BookForm from '../components/BookForm';
import BooksTable from '../components/BooksTable';
import { BooksContext } from '../context/BooksContext';
import { useQuery } from 'react-query';
import Api from '../helpers/api';

function Home() {
  const [books,setBooks] = useLocalStorage('books',[]);

  const {data:authors} =  useQuery('authors',fetchAuthors)

  async function fetchAuthors(){
    const response = await Api.get('/authors');
    return response.data.result.authors;
  }
  
  const {data:genres} =  useQuery('genres',fetchGenres)

  async function fetchGenres(){
    const response = await Api.get('/genres');
    return response.data.result.genres;
  }


  return (
    <div>
      { books && (
          <BooksContext.Provider value={{books,setBooks,authors,genres}}>
          <div className='p-10'>
            <BookForm></BookForm>
            <BooksTable></BooksTable>
          </div>
        </BooksContext.Provider>
      )

    }
    </div>
  );
}

export default Home;
