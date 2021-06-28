import { Component } from "react";
import { Badge, Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavBar";
import { Link } from "react-router-dom";
import Moment from "moment";
import axios from "axios";


const DISCONTINUED = "DISCONTINUED";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.remove = this.remove.bind(this);
  }

  async componentDidMount() {
    await axios
      .get("/items", {
        headers: {
          Authorization: `${localStorage.getItem("user")}`,
        },
      })
      .then((data) => {
        this.setState({ items: data.data });
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401)
          this.props.history.push("/login");
        else
          alert(err.response.data);
      });

  }
  
  async disable(id) {
    await fetch("/items/" + id + "/disable", {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    })
    .catch((err) => {
      if (err.response.status === 403 || err.response.status === 401)
        this.props.history.push("/login");
      else
        alert(err.response.data);
    });

    window.location.reload();
  }

  async remove(id) {
    await axios
      .delete(`/items/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("user")}`,
        },
      })
      .then(() => {
        let updatedItems = [...this.state.items].filter((i) => i.id !== id);
        this.setState({ items: updatedItems });
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401)
          this.props.history.push("/login");
        else
          alert(err.response.data);
      });
  }

  render() {
    const { items, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const itemList = items.map((item) => {
      return (
        <tr
          className={item.state === DISCONTINUED ? "table-warning" : ""}
          key={item.id}
        >
          <td className="align-middle">{item.itemCode}</td>
          <td
            title={item.description}
            style={{ whiteSpace: "nowrap", maxWidth: "30vw" }}
            className="align-middle text-truncate"
          >
          <Link to={"/items/" + item.id}>
            {item.description}
          </Link>
          </td>
          <td className="text-center" align="right">{formatter.format(item.price)}</td>
          <td className="text-center align-middle">
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
            </Badge>
          </td>
          <td className="text-center align-middle">
            {Moment(item.creationDate).format("DD/MM/YYYY")}
          </td>
          <td className="align-middle">
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={Link}
                to={"/itemEdit/" + item.id}
                disabled={item.state === DISCONTINUED ? true : false}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="warning"
                onClick={() => this.disable(item.id)}
                disabled={item.state === DISCONTINUED ? true : false}
              >
                Disable
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(item.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container>
          <h2 className="mt-4">Items</h2>

          <div className="float-right mt-3">
            <Button color="primary" tag={Link} to="/itemEdit/0">
              Add Item
            </Button>
          </div>
          <Table className="mt-2 table-bordered">
            <thead>
              <tr>
                <th width="5%">Code</th>
                <th>Description</th>
                <th className="text-center" width="10%">
                  Base price
                </th>
                <th className="text-center" width="10%">
                  State
                </th>
                <th className="text-center" width="10%">
                  Creation date
                </th>
                <th className="text-center" width="5%">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{itemList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ItemList;

let formatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});