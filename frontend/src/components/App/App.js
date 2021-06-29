import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from '../LoginPage/Login';
import ItemList from '../ItemCRUD/ItemList';
import ItemDetail from '../ItemCRUD/ItemDetail';
import ItemEdit from '../ItemCRUD/ItemEdit';
import Home from '../HomePage/Home';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/login' exact={true} component={Login} />
          <Route path='/items' exact={true} component={ItemList} />
          <Route path='/items/:id' component={ItemDetail} />
          <Route path='/itemEdit/:id' component={ItemEdit} />
        </Switch>
      </Router>
    )
  }
}

export default App;
