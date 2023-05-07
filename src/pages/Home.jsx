import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import Cookies from 'js-cookie';

export default function Home() {

  const {user,setUser} = useContext(UserContext);

  function handleLogout(){
    localStorage.removeItem('user')
    Cookies.remove('token')
    setUser(null)
  }
  
  return (
    <div className='h-full min-h-screen p-10'>
      <div className='flex items-center min-h-screen flex-col justify-center rounded-md bg-white border-gray-400 shadow-sm place-content-center p-10 space-y-10'>
        <h1 className='font-bold text-2xl text-center'>{process.env.REACT_APP_NAME}</h1>
        {user ? (
          <NavLink 
            onClick={handleLogout}
            className='bg-gray-400 font-bold hover:bg-slate-700 px-4 py-2 rounded text-white text-center w-52' 
            to='/'>Logout</NavLink>
        ) : (
          <NavLink className='bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white text-center w-52' to='/login'>Login</NavLink>
        )}
      </div>
    </div>
  )
}
