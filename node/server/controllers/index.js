import { getMovies } from '../models/movie.js';

const index = (req, res) => {
  getMovies().then((movies) => {
    res.send(movies);
  });
};

export default index;
