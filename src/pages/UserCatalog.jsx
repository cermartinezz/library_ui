import React from 'react';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import { UserContext } from '../context/UserContext';
import { useQuery } from 'react-query';
import Api from '../helpers/api';
import getCookie from '../helpers/getCookie';
import Cookies from 'js-cookie';

function UserCatalog() {

  const {data:users,isLoading,refetch} =  useQuery('users',fetchUsers)

  async function fetchUsers(){
    try {
      await getCookie();

      let token = Cookies.get('token');

      let response = await Api.get('/users',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      let {users} = response.data.result;


      return users;
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  if (isLoading) return 'Loading...'
  
  return (
    <div>
      <UserContext.Provider value={{users,refetch}}>
        <div className="bg-white m-10 p-10 shadow-xl">
          <UserForm></UserForm>
          <UserTable></UserTable>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default UserCatalog;
