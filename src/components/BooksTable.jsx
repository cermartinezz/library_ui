import React, { useContext } from 'react'
import { BooksContext } from '../context/BooksContext';
import { Link } from 'react-router-dom';

export default function BooksTable(props) {

	const {books} = useContext(BooksContext);

	return (
		<div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Title</th>
                  <th scope="col" className="px-6 py-4">Author</th>
                  <th scope="col" className="px-6 py-4">Genre</th>
                  <th scope="col" className="px-6 py-4">Total Copies</th>
                  <th scope="col" className="px-6 py-4">Available Copies</th>
                  <th scope="col" className="px-6 py-4">Rented Copies</th>
                  <th scope="col" className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              { books.length > 0 ? (
                <tbody>
                    { books.map((book,index) => 
                      <tr
                      key={book.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{book.title}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{book.author.name}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{book.genre.name}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{book.total_of_copies}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{book.total_available_copies}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{book.total_rented_copies}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <Link to={`/copies/${book.slug}`} 
                            className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                            Copies
                          </Link>
                        </td>
                      </tr>
                    )

                    }
                </tbody>
              ) : (
                <tbody>
                      <tr
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center" colSpan="7">No books</td>
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
