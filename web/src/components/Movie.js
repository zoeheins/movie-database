import React from 'react';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    const { movieId } = this.props.match.params;
    fetch(`/movies/${movieId}`)
      .then((res) => {
        return res.json();
      })
      .then((movie) => {
        this.setState({ movie });
      });
  }

  render() {
    const { movie } = this.state;
    return (
      <div>
        {movie && (
          <div>
            <h3>{movie.title}</h3>
            <p>Release date: {movie.relaseDate}</p>
            <p>Average rating: {movie.voteAverage}</p>
            <p>Plot: {movie.overview}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Movie;
