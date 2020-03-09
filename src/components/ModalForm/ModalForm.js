import React from 'react'
import {Alert, Button, Form, Modal} from "react-bootstrap";
import axios from "axios";




class ModalForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      users: [],
      loading: true,
      saving: false,
      update: props.update,
      ticket: {}
    }
    this.fetchUsers()
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  
  setShow = (show) => {
    this.setState({ show: show})
  }
  
  handleShow = () => this.setShow(true);
  
  setLoading = (loading) => {
    this.setState({ loading: loading})
  }
  
  setSaving = (saving) => {
    this.setState({ saving: saving})
  }
  
  setTicket(data){
    this.setState({
      ticket: data,
      update: true
    })
  }
  
  handleClose = () => {
    this.setShow(false)
  };
  
  handleSave(){
    let ticket_id = this.state.ticket.id
    this.setSaving(true)
    this.setLoading(true)
    this.post(`http://localhost/api/tickets/${ticket_id}`, this.state.ticket).then(response => {
      if (response.error === false){
        this.setShow(false)
        this.setSaving(false)
        this.setLoading(false)
        this.props.onSave(response.data)
      }else{
        console.log(response.error)
      }
    })
  }
  
  handleChange(event){
    
    const ticket = {
      id: this.state.ticket.id,
      order: this.state.ticket.order,
      user: event.target.value
    }
    console.log(ticket)
    this.setState({
      ticket: ticket
    })
  }
  
  fetchUsers() {
    this.fetch('http://localhost/api/users').then(data => {
      this.setState({
        users: data,
        loading: false
      })
    })
  }
  
  fetch(url) {
    let token = localStorage.getItem('token')
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(
        res => {
          return res.data.data
        }
      )
  }
  
  post(url, data){
    let token = localStorage.getItem('token')
    return axios.put(url, data,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(
        res => {
          return res.data
        }
      )
  }
  
  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Info de Ticket {this.state.ticket.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Ticket Pedido</Form.Label>
              <Form.Control type="text" defaultValue={this.state.ticket.order} disabled={this.props.update} />
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Asignar Usuario</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} value={this.state.ticket.user} >
                  {this.state.loading === true && this.state.new === true? <option>Wait while users are loading</option>: ''}
                  {this.state.loading === true && this.state.new === false? <option>{this.state.ticket.user}</option>: ''}
              
                  {this.state.users.map( user => {
                    return <option key={user.id} value={user.email}>{user.email}</option>
                  })}
                </Form.Control>
              </Form.Group>
              {this.state.saving === true ?
                <Alert variant="warning">
                  Guardando, espere un momento ...
                </Alert>
                : ''
              }
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={this.handleSave} disabled={this.state.loading == true} >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}


export default ModalForm