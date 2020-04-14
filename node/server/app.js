import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import index from './controllers/index.js';
import db from './models/index.js';

import User from './models/user.js'

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.get('/', index);
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
        res.sendStatus(200)
      } else {
        res.send(401).json({ error: 'Incorrect login'})
      }
    }
  })
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
