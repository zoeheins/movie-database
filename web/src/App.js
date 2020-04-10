import axios from 'axios';
import React from 'react';

class App extends React.Component {
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
    console.log(movies);
    return (
      <div>
        {movies.map((movie) => (
          <p key={movie.title}>{movie.title}</p>
        ))}
      </div>
    );
  }
}

export default App;
