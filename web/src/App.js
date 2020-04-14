import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Movies from './components/Movies.js';
import Login from './components/Login.js';

const App = () => (
  <Router>
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/'>
        <Movies />
      </Route>
    </Switch>
  </Router>
)

export default App;
