import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from '../../components/LoginForm/LoginForm'
import Register from '../../components/Register/Register'

import UserPage from '../UserPage/UserPage'


class GuestPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/">
            <UserPage/>
          </Route>
        </Switch>
      </Router>
    )
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100)
  },
  singout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100)
  }
}

export default GuestPage;