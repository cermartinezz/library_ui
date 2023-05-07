import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'
import BookForm from '../components/BookForm';
import BooksTable from '../components/BooksTable';
import { BooksContext } from '../context/BooksContext';
import { useQuery } from 'react-query';
import Api from '../helpers/api';
import getCookie from '../helpers/getCookie';
import Cookies from 'js-cookie';

function BookCatalog() {

  const {data:authors} =  useQuery('authors',fetchAuthors)

  async function fetchAuthors(){
    await getCookie();
    let token = Cookies.get('token');
    const response = await Api.get('/authors',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.result.authors;
  }
  
  const {data:genres} =  useQuery('genres',fetchGenres)

  async function fetchGenres(){
    await getCookie();

    let token = Cookies.get('token');
    const response = await Api.get('/genres',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.result.genres;
  }

  const {data:books,isLoading,isFetched,refetch} =  useQuery('books',fetchBooks)

  async function fetchBooks(){
    try {
      await getCookie();

      let token = Cookies.get('token');

      let response = await Api.get('/books?all=true',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      let {books} = response.data.result;


      return books;
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  if (isLoading) return 'Loading...'
  
  return (
    <div>
      <BooksContext.Provider value={{books,authors,genres,refetch}}>
        <div className="bg-white m-10 p-10 shadow-xl">
          <BookForm></BookForm>
          <BooksTable></BooksTable>
        </div>
      </BooksContext.Provider>
    </div>
  );
}

export default BookCatalog;
