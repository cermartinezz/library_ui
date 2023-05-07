import React, { useState } from 'react'
import { useQuery } from 'react-query';
import getCookie from '../helpers/getCookie';
import Cookies from 'js-cookie';
import Api from '../helpers/api';
import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails';
import { CheckoutContext } from '../context/CheckoutContext';
import useToggle from '../hooks/useToggle';

export default function Copies() {

  let { book_slug } = useParams();

  const {data:book,isLoading,refetch} =  useQuery('copies',fetchBookDetails)
  const [showAddCopyModal,toggleShowAddCopyModal,setShowAddCopyModalVisibility] = useToggle(false)
  const [showModal,toggle,setVisibility] = useToggle(false)
  const [checkoutBook,setCheckoutBook] = useState(null);
  const [bookDetails,setBookDetails] = useState(null);

  async function fetchBookDetails(){
    try {
      await getCookie();

      let token = Cookies.get('token');

      let response = await Api.get(`/books/${book_slug}/copies`,{
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
  


  return (
    <div className='bg-white m-10 p-10 shadow-xl'>
      { book && (
          <CheckoutContext.Provider value={{
              book,showModal,setVisibility,checkoutBook,
              setCheckoutBook,refetch,showAddCopyModal,setShowAddCopyModalVisibility,setBookDetails,
              bookDetails
              }}>
            <BookDetails book={book}/>
          </CheckoutContext.Provider>
        )
      }
    </div>
  )


}