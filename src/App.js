import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Filter from './components/Filter';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null); // Track the book being edited
  const [filter, setFilter] = useState({ type: null, value: null }); // Track filter type and value

  // Function to apply the current filter to the books array
  const applyFilter = (books, filterType, value) => {
    if (filterType === 'genre') {
      return books.filter((book) => book.genre === value);
    } else if (filterType === 'author') {
      return books.filter((book) => book.author === value);
    } else {
      return books; // No filter, show all books
    }
  };

  // Effect to apply the current filter whenever books or filter changes
  useEffect(() => {
    // If no filter is applied, show all books
    if (filter.type === null) {
      setFilteredBooks(books); // Set filteredBooks to all books when no filter is applied
    } else {
      setFilteredBooks(applyFilter(books, filter.type, filter.value)); // Apply the selected filter
    }
  }, [books, filter]); // Reapply filter whenever books or filter changes

  const handleAddOrUpdateBook = (book) => {
    if (editingBook) {
      // If we are editing, update the book in the list
      setBooks(books.map((b) => (b.id === book.id ? book : b)));
    } else {
      // Add new book
      setBooks([...books, book]);
    }

    setEditingBook(null); // Reset editing state after save
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleEditBook = (book) => {
    setEditingBook(book); // Set the book to edit
  };

  const handleFilter = (filterType, value) => {
    // When no filter is selected (or cleared), reset the filteredBooks
    if (filterType === null || value === null) {
      setFilter({ type: null, value: null });
    } else {
      setFilter({ type: filterType, value: value });
    }
  };

  const allGenres = Array.from(new Set(books.map((book) => book.genre)));
  const allAuthors = Array.from(new Set(books.map((book) => book.author)));

  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center">
        Bookstore Inventory
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <BookForm onSave={handleAddOrUpdateBook} existingBook={editingBook} />
      </Paper>

      <Filter genres={allGenres} authors={allAuthors} onFilter={handleFilter} />

      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <BookList
          books={filteredBooks} // Pass filtered books to the list
          onDelete={handleDeleteBook}
          onEdit={handleEditBook}
        />
      </Paper>
    </Container>
  );
};

export default App;
