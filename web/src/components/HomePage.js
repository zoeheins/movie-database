import styled from 'styled-components';
import React from 'react';

const Menu = styled.div`
  float: right;
  position: sticky;
  top: 0;
  a {
    color: black;
    cursor: pointer;
    margin: 5px;
  }
`;

const SortForm = styled.form`
  float: right;
`;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      movies: [],
      sortBy: 'titleAsc',
    };
    this.fetchMovies(this.state.sortBy);
  }

  fetchMovies = (sortBy) => {
    const url = `/movies?sortBy=${sortBy}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((movies) => {
        this.setState({
          loading: false,
          movies,
          sortBy,
        });
      });
  };

  handleLogout = () => {
    fetch('/logout', {
      method: 'POST',
    })
      .then((req) => {
        this.props.history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSort = (e) => {
    const sortBy = e.target.value;
    this.fetchMovies(sortBy);
  };

  render() {
    const { loading, movies, sortBy } = this.state;
    return (
      <div>
        <Menu>
          <a href="/likes">Likes</a>
          <a onClick={this.handleLogout}>Logout</a>
        </Menu>
        <h2>Movies</h2>
        <SortForm>
          <select onChange={this.handleSort} value={sortBy}>
            <option value="titleAsc">Sort by title: A-Z</option>
            <option value="titleDesc">Sort by title: Z-A</option>
            <option value="ratingDesc">Sort by rating: high-low</option>
            <option value="ratingAsc">Sort by rating: low-high</option>
          </select>
        </SortForm>
        {loading && <p>Loading.....</p>}
        <ul>
          {movies.map((movie, i) => (
            <li key={i}>
              <a href={`/movies/${movie._id}`}>
                {movie.title}: {movie.voteAverage}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomePage;
