import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const MovieSchema = new Schema({
  title: String,
  overview: String,
  voteAverage: Number,
  releaseDate: String,
});
const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;
