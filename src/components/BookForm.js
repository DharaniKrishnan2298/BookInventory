import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const BookForm = ({ onSave, existingBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (existingBook) {
      setTitle(existingBook.title);
      setAuthor(existingBook.author);
      setGenre(existingBook.genre);
      setPrice(existingBook.price);
      setId(existingBook.id);
    } else {
      setTitle('');
      setAuthor('');
      setGenre('');
      setPrice('');
      setId('');
    }
  }, [existingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      genre,
      price,
      id: id || Date.now(),
    };

    onSave(newBook);

    setTitle('');
    setAuthor('');
    setGenre('');
    setPrice('');
    setId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Author"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Genre</InputLabel>
            <Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            >
              <MenuItem value="Fiction">Fiction</MenuItem>
              <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="Romance">Romance</MenuItem>
              <MenuItem value="Fantasy">Fantasy</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" fullWidth>
            {existingBook ? 'Update Book' : 'Add Book'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BookForm;
