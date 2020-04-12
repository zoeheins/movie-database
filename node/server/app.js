import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import index from './controllers/index.js';
import db from './models/index.js';

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.get('/', index);

db.once('open', ()  => {
  server.listen(8000, function () {
    console.log('listening..........');
  });
});

db.on('error', () => {
  console.log('Connection error')
})

module.exports = server;
