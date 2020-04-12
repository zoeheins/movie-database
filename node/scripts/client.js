import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // import env

class Client {
  constructor() {
    this.apiKey = process.env.API_TOKEN;
    this.basePath = 'https://api.themoviedb.org/3';
  }

  async request(endpoint, options) {
    try {
      const url = `${this.basePath}${endpoint}`;
      const res = await axios.get(url, {
        params: { ...options, api_key: this.apiKey }
      })
      const data = await res.data;
      return data;
    } catch (e) {
      console.log('Error fetching data', e)
    }
  }

  getMovie() {
    return this.request('/movie/550');
  }

  getPopularMovies(page = null) {
    const options = { region: 'US', page: page || 1 };
    return this.request('/movie/popular', options);
  }
}

export default Client;
