import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

export default function UserTable() {

	const {users} = useContext(UserContext);

	return (
		<div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">First Name</th>
                  <th scope="col" className="px-6 py-4">Last Name</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">Role</th>
                </tr>
              </thead>
              { users.length > 0 ? (
                <tbody>
                    { users.map((user,index) => 
                      <tr
                      key={user.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{user.first_name}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{user.last_name}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{user.email}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{user.role}</td>
                      </tr>
                    )

                    }
                </tbody>
              ) : (
                <tbody>
                      <tr
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center" colSpan="7">No Users</td>
                      </tr>
                </tbody>
              )

              }
            </table>
          </div>
        </div>
      </div>
    </div>
	)
}
