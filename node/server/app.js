import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';

import db from './models/index.js';
import index from './controllers/index.js';
import User from './models/user.js'
import withAuth from './middleware.js';

const server = express();

dotenv.config(); // import env
const secret = process.env.SECRET;

// server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());

server.get('/movies', index);

server.post('/register', function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      res.status(500).send("error registering")
    } else {
      console.log(user.email)
      res.status(200).send("welcome!")
    }
  })
})

server.post('/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      res.status(500).json({ error: 'Internal error'})
    } else if (!user) {
      res.status(401).json({ error: 'Incorrect email'})
    } else {
      if (user.isCorrectPassword(password)) {
        // issue token
        console.log('issuing token...')
        const payload = { email };
        const token = jwt.sign(payload, secret, {
          expiresIn: '1h'
        });
        res.cookie('token', token, { httpOnly: true }).sendStatus(200);
      } else {
        res.send(401).json({ error: 'Incorrect login'})
      }
    }
  })
})

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
