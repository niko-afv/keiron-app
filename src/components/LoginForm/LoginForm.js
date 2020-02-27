import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login } from '../../redux/reducer'
import { withRouter } from "react-router-dom";

import './LoginForm.css';
import {
  BrowserRouter as Router,
  useLocation,
  Link
} from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  handleChange = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
    console.log("event change!!")
    console.log(this.state)
  }
  
  handleSubmit = event => {
    let { email, password } = this.state
    let { history } = this.props
    this.props.login(email, password)
    history.push('/user')
    this.setState({
      email: '',
      password: ''
    })
  }
  
  render() {
    let { email, password } = this.state
    let { isLoginPending, isloginSuccess, loginError } = this.props
    let message = ''
    if(this.props.loginError){
      message = <div className="card-footer alert alert-danger">{this.props.loginError.toString()}</div>
    }
    return (
      <div className="card login-form">
          <div className="card-header">Login</div>
          <div className="card-body">
            <div className="form-group row">
              <label htmlFor="email" className="col-md-4 col-form-label text-md-right">
                  Email</label>
  
              <div className="col-md-6">
                <input id="email" type="email"
                       className="form-control"
                       name="email" value=""
                       required
                       value={email}
                       onChange={this.handleChange}
                       autoComplete="email"
                       autoFocus />
              </div>
          </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Contraseña</label>
  
              <div className="col-md-6">
                  <input id="password" type="password"
                         className="form-control"
                         name="password"
                         required
                         value={password}
                         onChange={this.handleChange}
                         autoComplete="current-password" />
              </div>
          </div>
            <div className="form-group row mb-0">
              <div className="col-md-8 offset-md-4">
                <Link to="/register" className="register-link">Register</Link>
                <button type="submit"
                        className="btn btn-primary"
                        onClick={this.handleSubmit}>
                    Entrar
                </button>
              </div>
            </div>
          </div>
          {message}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError,
    isAuthenticated: state.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
