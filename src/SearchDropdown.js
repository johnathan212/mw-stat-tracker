import React from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

function getUsername(url) {
  let username
  for(let i = url.length - 1; url.charAt(i) !== '/'; i--) {
    username = decodeURIComponent(url.substring(i, url.length))
  }
  return username
}

function SearchDropdown(props) {
  // if(props.focused) {
    if(true) {
    let historyArray = Cookies.get("history").split(",")
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        position:'absolute', 
        width: 'inherit', 
        textAlign: 'left', 
        backgroundColor: '#292929',
        marginTop: '-1px',
        fontSize: '20px',
        paddingLeft: '4px',
        paddingBottom: '4px'
      }}>
        {historyArray.map(item => <Link key={`${item}`} to={`${item}`} style={{color: 'white'}}>{getUsername(item)}</Link>)}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default SearchDropdown