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

  handleLogout = () => {
    fetch('/logout', {
      method: 'POST'
    }).then(req => {
      this.props.history.push('/login');
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const { movies } = this.state;
    return (
      <div>
        <button onClick={this.handleLogout}>Logout</button>
        <ul>
          {movies.map((movie, i) => (
            <li key={i}>
              <a href={`/movies/${movie._id}`}>{movie.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Movies;
