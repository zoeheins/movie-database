import Client from './client';

const apiClient = new Client();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/movieDatabase', function (
  err,
  client
) {
  const db = client.db('movieDatabase');
  const movieCollection = db.collection('movies');

  apiClient.getPopularMovies().then((resp) => {
    const totalPages = resp.total_pages;

    [...Array(totalPages - 1).keys()].map((page) => {
      const nextPage = page + 1;

      apiClient.getPopularMovies(nextPage).then((resp) => {
        const movies = resp.results.map((movie) => {
          return {
            title: movie.title,
            overview: movie.overview,
            voteAverage: movie.vote_average,
            releaseDate: movie.release_date,
          };
        });

        movies.forEach((movie) => {
          movieCollection.insertOne(movie);
        });
      });
    });
  });
});
