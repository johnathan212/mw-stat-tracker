import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Stats from './Stats';
import './App.css';
import Axios from 'axios';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { platform: 'battle'}
    this.search = this.search.bind(this)
  }

  async search(event , username, platform) {
    event.preventDefault()
    let encodedURIusername = encodeURIComponent(username)

    await Axios.get(`https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${platform}/gamer/${encodedURIusername}/profile/type/mp`)
      .then(result => {
        const data = result.data
        this.setState({ stats: data })
        // console.log(this.state.stats)
      })
  }

  render() {
    let searchBar = <SearchBar search={this.search} />;
    var page = <div className="page"> {searchBar} </div>
    if(this.state.stats) {
      page = <div className="page">
        {searchBar}
        <Router>
            <Route path="/:username" render={props =>
              (<Stats {...props} stats={this.state.stats}/>)
            }/>
        </Router>
      </div>
    }
    return page
  }
}
export default App;
