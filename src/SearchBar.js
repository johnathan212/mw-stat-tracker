import React from 'react'
import './searchBar.css'
import {FaSearch} from 'react-icons/fa'
import {FaBattleNet} from 'react-icons/fa'
import {FaXbox} from 'react-icons/fa'
import {FaPlaystation} from 'react-icons/fa'

var SearchBar = function(props){
  return (
    <div id="page">
      <div id="searchBox"> 
        <div id="platformSelect">
          <button><FaBattleNet/></button>
          <button><FaXbox/></button>
          <button><FaPlaystation/></button>
        </div>
        <form>
          <input type="text"
            onChange={ (e) => props.handleChange(e) }
          />
          <button id="searchButton" value="Search" onClick={ (e) => props.search(e)}><FaSearch id="searchIcon"/></button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar