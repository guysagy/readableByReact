import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

/*
MainMenu component implementation.
*/

class MainMenu extends Component {

  render() {

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a>React Driven Readables</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem href="#/">Home</NavItem>
          <NavItem href="#/categories">Categories</NavItem>
          <NavItem href="#/posts">Posts</NavItem>
        </Nav>
      </Navbar>
    );
  }

}

export default MainMenu;
