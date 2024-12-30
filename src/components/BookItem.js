import React from 'react';

const BookItem = ({ book, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.genre}</td>
      <td>Rs.{book.price}</td>
      <td>
        <button onClick={() => onEdit(book)}>Edit</button>
      </td>
      <td>
        <button onClick={() => onDelete(book.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default BookItem;
