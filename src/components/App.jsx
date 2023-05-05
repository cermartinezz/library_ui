import React,{useState} from 'react';
// import BookForm from './BookForm';
import BooksTable from './BooksTable';
import BookForm from './BookForm';
import NavBar from './NavBar';


function App() {

  const [authors] = useState([
    {
      id: 1,
      name: "Carlos Sebastian"
    },
    {
      id: 2,
      name: "Arturo Gonzales"
    }
  ]);
  const [genres] = useState([
    {
      id: 1,
      name: "Action"
    },
    {
      id: 2,
      name: "Adventure"
    }
  ]);

  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Life of Pi",
      slug: "life-of-pi",
      total_of_copies: 2,
      total_available_copies: 1,
      total_rented_copies: 1,
      available_copies: [
            {
              id: 9,
              book_id: 1,
              published_year: 2000,
              publisher: "publisher 1",
              created_at: "2023-05-04T07:34:37.000000Z",
              updated_at: "2023-05-04T07:34:37.000000Z"
            }
          ],
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


  function addBook(event,bookAuthor,bookGenre,bookTitle){
    event.preventDefault();

    let author = authors.filter(author => author.id == bookAuthor)[0];
    let genre = genres.filter(genre => genre.id == bookGenre)[0];

    setBooks([...books,{
      id: 3,
      title: bookTitle,
      total_of_copies: 1,
      total_available_copies: 0,
      total_rented_copies: 1,
      available_copies: [],
      rented_copies: [],
      author: author,
      genre: genre
    }  ])

  }

  return (
    <div className='min-h-screen '>
      <NavBar></NavBar>
      <main className="p-10" id='main'>
        <BookForm authors={authors} genres={genres} addBook={addBook}></BookForm>
        <BooksTable books={books}></BooksTable>
      </main>
    </div>
  );
}

export default App;
