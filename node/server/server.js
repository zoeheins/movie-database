const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const client = require('./client.js');

console.log('client', client)

// load environment variables
// TODO: check environment before loading ENV
require('dotenv').config()

const server = express();
server.use(cors());
server.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/movieDatabase', function(err, client) {
  if (err) throw err;
  const db = client.db('movieDatabase');
  const movieCollection = db.collection('movies');

  console.log(process.env.API_TOKEN)

  server.get('/', function (req, res) {
    movieCollection.find().toArray(function (err, result) {
      if (err) throw err;
      const movies = result;
      res.send(movies);
    });
  });
});

server.listen(8000, function () {
  console.log('listening.........');
});

module.exports = server;
