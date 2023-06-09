import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

export default function CheckoutList(props) {

  let checkouts = props.checkouts;
  const {user} = useContext(AuthContext);

  return (
    <div className="flex flex-col border-2 rounded-md border-gray-500 p-4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">  
          <h2 className='font-bold mb-2'>{props.title}</h2>
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Copy Publisher</th>
                  <th scope="col" className="px-6 py-4">Copy Published Year</th>
                  <th scope="col" className="px-6 py-4">Start Date</th>
                  <th scope="col" className="px-6 py-4">Return Before</th>
                  <th scope="col" className="px-6 py-4">Returned</th>
                  { user.role == 'librarian' && (
                      <th scope="col" className="px-6 py-4">Borrowed by</th>
                    )
                  }
                </tr>
              </thead>
              { checkouts.length > 0 ? (
                <tbody>
                    { checkouts.map((checkout,index) => 
                      <tr
                      key={checkout.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{checkout.copy.publisher}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{checkout.copy.published_year}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{checkout.start_date}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{checkout.end_date}</td>
                        <td  
                            className={checkout.returned ? 'whitespace-nowrap px-6 py-4 font-medium' : 'whitespace-nowrap px-6 py-4 font-medium text-red-500'}
                          >
                                {checkout.returned ? 'Returned' : 'No Returned'}
                        </td>
                        { user.role == 'librarian' && (
                            <th scope="col" className="whitespace-nowrap px-6 py-4 font-medium text-blue-900">{checkout.user.first_name} {checkout.user.last_name}</th>
                          )
                        }

                      </tr>
                    )

                    }
                </tbody>
              ) : (
                <tbody>
                      <tr
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center" colSpan="7">No Checkouts</td>
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
