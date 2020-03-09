import React from 'react'
import {Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import UserPage from "../../Pages/UserPage/UserPage";
import { withRouter } from "react-router-dom";

class AuthorizedContent extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }
  
  logout(){
    localStorage.setItem('isAuthenticated', false)
    this.props.history.push('/login')
    this.logout = this.logout.bind(this)
  }
  
  
  render(){
    return (
      <Container fluid >
        <Row>
          <Col>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">Keiron Test</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse className="justify-content-end">
                <Nav className="flex-column">
                  <NavDropdown title="Admin" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={this.logout}>Salir</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col>
            <UserPage/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(AuthorizedContent)