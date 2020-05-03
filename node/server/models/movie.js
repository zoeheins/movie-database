import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: String,
  overview: String,
  voteAverage: Number,
  releaseDate: String,
});
const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;
