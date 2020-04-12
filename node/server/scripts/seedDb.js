import Client from './client';
import Movie from '../models/movie.js'
import db from '../models/index.js';

const apiClient = new Client();

db.once('open', function() {
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

        Movie.create(movies, function(err, movies) {
          console.log('added movies........')
        })

      });
    });
  });
})
