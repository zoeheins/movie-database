import Movie from '../models/movie';
import User from '../models/user';

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
  const { movieId } = req.params;
  Movie.findById(movieId, (err, movie) => {
    if (err) {
      res.status(500).send({ error: 'Error fetching movies' });
    } else {
      res.status(200).send(movie);
    }
  });
};

const likeMovie = (req, res) => {
  const { movieId } = req.params;
  const { email } = req;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(404)
    } else {
      user.movies.push(movieId);
      user.validate()
        .then((success) => {
          user.save();
        })
        .catch((err) => {
          console.log(err.message);
        });
      res.status(200);
    }
  });
};

export { likeMovie, getAllMovies, getMovie };
