import React, { useState, useEffect } from 'react';
import { getBooks } from './api';

const BookList = () => {
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

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>Title:</strong> {book.title}, <strong>Author:</strong>{' '}
            {book.author}, <strong>ISBN:</strong> {book.isbn},{' '}
            <strong>Published Year:</strong> {book.publishedYear}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
