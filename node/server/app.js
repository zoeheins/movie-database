import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import db from './models/index';
import movies from './controllers/movies';
import withAuth from './middleware';
import { authenticate, logout, register } from './controllers/auth';

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());

server.get('/movies', movies);

server.post('/register', register);  // TODO add register page and test

server.post('/authenticate', authenticate)

server.post('/logout', logout);

server.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200)
})

db.once('open', ()  => {
  server.listen(8000, function () {
    console.log('listening..........');
  });
});

db.on('error', () => {
  console.log('Connection error')
})

module.exports = server;
