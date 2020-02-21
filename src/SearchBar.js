import React, { Component } from 'react'
import './searchBar.css'
import {FaSearch} from 'react-icons/fa'
import {FaBattleNet} from 'react-icons/fa'
import {FaXbox} from 'react-icons/fa'
import {FaPlaystation} from 'react-icons/fa'
import {withRouter} from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      platform: 'battle'
    }
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

  // handleChange = event => {
  //   this.setState({ username: event.target.value })
  // }
  handleChange = (newValue, actionMeta) => {
    actionMeta.name = newValue.value
    console.log(newValue, actionMeta)
    console.log(typeof actionMeta.action)
    if(actionMeta.action === "create-option") {
      this.setState({username: actionMeta.name})

    }
    console.log(this.state)
  }

  callSearch = () => {
    console.log(this.state)
    this.props.history.push('/' + this.state.platform + '/user/' + encodeURIComponent(this.state.username))
  }

  // handleEnter = (event) => {
  //   if(event.nativeEvent.key === "Enter") {
  //     this.callSearch()
  //   }
  // }

  render() {
    const SearchButton =
      <button
        id='searchButton'
        type='button'
        onClick={() => { this.callSearch() }}
      >
        <FaSearch id="searchIcon"/>
      </button>

    const style = {
      control: base => ({
        ...base,
        border: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
      }),
      menu: (provided, state) => ({
        // ...provided,
        border: 'none',
        backgroundColor: '#292929',
        marginTop: '-1px'
      }),
      valueContainer: (provided) => ({
        ...provided,
      }),
      input: () => ({
        color: 'white'
      }),
      dropdownIndicator: () => ({
        backgroundColor: 'transparent'
      }),
      container: () => ({
        paddingRight: '20px'
      })
    }

    return (
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
          {/* <input 
            type="text"
            onChange={ (e) => this.handleChange(e) }
            onKeyPress={(event) => this.handleEnter(event)}
          >
          </input> */}
          <CreatableSelect
            styles={style}
            value={this.state.selectedOption}
            // onChange={(event) => this.handleChange(event)}
            onChange={this.handleChange}
            onInputChange={this.handleEnter}
            onKeyPress={(event) => this.handleEnter(event)}
            options={[{value: 'why', label: 'why'}]}
          >
          </CreatableSelect>
        </div>
        {SearchButton}
      </div>
    );
  }
}

export default withRouter(SearchBar)