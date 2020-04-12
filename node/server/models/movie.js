import { db } from './index.js';

const getMovies = () => {
  const collection = db.collection('movies');
  return collection.find().toArray();
};

export { getMovies };
