import React,{useState} from 'react';
// import BookForm from './BookForm';
import BooksTable from './BooksTable';
import BookForm from './BookForm';
import NavBar from './NavBar';
import useLocalStorage from '../hooks/useLocalStorage';


function App() {

  const [authors] = useLocalStorage('authors',[
    {
      id: 1,
      name: "Carlos Sebastian"
    },
    {
      id: 2,
      name: "Arturo Gonzales"
    }
  ]);
  const [genres] = useLocalStorage('genres',[
    {
      id: 1,
      name: "Action"
    },
    {
      id: 2,
      name: "Adventure"
    }
  ]);

  const [books, setBooks] = useLocalStorage('books',[]);


  function addBook(event,bookAuthor,bookGenre,bookTitle){
    event.preventDefault();

    let author = authors.filter(author => author.id == bookAuthor)[0];
    let genre = genres.filter(genre => genre.id == bookGenre)[0];

    setBooks([...books,{
      id: Math.floor(Math.random() * 100),
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
