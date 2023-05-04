import React from 'react'

export default function BooksTable(props) {
	return (
		<div class="flex flex-col">
					<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
							<div class="overflow-hidden">
								<table class="min-w-full text-left text-sm font-light">
									<thead class="border-b font-medium dark:border-neutral-500">
										<tr>
											<th scope="col" class="px-6 py-4">Title</th>
											<th scope="col" class="px-6 py-4">Author</th>
											<th scope="col" class="px-6 py-4">Genre</th>
											<th scope="col" class="px-6 py-4">Total Copies</th>
											<th scope="col" class="px-6 py-4">Available Copies</th>
											<th scope="col" class="px-6 py-4">Rented Copies</th>
										</tr>
									</thead>
                  { props.books.length > 0 ? (
                    <tbody>
                        { props.books.map((book,index) => 
                          <tr
                          class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td class="whitespace-nowrap px-6 py-4 font-medium">{book.title}</td>
                            <td class="whitespace-nowrap px-6 py-4">{book.author.name}</td>
                            <td class="whitespace-nowrap px-6 py-4">{book.genre.name}</td>
                            <td class="whitespace-nowrap px-6 py-4">{book.total_of_copies}</td>
                            <td class="whitespace-nowrap px-6 py-4">{book.total_available_copies}</td>
                            <td class="whitespace-nowrap px-6 py-4">{book.total_rented_copies}</td>
                          </tr>
                        )

                        }
                    </tbody>
                  ) : (
                    <tbody>
                          <tr
                            class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td class="whitespace-nowrap px-6 py-4 font-medium text-center" colspan="6">No books</td>
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
