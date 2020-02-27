import React from 'react';
import DataTable from "react-data-table-component";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../redux/reducer";

const data = [
  {
    id: 1,
    user: 'Asdf Qwerty',
    order: 'AAA01'
  },
  {
    id: 2,
    user: 'poiuy zxcv',
    order: 'DDD05'
  }
]
const colums = [
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
    cell: () => <button>Solicitar</button>,
  },
]

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    if(props.isAuthenticated){
      console.log('is authenticated')
    }else{
      props.history.push('/login')
    }
  }
  render() {
    return (
      <DataTable columns={colums} data={data}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

export default withRouter(connect(mapStateToProps)(UserPage));