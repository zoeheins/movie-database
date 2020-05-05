import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import db from './models/index';
import {
  likeMovie,
  getAllMovies,
  getLikedMovies,
  getMovie,
} from './controllers/movies';
import withAuth from './middleware';
import { authenticate, logout, register } from './controllers/auth';

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());

// movies
server.get('/movies', getAllMovies);
server.get('/movies/:movieId', getMovie);
server.post('/movies/:movieId/like', withAuth, likeMovie);
server.get('/likes', withAuth, getLikedMovies);

// auth
server.post('/register', register);
server.post('/authenticate', authenticate);
server.post('/logout', logout);
server.get('/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

db.once('open', () => {
  server.listen(8000, function () {
    console.log('listening..........');
  });
});

db.on('error', () => {
  console.log('Connection error');
});

module.exports = server;
