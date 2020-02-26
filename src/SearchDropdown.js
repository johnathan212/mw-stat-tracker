import React, { Component } from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {IoMdCloseCircleOutline} from 'react-icons/io'

function getUsername(url) {
  let username
  for(let i = url.length - 1; url.charAt(i) !== '/'; i--) {
    username = decodeURIComponent(url.substring(i, url.length))
  }
  return username
}

class SearchDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {historyArray: undefined}
  }
  deleteHistory = (itemToDelete) => {
    for(let i = 0; i < this.state.historyArray.length; i++) {
      if(this.state.historyArray[i] === itemToDelete) {
        let temp = this.state.historyArray

          temp.splice(i, 1)
          let newCookie
          for(let i = 0; i < temp.length; i++) {
            if(i === 0 && temp[0] !== undefined) {
              newCookie = temp[0]
            } else {
              newCookie = newCookie + ',' + temp[i]
            }
          }
          Cookies.set("history", newCookie) 
        
        this.setState({historyArray: temp})
      }
    }
  }
  componentDidMount() {
    if(Cookies.get("history") !== undefined) {
      this.setState({historyArray: Cookies.get("history").split(",")})
    }
  }

  render() {
    if(this.props.focused) {
      if(this.state.historyArray !== undefined) {
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
            <h1 style={{fontSize: '20px', textAlign: 'center'}}>Recent Searches</h1>
            <div 
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: '10px'
              }}
            >
              {this.state.historyArray.map(item =>
                <div 
                  key={`${item}`}
                  style={{
                    display: 'flex',
                    flex: '0 0 33.333333%',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{textAlign: 'left'}}>
                    <Link 
                      to={`${item}`} 
                      style={{
                        color: 'white',
                        textDecoration: 'none'
                      }}
                    >
                      {getUsername(item)}
                    </Link>
                  </div>
                  <div style={{paddingRight: '15px'}}>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        cursor: 'pointer'
                      }} 
                      onClick={() => this.deleteHistory(`${item}`)}
                    >
                      <IoMdCloseCircleOutline style={{color: 'white', fontSize: '15px', paddingTop: '6px'}}/>
                    </button>    
                  </div>
                </div> 
              )}
            </div>
          </div>
        )
      } else {
        return (<div
          style={{
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
          }}
        >
          <h1 style={{fontSize: '20px', textAlign: 'center', borderBottom: '1px solid white'}}>Recent Searches</h1>
          <p style={{textAlign: 'center', fontSize: '18px'}}>No recent searches</p>
        </div>)
      }
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default SearchDropdown