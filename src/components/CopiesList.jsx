import React from 'react'

export default function CopiesList(props) {

  console.log('-------------copies details----------------')
  console.log(props);
  return (
    <div className="flex flex-col border-2 rounded-md border-gray-500 p-4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">  
          <h2 className='font-bold mb-2'>{props.title}</h2>
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Publisher</th>
                  <th scope="col" className="px-6 py-4">Published Year</th>
                  <th scope="col" className="px-6 py-4">Action</th>
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
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <button>Checkout Book</button>
                        </td>
                      </tr>
                    )

                    }
                </tbody>
              ) : (
                <tbody>
                      <tr
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center" colSpan="7">No Copies</td>
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
