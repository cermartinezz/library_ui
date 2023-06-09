import React, { useContext } from 'react'
import CopiesList from './CopiesList';
import CheckoutList from './CheckoutList';
import CheckoutFormModal from './CheckoutFormModal';
import AddCopyModal from './AddCopyModal';
import { CheckoutContext } from '../context/CheckoutContext';

export default function BookDetails(props) {
  const {showModal,showAddCopyModal} = useContext(CheckoutContext)
  console.log(props.book);
  return (
    <div className='space-y-3'>
      { showModal && (
          <CheckoutFormModal />
        )
      }

      { showAddCopyModal && (
          <AddCopyModal />
        )
      }

      <div className='flex flex-col justify-between border-2 rounded-md border-gray-500 p-4'>
        <h1 className='font-bold text-4xl mb-3'>Books Details</h1>
        <div className='flex flex-col'>
          <p className='font-bold'>Title: <span className='text-blue-400'>{props.book.title}</span></p>
          <p className='font-bold'>Author: <span className='text-blue-400'>{props.book.author.name}</span></p>
          <p className='font-bold'>Genre: <span className='text-blue-400'>{props.book.genre.name}</span></p>
        </div>
      </div>
      <CopiesList copies={props.book.available_copies} book={props.book} title="Avaiable Copies" />
      <CheckoutList checkouts={props.book.rented_copies} title="Rented Copies" />
      <CheckoutList checkouts={props.book.checkouts} title="Previous Rented Copies" />
    </div>
  )
}
