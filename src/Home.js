import React from 'react'
import SearchBar from './SearchBar'
import './Home.css'
import background from './Images/MWbackground.png'

function Home() {
    let style = {
        backgroundImage: `url(${background})`,
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover'
    }
    return(
        <div id="homePage" style={style}>
            <div id="siteName">
                MW STATS
            </div>
            <SearchBar/>
        </div>
    )
}

export default Home