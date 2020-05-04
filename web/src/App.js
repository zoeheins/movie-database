import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import styled from 'styled-components';

import LoginPage from './components/LoginPage';
import MoviePage from './components/MoviePage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import withAuth from './components/withAuth';

const Container = styled.div`
  padding: 20px;
`;

const App = () => (
  <Container>
    <Router>
      <Switch>
        <Route path='/login' component={LoginPage}/>
        <Route path='/sign-up' component={SignUpPage} />
        <Route path='/movies/:movieId' component={withAuth(MoviePage)} />
        <Route path='/movies' component={withAuth(HomePage)} />
      </Switch>
    </Router>
  </Container>
)

export default App;
