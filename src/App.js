import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Stats from './Stats';
import './App.css';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { platform: 'battle'}
  }

  render() {
    let searchBar = <SearchBar/>;
    
    return (
      <Router>
        <div className="page">
          {searchBar}
          <Switch>
            <Route exact path="/" > empty styff </Route>
            <Route path="/:platform/user/:username" component={Stats}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;
