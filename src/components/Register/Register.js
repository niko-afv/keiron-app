import React from 'react';
import ReactDOM from 'react-dom';
import './Register.css';
import {Link} from "react-router-dom";


class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
    console.log(this.state)
  }
  handleChange = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
    console.log("event change!!")
    console.log(this.state)
  }
  
  handleSubmit = event => {
    console.log('submit')
    console.log(this.state)
  }
  
  render() {
    const { email, password } = this.state
    return (
      <div className="card login-form">
          <div className="card-header">Register</div>
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
            <div className="form-group row">
              <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Repetir Contraseña</label>
    
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
                <Link to="/Login"><a className="register-link">Login</a></Link>
                <button type="submit"
                        className="btn btn-primary"
                        onClick={this.handleSubmit}>
                    Entrar
                </button>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Register;
