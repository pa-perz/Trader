import axios from "axios";
import { Component } from "react";
import { SelectBox } from "react-bootstrap-selectbox";
import { Table } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import AppNavbar from "./AppNavBar";

class ItemEdit extends Component {
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
    if (this.props.match.params.id !== "0") {
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
  
  handleSelection(value, event) {
    this.setState({
      suppliers: value
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    let body = item;

    await fetch("/items" + (item.id ? "/" + item.id : ""), {
      method: item.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("user"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).catch((error) => {
      if (error.response.status === 403 || error.response.status === 401)
        this.props.history.push("/login");
      else alert(error.response.data);
    });
    this.props.history.push("/items");
  }

  supplier = null;

  suppliers = [
    { supplier_name: "Facebook", supplier_id: "0" },
    { supplier_name: "Google",   supplier_id: "1" }
  ]

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? "Edit" : "Add"}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container className="mt-4 w-25 shadow-lg p-4 mb-5 bg-white rounded">
          {title}
          <h4>Item</h4>
          <hr />
          <Form onSubmit={this.handleSubmit}>
            <FormGroup className="mt-2">
              <Label for="itemCode">Item code</Label>
              <Input
                type="text"
                name="itemCode"
                className="form-control"
                id="itemCode"
                value={item.itemCode || ""}
                onChange={this.handleChange}
                autoComplete="itemCode"
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                className="form-control"
                id="description"
                value={item.description || ""}
                onChange={this.handleChange}
                autoComplete="description"
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label for="price">Base price</Label>
              <InputGroup>
                <Input
                  type="number"
                  name="price"
                  className="form-control"
                  id="price"
                  value={item.price || 0.0}
                  step=".01"
                  onChange={this.handleChange}
                  autoComplete="price"
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>€</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup className="mt-2">
              <Label for="state">State</Label>
              <Input
                type="select"
                name="state"
                className="form-control"
                id="state"
                value={item.state || "ACTIVE"}
                onChange={this.handleChange}
                autoComplete="state"
              >
                <option>ACTIVE</option>
                <option>DISCONTINUED</option>
              </Input>
            </FormGroup>
            <FormGroup className="mt-2">
              <Label for="state">Price reductions</Label>
              <Table>
                <tr>
                  <td></td>
                </tr>
              </Table>
            </FormGroup>
            <FormGroup className="mt-2">
              <Label for="state">Suppliers</Label>
              <SelectBox
                name="supplier"
                onSelection={this.handleSelection}
                options={this.suppliers}
                bindLabel="supplier_name"
                bindValue="supplier_id"
                placeholder="Select supplier"
                label="Supplier"
              />
            </FormGroup>
            <ButtonGroup className="mt-3">
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/items">
                Cancel
              </Button>
            </ButtonGroup>
          </Form>
        </Container>
      </div>
    );
  }
}
export default withRouter(ItemEdit);
