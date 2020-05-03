import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import styled from 'styled-components';

import Login from './components/Login';
import Movie from './components/Movie';
import Movies from './components/Movies';
import SignUp from './components/SignUp';
import withAuth from './components/withAuth';

const Container = styled.div`
  padding: 20px;
`;

const App = () => (
  <Container>
    <Router>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/sign-up' component={SignUp} />
        <Route path='/movies/:movieId' component={withAuth(Movie)} />
        <Route path='/movies' component={withAuth(Movies)} />
      </Switch>
    </Router>
  </Container>
)

export default App;
