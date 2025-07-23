import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setSortBy, setOrder } from './booksSlice';

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, status, error, sortBy, order } = useSelector((state) => state.books);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchBooks());
  }, [status, dispatch]);

  const sortedBooks = [...books].sort((a, b) => {
    const keyA = a[sortBy]?.toUpperCase?.() || '';
    const keyB = b[sortBy]?.toUpperCase?.() || '';
    if (order === 'asc') return keyA.localeCompare(keyB);
    else return keyB.localeCompare(keyA);
  });

  return (
    <div>
      <select onChange={(e) => dispatch(setSortBy(e.target.value))}>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
      </select>

      <select onChange={(e) => dispatch(setOrder(e.target.value))}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      <table>
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Publisher</th><th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book) => (
            <tr key={book.primary_isbn13}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.primary_isbn13}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
