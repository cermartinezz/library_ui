import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import { UserContext } from '../context/UserContext';
import Api from '../helpers/api';
import Cookies from 'js-cookie';
import getCookie from '../helpers/getCookie';


export default function Root() {
  const [user,setUser] = useState(null)

  useEffect(() => {
    const token = Cookies.get('token')
    if(!token){
      localStorage.removeItem('user');
      setUser(null);
    }else{
      fetchUser();
    }

    async function fetchUser() {
      try {
        await getCookie();
  
        let response = await Api.get('/auth/user',{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
  
        let {user} = response.data.result;
  
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.log(error.response.data.message)
      }

    }
  },[])

  return (
    <div className='h-full'>
      <BrowserRouter>
        <UserContext.Provider value={{user}}>
          <NavBar></NavBar>
          
            { user?.id ? (
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/borrowed_books" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/borrowed_books" element={<Home />}></Route>
                <Route path="/login" element={<Navigate to="/" replace />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            ) }
          
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}
