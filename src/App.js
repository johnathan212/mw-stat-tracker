import React, { Component } from 'react';
import Home from './Home'
import Stats from './Stats';
import './App.css';
import {Route, Switch} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="page">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/:platform/user/:username" component={Stats}/>
        </Switch>
      </div>
    )
  }
}
export default App;
