import React, { useContext, useState } from 'react'
import useToggle from '../hooks/useToggle';
import { BooksContext } from '../context/BooksContext';
import { useForm } from 'react-hook-form';
import getCookie from '../helpers/getCookie';
import Cookies from 'js-cookie';
import Api from '../helpers/api';

export default function BookForm(props) {

  const [visible, toggleVisibility] = useToggle(false);
  const {authors,genres,books} = useContext(BooksContext);
  const [hasErrors,setHasErrors] = useState(false); 
  const [isSuccess,setSetIsSuccess] = useState(false); 
  const [message,setMessage] = useState('');

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm();

  async function onSubmit(form) {
    try {
      await getCookie();

      let token = Cookies.get('token');

      console.log('token',token)

      let response = await Api.post('/books',{
        title: form.title,
        author_id: form.author_id,
        genre_id: form.genre_id,
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      console.log(response.data.result)

    } catch (error) {
      console.log(error.response.data.message)
      setHasErrors(true);
      setMessage(error.response.data.result.message)
      reset()
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
              onSubmit={handleSubmit(onSubmit)}
              className='border p-3 flex flex-col bg-gray-100 space-y-2'>
          <div>
            <label htmlFor="title">Title: </label>
            <input 
              {...register("title", { required: true })}
              type="text"
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              name='title'
              id='title'
              placeholder='Insert The Title'
            />
            {errors.title && <span className='text-red-500'>The title is required</span>}
          </div>
          <div>
            <label htmlFor="author_id">Auhtor: </label>
            <select 
                      {...register("author_id", { required: true })}
                      name='author_id'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'>
                <option value="">Author...</option>
                {authors.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            {errors.author_id && <span className='text-red-500'>The author is required</span>}
          </div>
          <div>
            <label htmlFor="genre_id">Genre: </label>
            <select {...register("genre_id", { required: true })}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'>
              <option value="">Genre...</option>
              {genres.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.genre_id && <span className='text-red-500'>The genre is required</span>}
            {hasErrors && <span className='text-red-500'>{message}</span>}
            {isSuccess && <span className='text-green-500'>{message}</span>}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Agregar Libro
          </button>
        </form>
      )

      }
    </div>
  )
}
