import React,{useState} from 'react';
import BooksTable from './BooksTable';


function App() {

  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Life of Pi",
      slug: "life-of-pi",
      total_of_copies: 2,
      total_available_copies: 1,
      total_rented_copies: 1,
      available_copies: {
          1: {
              id: 9,
              book_id: 1,
              published_year: 2000,
              publisher: "publisher 1",
              created_at: "2023-05-04T07:34:37.000000Z",
              updated_at: "2023-05-04T07:34:37.000000Z"
            }
        },
      rented_copies: [
            {
              id: 1,
              start_date: "2023-05-04",
              end_date: "2023-05-09",
              book_copy_id: 1,
              user_id: 1,
              returned: false,
              created_at: "2023-05-04T06:27:36.000000Z",
              updated_at: "2023-05-04T06:27:36.000000Z",
              laravel_through_key: 1
            }
        ],
      author: {
          id: 1,
          name: "Yann Martel"
        },
      genre: {
          id: 1,
          name: "Action and Adventure"
        }
    },
    {
      id: 2,
      title: "Est aliquid aperiam quam.",
      slug: "est-aliquid-aperiam-quam",
      total_of_copies: 0,
      total_available_copies: 0,
      total_rented_copies: 0,
      available_copies: [],
      rented_copies: [],
      author: {
          id: 3,
          name: "Rachael Gusikowski"
        },
      genre: {
          id: 3,
          name: "Pietro Powlowski"
        }
    }  
  ]);

  return (
    <div className="min-h-screen" id='main'>
      <div className="m-10">
        <BooksTable books={books}></BooksTable>
      </div>
    </div>
  );
}

export default App;
