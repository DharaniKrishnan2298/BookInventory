import React, { useState } from 'react';

const Filter = ({ genres, authors, onFilter }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    onFilter('genre', genre); // Apply genre filter
  };

  const handleAuthorChange = (e) => {
    const author = e.target.value;
    setSelectedAuthor(author);
    onFilter('author', author); // Apply author filter
  };

  const handleResetFilter = () => {
    setSelectedGenre(null);
    setSelectedAuthor(null);
    onFilter(null, null); // Clear filter
  };

  return (
    <div className="filter-container">
      <div>
        <label>Filter By Genre: </label>
        <select
          value={selectedGenre || ''}
          onChange={handleGenreChange}
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Filter By Author: </label>
        <select
          value={selectedAuthor || ''}
          onChange={handleAuthorChange}
        >
          <option value="">Select Author</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      <button className="clear-btn" onClick={handleResetFilter}>
        Clear Filter
      </button>
    </div>
  );
};

export default Filter;
