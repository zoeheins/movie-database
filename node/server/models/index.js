import MongoClient from 'mongodb';

const connectionUrl = 'mongodb://localhost:27017/movieDatabase';
let db;

const init = () =>
  MongoClient.connect(connectionUrl).then((client) => {
    db = client.db('movieDatabase');
    console.log('initializing db....');
  });

export { db, init };
