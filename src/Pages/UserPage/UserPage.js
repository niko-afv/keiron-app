import React from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import AdminActions from '../../components/AdminActions/AdminActions'

class UserPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      loading: true,
      columns: [
        {
          name: 'ID',
          selector: 'id',
          sortable: true
        },
        {
          name: 'User',
          selector: 'user',
          sortable: true
        },
        {
          name: 'Order',
          selector: 'order',
          sortable: true
        },
        {
          name: 'Actions',
          button: true,
          cell: (row) => <AdminActions data={row} onSave={this.setTickets} />,
        },
      ]
    }
    
    if( this.checkAuth() ) {
      this.fetchTickets = this.fetchTickets.bind(this)
      this.setTickets = this.setTickets.bind(this)
      
      this.fetchTickets()
    }
  }
  
  render() {
    return (
      <DataTable columns={this.state.columns} data={this.state.tickets} progressPending={this.state.loading} persistTableHead />
    )
  }
  
  setLoading(loading){
    this.setState({loading: loading})
  }
  
  setTickets(data){
    this.setState({tickets: data})
  }
  
  checkAuth(){
    if(this.props.isAuthenticated === null){
      this.props.history.push('/login')
    }else{
      return true
    }
  }
  
  fetchTickets() {
    let token = localStorage.getItem('token')
    if(this.state.loading == false){
      this.setState({
        loading: true
      })
    }
    
    this.fetch('http://localhost/api/tickets').then(res => {
      let data = [];
      let tickets = res.data
      tickets.forEach((ticket) => {
        data.push({
          id: ticket.id,
          user: ticket.user,
          order: ticket.order
        })
      });
      console.log(data)
      this.setTickets(data)
      this.setLoading(false)
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
        return res.data
      }
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

export default withRouter(connect(mapStateToProps)(UserPage));