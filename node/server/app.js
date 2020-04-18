import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import db from './models/index.js';
import movies from './controllers/movies.js';
import withAuth from './middleware.js';
import { authenticate, register } from './controllers/auth.js';

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());

server.get('/movies', movies);

server.post('/register', register);  // TODO add register page and test

server.post('/authenticate', authenticate)

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
