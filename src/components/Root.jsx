import React, { useEffect } from 'react'
import NavBar from './NavBar'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

export default function Root() {
  return (
    <div className='h-full'>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/borrowed_books" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
