import React from 'react'

var SearchBar = function(props){
  return (
    <div>
      <form action="" method="get">
        <input type="text"
          onChange={ (e) => props.handleChange(e) }
        />
      </form>
      <button value="Search" onClick={ props.search}>Search</button>
    </div>
  );
}

export default SearchBar