import React from 'react'
import { useQuery } from 'react-query';
import getCookie from '../helpers/getCookie';
import Cookies from 'js-cookie';
import Api from '../helpers/api';
import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails';

export default function Copies() {

  let { book_id } = useParams();

  const {data:book,isLoading} =  useQuery('copies',fetchCopies)

  async function fetchCopies(){
    try {
      await getCookie();

      let token = Cookies.get('token');

      let response = await Api.get(`/books/${book_id}/copies`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      let {book} = response.data.result;


      return book;
    } catch (error) {
      console.log(error.response.data.message)
      return []
    }
  }

  if (isLoading) return 'Loading...'
  

  console.log(book);


  return (
    <div className='bg-white m-10 p-10 shadow-xl'>
      { book && (
          <BookDetails book={book}/>
        )
      }
    </div>
  )


}