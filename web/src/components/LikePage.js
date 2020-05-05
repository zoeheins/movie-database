import styled from 'styled-components';
import React from 'react';

const BackLink = styled.a`
  float: right;
`;

class LikePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
    this.fetchLikes();
  }

  fetchLikes = () => {
    fetch('/likes')
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        const { movies } = resp;
        this.setState({
          movies,
        });
      });
  };

  render() {
    const { movies } = this.state;
    return (
      <div>
        <BackLink href="/movies">Back</BackLink>
        <h2>Liked Movies</h2>
        {movies.map((movie, i) => (
          <a key={i} href={`/movies/${movie._id}`}>
            {movie.title}
          </a>
        ))}
      </div>
    );
  }
}

export default LikePage;
