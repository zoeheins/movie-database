import Movie from '../models/movie';

const getAllMovies = (req, res) => {
  const sortMapping = {
    titleAsc: 'title',
    titleDesc: { title: -1 },
    ratingAsc: 'voteAverage',
    ratingDesc: { voteAverage: -1 },
  };

  const sortByParam = req.query.sortBy;
  const sortBy = sortMapping[sortByParam];
  Movie.find()
    .sort(sortBy)
    .then((movies, err) => {
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
  });
};

export { getAllMovies, getMovie };
