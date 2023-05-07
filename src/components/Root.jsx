import React, { useEffect, useState } from 'react'
import AuthMenu from './AuthMenu'
import GuestMenu from './GuestMenu'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import { UserContext } from '../context/UserContext';
import Auth from '../helpers/Auth';
import Home from '../pages/Home';
import ListBooks from '../pages/ListBooks';
import BookCatalog from '../pages/BookCatalog';
import Copies from '../pages/Copies';
import Checkouts from '../pages/Checkouts';


export default function Root() {
  const [user,setUser] = useState(null)


  useEffect(() => {
    if(!user){
      Auth.readUser().then(value => {
        setUser(value)
      })
    }
  },[user])

  return (
    <div className='h-screen bg-gray-300'>
      <BrowserRouter>
        <UserContext.Provider value={{user,setUser}}>
            { user ? (
              <AuthMenu></AuthMenu>
            ):(
              <GuestMenu></GuestMenu>
            )}
            
            { (user == null) && (
                <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="*" element={<NotFound />}></Route>
                </Routes>
              ) 
            }

          { (user != null && user?.role == 'librarian') && (
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/books_catalog" element={<BookCatalog />}></Route>
                <Route path="/copies/:book_slug" element={<Copies />}></Route>
                <Route path="/login" element={<Navigate to='/' replace/>}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
             )  
          }

          { (user != null && user?.role == 'student') && ( 
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/books" element={<ListBooks />}></Route>
                <Route path="/copies/:book_slug" element={<Copies />}></Route>
                <Route path="/borrowed_books" element={<Checkouts />}></Route>
                <Route path="/login" element={<Navigate to='/' replace/>}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes> 
            )  
          }
          
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}
