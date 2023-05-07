import React from 'react'
import getCookie from '../helpers/getCookie';
import Cookies from 'js-cookie';
import Api from '../helpers/api';
import { useQuery } from 'react-query';

export default function Checkouts() {

  const {data:checkouts,isLoading,refetch} =  useQuery('checkouts',fetchCheckouts)

  async function fetchCheckouts(){
    try {
      await getCookie();

      let token = Cookies.get('token');

      let response = await Api.get(`/user/checkouts`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      let {checkouts} = response.data.result;


      return checkouts;
    } catch (error) {
      console.log(error.response.data.message)
      return []
    }
  }

  async function returnBook(checkout){
    let {id} = checkout
    try {
      await getCookie();

      let token = Cookies.get('token');

      let response = await Api.put(`/checkout/${id}`,{},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      refetch()
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  if (isLoading) return 'Loading...'
  

  return (
    <div className='bg-white m-10 p-10 shadow-xl'>
      <div className="flex flex-col border-2 rounded-md border-gray-500 p-10">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">  
            <h2 className='font-bold text-4xl mb-3'>My Books</h2>
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">Title</th>
                    <th scope="col" className="hidden sm:table-cell px-6 py-4">Publisher</th>
                    <th scope="col" className="hidden sm:table-cell px-6 py-4">Published Year</th>
                    <th scope="col" className="hidden sm:table-cell px-6 py-4">Start Date</th>
                    <th scope="col" className="hidden sm:table-cell px-6 py-4">End Date</th>
                    <th scope="col" className="px-6 py-4">Returned</th>
                    <th scope="col" className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                { checkouts.length > 0 ? (
                  <tbody>
                      { checkouts.map((checkout,index) => 
                        <tr
                        key={checkout.id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{checkout.copy.book.title}</td>
                          <td className="hidden sm:table-cell whitespace-nowrap px-6 py-4 font-medium">{checkout.copy.publisher}</td>
                          <td className="hidden sm:table-cell whitespace-nowrap px-6 py-4 font-medium">{checkout.copy.published_year}</td>
                          <td className="hidden sm:table-cell whitespace-nowrap px-6 py-4 font-medium">{checkout.start_date}</td>
                          <td className="hidden sm:table-cell whitespace-nowrap px-6 py-4 font-medium">{checkout.end_date}</td>
                          <td 
                              className={checkout.returned ? 'whitespace-nowrap px-6 py-4 font-medium' : 'whitespace-nowrap px-6 py-4 font-medium text-red-500'}
                          >
                                {checkout.returned ? 'Returned' : 'No Returned'}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            { !checkout.returned && (
                              <button 
                                onClick={() => returnBook(checkout)}
                                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                              >
                                  Return Book
                              </button>
                              )
                            }
                          </td>
                        </tr>
                      )

                      }
                  </tbody>
                ) : (
                  <tbody>
                        <tr
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-center" colSpan="5">No Checkouts  </td>
                        </tr>
                  </tbody>
                )

                }
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
