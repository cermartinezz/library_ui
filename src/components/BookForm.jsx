import React, { useState } from 'react'
import useToggle from '../hooks/useToggle';

export default function BookForm(props) {

  const [bookTitle,setBookTitle] = useState('');
  const [bookAuthor,setBookAuthor] = useState('');
  const [bookGenre,setBookGenre] = useState('');
  const [visible, toggleVisibility] = useToggle(false);

  function changeTitle (event) {
    setBookTitle(event.target.value)
  }

  function changeAuthor (event) {
    setBookAuthor(event.target.value)
  }

  function changeGenre(event) {
    setBookGenre(event.target.value)
  }

  function addBook(event){
    props.addBook(event,bookAuthor,bookGenre,bookTitle)
    setBookAuthor('');
    setBookGenre('');
    setBookTitle('');
    toggleVisibility();
  }




  return (
    <div>
      <button
        onClick={toggleVisibility}
        className={visible?
                  "rounded-full bg-red-400 px-3 py-3 font-bold mb-2" :
                  "rounded-full bg-blue-400 px-3 py-3 font-bold mb-2"}>
        {visible ?'Cancelar':'Agregar Libro'}
      </button>

      { visible && (
        <form action='#' 
              onSubmit={addBook} 
              className='border p-3 flex flex-col bg-gray-100 space-y-2'>
          <div>
            <label htmlFor="book_title">Title: </label>
            <input 
              type="text"
              className='w-full rounded-sm p-1'
              name='book_title'
              id='book_title'
              value={bookTitle}
              onChange={changeTitle}
              placeholder='Insert The Title'
            />
          </div>
          <div>
            <label htmlFor="book_author">Auhtor: </label>
            <select onChange={changeAuthor} value={bookAuthor} 
                    className='w-full rounded-sm p-1'>
              <option value="">Author...</option>
              {props.authors.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
          </div>
          <div>
            <label htmlFor="book_genre">Genre: </label>
            <select onChange={changeGenre} value={bookGenre} 
                    className='w-full rounded-sm p-1'>
              <option value="">Genre...</option>
              {props.genres.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="w-1/5 rounded-full bg-blue-400 hover:bg-blue-500 px-3 py-3 font-bold my-2">
            Agregar Libro
          </button>
        </form>
      )

      }
    </div>
  )
}
