import React, { useContext, useEffect, useState } from 'react'
import useToggle from '../hooks/useToggle';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Auth from '../helpers/Auth';
import Cookies from 'js-cookie';

export default function GuestMenu() {

  const navigate = useNavigate();

  const breakpoint = 1022;
  const [visible, toggleVisibility, changeVisibility] = useToggle(true)
  const {user} = useContext(UserContext);

  useEffect(() => {
    window.addEventListener("resize", () => checkToToogleShow(window.innerWidth));
    checkToToogleShow(window.innerWidth)

    function checkToToogleShow(width){
      if(width > breakpoint){
        changeVisibility(true);
      }else{
        changeVisibility(false);
      }
    }
  }, []);

  function logout(){
    localStorage.removeItem('user')
    Cookies.remove('token')
    return navigate("/");
  }

 


  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
          <NavLink to='/' className="font-semibold text-xl tracking-tight">Library App</NavLink>
        </div>
        <div className="block lg:hidden">
          <button 
            onClick={toggleVisibility}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        { visible && (
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div className="text-sm lg:flex-grow">
              
              </div>
              <div>
                { user ? (
                  <button
                    onClick={logout()}
                    type="button"
                    to="/logout"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded  border-white border-transparent mt-4 lg:mt-0 text-teal-500 bg-white"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isPending,isActive  }) =>
                      isPending ? "" : isActive ? 
                                "inline-block text-sm px-4 py-2 leading-none border rounded  border-white border-transparent mt-4 lg:mt-0 text-teal-500 bg-white" 
                              : "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                    }
                  >
                    Login
                  </NavLink>
                  
                )}
              </div>
            </div>
          )
        }
      </nav>
  )
}
