import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import index from './controllers/index.js';
import { init } from './models/index.js';

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.get('/', index);

init().then(() => {
  server.listen(8000, function () {
    console.log('listening..........');
  });
});

module.exports = server;
