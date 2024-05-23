import React, { useState, useEffect } from 'react';
import AddBookForm from './AddBookForm';
import BookList from './BookList';
import { addBook, getBooks } from './api';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleBookAdded = async (newBook) => {
    try {
      const addedBook = await addBook(newBook);
      setBooks([...books, addedBook]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <h1>Bookstore</h1>
      <AddBookForm onBookAdded={handleBookAdded} />
      <BookList books={books} />
    </div>
  );
};

export default App;
