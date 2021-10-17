import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      searchQuery: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    this.props.onSubmit(searchQuery.toLocaleLowerCase());
    this.setState({
      searchQuery: '',
    });
  };

  render() {
    const { searchQuery } = this.state;
    const handleSubmit = this.handleSubmit;
    const handleChange = this.handleChange;
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
