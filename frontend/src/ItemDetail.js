import axios from "axios";
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Badge, Button, ButtonGroup } from "reactstrap";
import AppNavbar from "./AppNavBar";
import Moment from "moment";

const DISCONTINUED = "DISCONTINUED";

class ItemDetail extends Component {
  emptyItem = {
    itemCode: "",
    description: "",
    price: 0.0,
    state: "ACTIVE",
    suppliers: [],
    priceReductions: [],
    creationDate: new Date().toISOString(),
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      axios
        .get(`/items/${this.props.match.params.id}`, {
          headers: {
            Authorization: `${localStorage.getItem("user")}`,
          },
        })
        .then((data) => {
          this.setState({ item: data.data });
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.status === 403 || err.response.status === 401)
            this.props.history.push("/login");
          else alert(err.response.data);
        });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  handleChangeDate(value, formattedValue) {
    this.setState({
      value: value,
      formattedValue: formattedValue,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    let body = item;

    console.log(JSON.stringify(item));

    await fetch("/items" + (item.id ? "/" + item.id : ""), {
      method: item.id ? "PUT" : "POST",
      headers: {
        Authorization: localStorage.getItem("user"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).catch((err) => {
      console.log(err.response);
      if (err.response.status === 403 || err.response.status === 401)
        this.props.history.push("/login");
      else alert(err.response.data);
    });
    this.props.history.push("/items");
  }

  render() {
    const { item } = this.state;
    const title = <h2>Details</h2>;

    const edit =
      item.state !== DISCONTINUED ? (
        <React.Fragment>
        <Button color="primary" tag={Link} to={"/itemEdit/" + item.id}>Edit</Button>
        </React.Fragment>
      ) : (
        ""
      );

    return (
      <div>
        <AppNavbar />
        <Container className="mt-4 w-25 shadow-lg p-4 mb-5 bg-white rounded">
          {title}
          <div>
            <h4>Item {item.itemCode}</h4>
            <hr />
            <dl className="dl-horizontal">
              <dt>Item code</dt>
              <dd>{item.itemCode}</dd>

              <dt>Description</dt>
              <dd>{item.description}</dd>

              <dt>Base price</dt>
              <dd>{formatter.format(item.price)}</dd>

              <dt>State</dt>
              <dd>
            <Badge
              className={
                item.state === DISCONTINUED ? "text-dark" : "text-white"
              }
              style={{
                backgroundColor:
                  item.state === DISCONTINUED ? "#ffc107" : "#0d6efd",
                borderColor:
                  item.state === DISCONTINUED ? "#ffc107" : "#0d6efd",
              }}
            >
              {item.state}
            </Badge></dd>

              <dt>Creation date</dt>
              <dd>{Moment(item.creationDate).format("DD/MM/YYYY")}</dd>
            </dl>
          </div>
          <p>
          <ButtonGroup>
            {edit}
            <Button color="secondary" tag={Link} to={"/items"}>Back to list</Button>
          </ButtonGroup>
          </p>
        </Container>
      </div>
    );
  }
}
export default withRouter(ItemDetail);

let formatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
});