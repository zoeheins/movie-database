import axios from 'axios';
import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
    this.fetchMovies();
  }

  fetchMovies = () => {
    axios.get('http://localhost:8000/').then(res => {
      const movies = res.data;
      this.setState({ movies });
    });
  };

  render() {
    const { movies } = this.state;
    return (
      <div>
        {movies.map((movie, i) => (
          <p key={i}>{movie.title}</p>
        ))}
      </div>
    );
  }
}

export default Movies;
