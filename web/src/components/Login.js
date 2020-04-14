import axios from 'axios';
import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    axios.post('http://localhost:8000/authenticate', {
      email, password,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      this.setState({
        error: err.response.data.error,
      });
    });
  };
  render() {
    const { email, error, password } = this.state;
    return (
      <div>
        <p>{error}</p>
        <form onSubmit={this.login}>
          <div>
            <label>Username</label>
            <input name="email" onChange={this.handleChange} value={email} />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              onChange={this.handleChange}
              value={password}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
