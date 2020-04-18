import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Movies from './components/Movies.js';
import Login from './components/Login.js';
import withAuth from './components/withAuth.js';

const App = () => (
  <Router>
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/' component={withAuth(Movies)} />
    </Switch>
  </Router>
)

export default App;
