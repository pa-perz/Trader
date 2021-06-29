import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";

export default class AppNavbar extends Component {
  render() {
    return (
      <>
        <Navbar color="dark" dark expand="md">
          <Container>
            <NavbarBrand tag={Link} to="/">
              Trader
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/items">Items</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}
