import React from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSignUp = e => {
    e.preventDefault()
    const { email, password } = this.state;
    fetch('/register', {
      method: 'POST',
      body: JSON.stringify({
        email, password,
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      this.props.history.push('/');
      console.log(res)
    }).catch((err) => {
      console.log(err)
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSignUp}>
        <div>
          <label>Email</label>
          <input name="email" value={email} onChange={this.handleChange}/>
        </div>
        <div>
          <label>Password</label>
          <input name="password" value={password} onChange={this.handleChange}/>
        </div>
        <button type="submit">Sign up</button>
      </form>
    );
  }
}

export default SignUp;
