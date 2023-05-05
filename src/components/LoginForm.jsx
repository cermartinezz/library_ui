import React, { useState } from 'react'

export default function LoginForm() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errorForm,setErrorForm] = useState(false);

  
  function changeEmail(event) {
    setEmail(event.target.value)
  }

  function changePassword(event) {
    setPassword(event.target.value)
  }


  function handleSubmit(event) {
    event.preventDefault();
    if(email != '' && password != ''){

    }else {
      setErrorForm(true)
    }
  }


  return (
    <div className="w-11/12 max-w-xl min-h-full">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input  
                  onChange={changeEmail}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Email"/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input 
                  onChange={changePassword}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={password}
                  placeholder="******************" />
        </div>
        { errorForm && (
            <div>
              <p className="text-red-500">Email and Password are required</p>
            </div>
            )
          }

        <div className="flex items-center justify-between">
          
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}
