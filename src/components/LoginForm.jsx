import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import postFetch from '../helpers/postFetch';
import { useCookies } from 'react-cookie';
import getCookie from '../helpers/getCookie';
import Api from '../helpers/api';

export default function LoginForm() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [cookies, setCookie] = useCookies();


  function onSubmit(data) {
    getCookie().then(() => {
      Api.post('/login',data)
    })
  }

  return (
    <div className="w-11/12 max-w-xl min-h-full">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" 
            onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input  
                  {...register("email", { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                  id="email"
                  type="email"
                  placeholder="Email"/>
          {errors.email && <span className='text-red-500'>The email is required</span>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
                  {...register("password", { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************" />
          {errors.password && <span className='text-red-500'>The password is required</span>}
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}
