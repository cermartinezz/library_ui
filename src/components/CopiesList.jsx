import React, { useContext } from 'react'
import { CheckoutContext } from '../context/CheckoutContext'
import { AuthContext } from '../context/AuthContext';

export default function CopiesList(props) {

  const {setVisibility,setCheckoutBook,setShowAddCopyModalVisibility,setBookDetails} = useContext(CheckoutContext);
  const {user} = useContext(AuthContext);

  function openModal(copy) {
    setVisibility(true)
    setCheckoutBook(copy)
  }

  function addCopy(book) {
    setShowAddCopyModalVisibility(true)
    setBookDetails(book)
  }


  return (
    <div className="flex flex-col border-2 rounded-md border-gray-500 p-4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">  
          <h2 className='font-bold mb-2'>{props.title}</h2> 
          { user.role == 'librarian' && (
              <button onClick={() => addCopy(props.book)}
                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
              >Add Copy</button>
            )
          }
          
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Publisher</th>
                  <th scope="col" className="px-6 py-4">Published Year</th>
                  { user.role == 'student' && (
                      <th scope="col" className="px-6 py-4">Action</th>
                    )
                  }
                </tr>
              </thead>
              { props.copies.length > 0 ? (
                <tbody>
                    { props.copies.map((copy,index) => 
                      <tr
                      key={copy.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{copy.publisher}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{copy.published_year}</td>
                        { user.role == 'student' && (
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              <button onClick={() => openModal(copy)}
                                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                              >Checkout Book</button>
                            </td>
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
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center" colSpan="7">No Copies Available</td>
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
