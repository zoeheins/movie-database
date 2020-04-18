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
    fetch('/movies').then(res => {
      return res.json()
    }).then(movies => {
      this.setState({ movies });
    })
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
