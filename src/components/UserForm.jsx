import React, { useContext, useState } from 'react'
import useToggle from '../hooks/useToggle';
import { useForm } from 'react-hook-form';
import getCookie from '../helpers/getCookie';
import Cookies from 'js-cookie';
import Api from '../helpers/api';
import { useQuery } from 'react-query';
import { UserContext } from '../context/UserContext';

export default function UserForm(props) {

  const {users,refetch} = useContext(UserContext);
  const [visible, toggleVisibility] = useToggle(false);
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

      await Api.post('/users',{
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        role_id: form.role_id,
        password: form.password,
        password_confirmation: form.password_confirmation,
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      refetch()
      toggleVisibility();
      reset();


    } catch (error) {
      setHasErrors(true);
      setMessage(error.response.data.message)
    }
  }

  const {data:roles} =  useQuery('roles',fetchRoles)

  async function fetchRoles(){
    await getCookie();

    let token = Cookies.get('token');
    const response = await Api.get('/roles',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.result.roles;
  }

    




  return (
    <div>
      <button
        onClick={toggleVisibility}
        className={visible?
                  "bg-white hover:bg-gray-100 text-red-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-2" :
                  "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-2"}>
        {visible ?'Cancel':'Add User'}
      </button>

      { visible && (
        <form action='#' 
              onSubmit={handleSubmit(onSubmit)}
              className='p-3 flex flex-col border-2 bg-gray-100 border-gray-500 rounded-md shadow-md'>
          <div>
            <label htmlFor="first_name">First Name: </label>
            <input 
              {...register("first_name", { required: true })}
              type="text"
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              name='first_name'
              id='first_name'
              placeholder='Roberto'
            />
            {errors.first_name && <span className='text-red-500'>The first name is required</span>}
          </div>
          <div>
            <label htmlFor="last_name">First Name: </label>
            <input 
              {...register("last_name", { required: true })}
              type="text"
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              name='last_name'
              id='last_name'
              placeholder='Rodriguez'
            />
            {errors.last_name && <span className='text-red-500'>The last name is required</span>}
          </div>
          <div>
            <label htmlFor="email">First Name: </label>
            <input 
              {...register("email", { required: true })}
              type="email"
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              name='email'
              id='email'
              placeholder='email@domain.com'
            />
            {errors.email && <span className='text-red-500'>The email is required</span>}
          </div>
          <div>
            <label htmlFor="role_id">Role: </label>
            <select 
                      {...register("role_id", { required: true })}
                      name='role_id'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'>
                <option value="">Role...</option>
                {roles.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            {errors.role_id && <span className='text-red-500'>The role is required</span>}
          </div>
          <div>
            <label htmlFor="password">Password: </label>
              <input 
                {...register("password", { required: true })}
                type="text"
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                name='password'
                id='password'
                placeholder='*************'
              />
            {errors.password && <span className='text-red-500'>The password is required</span>}
          </div>
          <div>
            <label htmlFor="password_confirmation">First Name: </label>
              <input 
                {...register("password_confirmation", { required: true })}
                type="text"
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                name='password_confirmation'
                id='password_confirmation'
                placeholder='*************'
              />
            {errors.password_confirmation && <span className='text-red-500'>The password confirmation is required</span>}
            {/* { formErrors?.password && formErrors?.password.map((error) => (<span className='text-red-500'>The password confirmation is required</span>))
            } */}
          </div>
          {hasErrors && <span className='text-red-500'>{message}</span>}
          {isSuccess && <span className='text-green-500'>{message}</span>}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add User
          </button>
        </form>
      )

      }
    </div>
  )
}
