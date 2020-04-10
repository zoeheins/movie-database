import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();  // import env

class Client {
  constructor() {
    this.apiKey = process.env.API_TOKEN;
    this.basePath = 'https://api.themoviedb.org/3';
  }

  request(endpoint) {
    const url = `${this.basePath}${endpoint}?api_key=${this.apiKey}`;
    return axios.get(url)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err)
      })
  }

  getMovie() {
    return this.request('/movie/550').then(movie => {
      return {
        title: movie.original_title
      }
    })
  }
}

export default Client;
