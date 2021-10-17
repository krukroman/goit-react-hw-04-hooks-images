import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchQuery.toLocaleLowerCase());
    setSearchQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          onChange={handleChange}
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
