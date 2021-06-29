import React, { Component } from "react";
import "../App/App.css";
import AppNavbar from "../AppNavBar/AppNavBar";
import { Link } from "react-router-dom";
import { Button, Jumbotron, Container } from "reactstrap";

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container>
          <Jumbotron className="bg-light p-3 mt-4 rounded">
            <h1 className="display-3">Trader</h1>
            <p className="lead">
              An app to track all your company's articles for sale, as well as
              your users, suppliers, and much more.
            </p>
            <hr className="my-2" />
            <p>
              Click in the button below to check some demo items.
            </p>
            <p className="lead">
              <Button color="primary" tag={Link} to={"/items"}>Check items</Button>
            </p>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}
export default Home;
