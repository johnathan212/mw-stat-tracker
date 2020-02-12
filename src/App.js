import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Stats from './Stats';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';

class App extends Component {

  render() {
    // let searchBar = withRouter( history => (<SearchBar history={history}/>));
    const SearchBarWithRouter = withRouter(SearchBar)
    
    return (
        <div className="page">
          <SearchBarWithRouter/>
          <Switch>
            <Route exact path='/' />
            <Route path="/:platform/user/:username" component={Stats}/>
          </Switch>
        </div>
    )
  }
}
export default App;
