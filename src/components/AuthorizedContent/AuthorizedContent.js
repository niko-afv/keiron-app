import React from 'react'
import {Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import UserPage from "../../Pages/UserPage/UserPage";
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";
import AdminPage from "../../Pages/AdminPage/AdminPage";

class AuthorizedContent extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
    this.state = {
      user: {
        name: ''
      }
    }
    this.checkAuth()
    
  }
  
  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user'))
    })
  }
  
  logout(){
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.props.history.push('/login')
    this.logout = this.logout.bind(this)
  }
  
  checkAuth(){
    if(localStorage.getItem('isAuthenticated') != 'true'){
      this.props.history.push('/login')
    }else if( JSON.parse(localStorage.getItem('user')).id_tipouser === 1 ){
      this.props.history.push('/user')
    }else{
      return true
    }
  }
  
  render(){
    return (
      <Container fluid >
        <Row>
          <Col>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand>Keiron Test</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse className="justify-content-end">
                <Nav className="flex-column">
                  <NavDropdown title={this.state.user.name}  id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={this.logout}>Salir</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col>
            <Router>
              <Switch>
                <Route path="/user">
                  <UserPage/>
                </Route>
                <Route path="/admin">
                  <AdminPage/>
                </Route>
              </Switch>
            </Router>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(AuthorizedContent)