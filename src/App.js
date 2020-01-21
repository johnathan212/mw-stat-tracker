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

  handleDropdownChange = (event, platform) => {
    this.setState({ platform: platform}, () => {console.log(this.state.platform)})
  }

  handleChange = event => {
    this.setState({ username: event.target.value })
  }

  async search(event) {
    event.preventDefault()
    let encodedURIusername = encodeURIComponent(this.state.username)

    await Axios.get(`https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${this.state.platform}/gamer/${encodedURIusername}/profile/type/mp`)
      .then(result => {
        const data = result.data
        this.setState({ stats: data })
        // console.log(this.state.stats)
      })
  }

  render() {
    let searchBar = <SearchBar handleChange={this.handleChange} handleDropdownChange={this.handleDropdownChange} search={this.search} platform={this.state.platform}/>;
    var page = <div className="page"> {searchBar} </div>
    if(this.state.stats) {
      page = <div className="page">
        {searchBar}
        <Stats stats={this.state.stats}/>
      </div>
    }
    return page
  }
}
export default App;
