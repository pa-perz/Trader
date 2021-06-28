import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './HomePage/Home';
import Login from './LoginPage/Login';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import ItemEdit from './ItemEdit';

class App extends React.Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/login' exact={true} component={Login}/>
            <Route path='/items' exact={true} component={ItemList}/>
            <Route path='/items/:id' component={ItemDetail}/>
            <Route path='/itemEdit/:id' component={ItemEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
