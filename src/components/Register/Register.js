import React from 'react';
import './Register.css';
import {Link, withRouter} from "react-router-dom";
import {login} from "../../redux/reducer";
import {connect} from "react-redux";
import axios from "axios";


class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      isSending: false,
      success: false,
      error: false,
      messages: ''
    }
    console.log(this.state)
  }
  
  setIsSending(sending){
    this.setState({isSending: sending})
  }
  
  setSuccess(success){
    this.setState({success: success})
  }
  
  setError(error){
    this.setState({error: error})
  }
  
  handleChange = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  
  handleSubmit = event => {
    this.setIsSending(true)
    this.setSuccess(false)
    this.register(this.state)
  }
  
  register(data){
    let { history } = this.props
    return axios.post('http://localhost/api/auth/signup', data)
      .then(
        res => {
          this.setIsSending(false)
          this.setSuccess(true)
          setTimeout(() => {
            history.push('/login')
          }, 2500)
        }
      )
      .catch((err) => {
        this.setIsSending(false)
        this.setSuccess(false)
        this.setError(true)
        const error = Object.assign({}, err)
        console.log(error.response)
        for (let attr in error.response.data.errors){
          this.setState({message: error.response.data.errors[attr][0]})
        }
      })
  }
  
  render() {
    const { name, email, password, password_confirmation } = this.state
    let message = ''
    if( this.state.isSending ){
      message = <div className="card-footer alert alert-warning">Guardando...</div>
    }else if( this.state.success ){
      message = <div className="card-footer alert alert-success">Te has registrado exitosamente!</div>
    }else if( this.state.error ){
      message = <div className="card-footer alert alert-danger">{this.state.message}</div>
    }
    
    return (
      <div className="card login-form">
          <div className="card-header">Register</div>
          <div className="card-body">
            <div className="form-group row">
              <label htmlFor="name" className="col-md-4 col-form-label text-md-right">
                Nombre</label>
    
              <div className="col-md-6">
                <input id="name" type="text"
                       className="form-control"
                       name="name" value=""
                       required
                       value={name}
                       onChange={this.handleChange}
                       autoComplete="name"
                       autoFocus />
              </div>
            </div>
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
                       name="password_confirmation"
                       required
                       value={password_confirmation}
                       onChange={this.handleChange}
                       autoComplete="current-password" />
              </div>
            </div>
            <div className="form-group row mb-0">
              <div className="col-md-8 offset-md-4">
                <Link to="/Login" className="register-link">Login</Link>
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
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
}

export default withRouter(connect(mapDispatchToProps)(Register));
