import Movie from '../models/movie';

const getAllMovies = (req, res) => {
  Movie.find().then((movies, err) => {
    if (err) {
      res.status(500).send({ error: 'Error fetching movies' });
    } else {
      res.status(200).send(movies);
    }
  });
};

const getMovie = (req, res) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId, (err, movie) => {
    if (err) {
      res.status(500).send({ error: 'Error fetching movies' });
    } else {
      res.status(200).send(movie);
    }
  })
};

export { getAllMovies, getMovie };
