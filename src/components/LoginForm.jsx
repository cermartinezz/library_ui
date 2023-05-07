import { useForm } from 'react-hook-form';
import getCookie from '../helpers/getCookie';
import Api from '../helpers/api';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Cookie from "js-cookie";
import { Navigate, useNavigate } from 'react-router-dom';

export default function LoginForm() {

  const [hasErrors,setHasErrors] = useState(false); 
  const [formError,setFormErrors] = useState('');
  const {user,setUser} = useContext(UserContext);
  let navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();


  async function onSubmit(form) {
    try {
      await getCookie();

      let response = await Api.post('/auth/login',form);

      let {token,user} = response.data.result;

      Cookie.set('token', token , { expires: 1, path: '/'})

      localStorage.setItem('user', JSON.stringify(user));
      setHasErrors(false);
      setUser(user)
      return navigate("/");
    } catch (error) {
      console.log(error.response.data.message)
      setHasErrors(true);
      setFormErrors(error.response.data.message)
    }
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
          {hasErrors && <span className='text-red-500'>{formError}</span>}
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
