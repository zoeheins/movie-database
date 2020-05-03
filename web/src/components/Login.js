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
    fetch('/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        email, password,
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      this.props.history.push('/movies');
    }).catch((err) => {
      console.log(err)
    });
  };

  render() {
    const { email, error, password } = this.state;
    return (
      <div>
        <p>{error}</p>
        <form onSubmit={this.login}>
          <div>
            <label>Email</label>
            <input name="email" required onChange={this.handleChange} value={email} />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              onChange={this.handleChange}
              value={password}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account <a href='/sign-up'>Sign up here</a></p>
      </div>
    );
  }
}

export default Login;
