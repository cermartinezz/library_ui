import React, { useContext, useState } from 'react'
import useToggle from '../hooks/useToggle';
import { BooksContext } from '../context/BooksContext';

export default function BookForm(props) {

  const [bookTitle,setBookTitle] = useState('');
  const [bookAuthor,setBookAuthor] = useState('');
  const [bookGenre,setBookGenre] = useState('');
  const [errorMessage,setErrorMessage] = useState(false);
  const [visible, toggleVisibility] = useToggle(false);
  const {authors,genres,books,setBooks} = useContext(BooksContext);

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
    event.preventDefault();

    if(bookAuthor != '' && bookGenre != '' && bookTitle != ''){
      let author = authors.filter(author => author.id == bookAuthor)[0];
      let genre = genres.filter(genre => genre.id == bookGenre)[0];

      setBooks([...books,{
        id: Math.floor(Math.random() * 100),
        title: bookTitle,
        total_of_copies: 1,
        total_available_copies: 0,
        total_rented_copies: 1,
        available_copies: [],
        rented_copies: [],
        author: author,
        genre: genre
      }]);
      setBookAuthor('');
      setBookGenre('');
      setBookTitle('');
      toggleVisibility();
      setErrorMessage(false)
    }else{
      setErrorMessage(true)
    }
  }

    




  return (
    <div>
      <button
        onClick={toggleVisibility}
        className={visible?
                  "bg-white hover:bg-gray-100 text-red-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-2" :
                  "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-2"}>
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
              {authors.map(item => (
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
              {genres.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow my-2">
            Agregar Libro
          </button>
          { errorMessage && (
              <span className="text-red-800">Fill all the elements to add a new book</span>
            )

          }
        </form>
      )

      }
    </div>
  )
}
