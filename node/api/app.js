import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

const server = express();
const MongoClient = require('mongodb').MongoClient;

server.use(cors());
server.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017/movieDatabase', function(err, client) {
  if (err) throw err;
  const db = client.db('movieDatabase');
  const movieCollection = db.collection('movies');

  server.get('/', function(req, res) {
    movieCollection.find().toArray(function (err, result) {
      if (err) throw err;
      const movies = result;
      res.send(movies);
    });
  })
});

server.listen(8000, function () {
  console.log('listening.........');
});

module.exports = server;
