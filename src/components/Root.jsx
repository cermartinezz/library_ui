import React, { useEffect, useState } from 'react'
import AuthMenu from './AuthMenu'
import GuestMenu from './GuestMenu'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import BookCatalog from '../pages/BookCatalog';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import { UserContext } from '../context/UserContext';
import Auth from '../helpers/Auth';
import Home from '../pages/Home';


export default function Root() {
  const [user,setUser] = useState(null)


  useEffect(() => {
    console.log('------------------------------------------------------------------')
    console.log('estar en root');
    if(!user){
      Auth.readUser().then(value => {
        console.log('user value',value);
        setUser(value)
      })
    }
  },[user])

  return (
    <div className='h-screen bg-gray-300'>
      <BrowserRouter>
        <UserContext.Provider value={{user,setUser}}>
            { user ? (<AuthMenu></AuthMenu>):(<GuestMenu></GuestMenu>)}
            { (user == null) ? (
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/books_catalog" element={<BookCatalog />}></Route>
                <Route path="/login" element={<Navigate to="/" replace />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            ) }
          
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}
