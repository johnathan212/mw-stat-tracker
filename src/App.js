import React, { Component } from 'react';
import Home from './Home'
import Stats from './Stats';
import './App.css';
import Footer from './Footer'
import {Route, Switch} from 'react-router-dom';

class App extends Component {

  render() {
    // let searchBar = withRouter( history => (<SearchBar history={history}/>));
    // const SearchBarWithRouter = withRouter(SearchBar)
    
    return (
      <div className="page">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/:platform/user/:username" component={Stats}/>
        </Switch>
        <div id="footer">
          <Footer/>
        </div>
      </div>
    )
  }
}
export default App;
