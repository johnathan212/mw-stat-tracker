import React, { Component } from 'react';
import SearchBar from './SearchBar'
import Stats from './Stats'
import './App.css';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.setStateUsername = this.setStateUsername.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.search = this.search.bind(this)
  }

  handleChange = event => {
    this.setState({ username: event.target.value })
  }

  async search() {
    // let name = this.state.username
    let name = "john%2314729"

    await Axios.get('https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/battle/gamer/john%2314729/profile/type/mp')
      .then(result => {
        const data = result.data
        // this.setState({ stats: data })
        console.log(this.state.stats)
      })
  }

  setStateUsername(username) {
    this.setState({ username: username})
  }
  render() {
    return (
      <div>
        <SearchBar handleChange={this.handleChange} search={this.search}/>
        <Stats stats={this.state.stats}/>
      </div>
    );
  }
}
export default App;
