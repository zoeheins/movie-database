import styled from 'styled-components';
import React from 'react';

const BackButton = styled.a`
  float: right;
`;

class MoviePage extends React.Component {
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

  handleFavorite = () => {
    const { movieId } = this.props.match.params;
    fetch(`/movies/${movieId}/favorite`, {
      method: 'POST',
      body: {
        userId: 1,
      }
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    const { movie } = this.state;
    return (
      <div>
        <BackButton href="/movies">Back</BackButton>
        {movie && (
          <div>
            <h3>{movie.title}</h3>
            <p>Release date: {movie.releaseDate}</p>
            <p>Average rating: {movie.voteAverage}</p>
            <p>Plot: {movie.overview}</p>
            <button onClick={this.handleFavorite}>Favorite</button>
          </div>
        )}
      </div>
    );
  }
}

export default MoviePage;
