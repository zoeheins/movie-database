import Movie from '../models/movie.js';

const index = (req, res) => {
  Movie.find().then((movies, err) => {
    if (err) {
      res.status(500).send({ error: 'Error fetching movies' });
    } else {
      res.status(200).send(movies);
    }
  });
};

export default index;
