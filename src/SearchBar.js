import React, { Component } from 'react'
import './searchBar.css'
import {FaSearch} from 'react-icons/fa'
import {FaBattleNet} from 'react-icons/fa'
import {FaXbox} from 'react-icons/fa'
import {FaPlaystation} from 'react-icons/fa'
import { withRouter } from 'react-router-dom'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {platform: 'battle'}
    this.handleChange = this.handleChange.bind(this)
    this.handleDropdownChange = this.handleDropdownChange.bind(this)

    this.activeStyle = {
      color: 'white'
    }
    this.inactiveStyle = {
      color: 'gray'
    }
  }

  handleDropdownChange = (event, platform) => {
    this.setState({ platform: platform}, () => {console.log(this.state.platform)})
  }

  handleChange = event => {
    this.setState({ username: event.target.value })
  }

  render() {
    const SearchButton = withRouter(({ history }) => (
      <button
        type='button'
        onClick={() => { history.push('/' + this.state.platform + '/user/' + encodeURIComponent(this.state.username)) }}
      >
        <FaSearch id="searchIcon"/>
      </button>
    ))
    return (
      <div id="page">
        <div id="searchBox"> 
          <div id="platformSelect">
            <button
              onClick={ (e) => this.handleDropdownChange(e, 'battle')}
              style={(this.state.platform === 'battle') ? this.activeStyle : this.inactiveStyle}
            >
              <FaBattleNet/>
            </button>
            <button 
              onClick={ (e) => this.handleDropdownChange(e, 'xbox')}
              style={(this.state.platform === 'xbox') ? this.activeStyle : this.inactiveStyle}
            >
              <FaXbox/>
            </button>
            <button
              onClick={ (e) => this.handleDropdownChange(e, 'psn')}
              style={(this.state.platform === 'psn') ? this.activeStyle : this.inactiveStyle}
            >
              <FaPlaystation/>
            </button>
          </div>
          <div id="form">
            <form>
              <input type="text"
                onChange={ (e) => this.handleChange(e) }
              />
              <SearchButton/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar