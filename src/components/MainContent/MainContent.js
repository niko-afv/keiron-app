import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from '../LoginForm/LoginForm.js'
import Register from '../Register/Register'
import AuthorizedContent from '../AuthorizedContent/AuthorizedContent'


class MainContent extends React.Component {
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
            <AuthorizedContent/>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default MainContent;