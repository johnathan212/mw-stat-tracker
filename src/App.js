import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Stats from './Stats';
import './App.css';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { platform: 'battle'}
    this.handleChange = this.handleChange.bind(this)
    this.handleDropdownChange = this.handleDropdownChange.bind(this)
    this.search = this.search.bind(this)
  }

  handleDropdownChange = event => {
    this.setState({ platform: event.target.value })
  }

  handleChange = event => {
    this.setState({ username: event.target.value })
  }

  async search(event) {
    event.preventDefault()
    // let name = this.state.username
    // let name = "john%2314729"

    await Axios.get('https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/battle/gamer/iShot%2321899/profile/type/mp')
      .then(result => {
        const data = result.data
        this.setState({ stats: data })
        // console.log(this.state.stats)
      })
  }

  render() {
    var page = <div className="page"> <SearchBar handleChange={this.handleChange} search={this.search}/> </div>
    if(this.state.stats) {
      page = <div className="page">
        <SearchBar handleChange={this.handleChange} handleDropdownChange={this.handleDropdownChange} search={this.search}/>
        <Stats stats={this.state.stats}/>
      </div>
    }
    return page
  }
}
export default App;
