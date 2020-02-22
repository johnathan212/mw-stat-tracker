import React from 'react'
import SearchBar from './SearchBar'
import './Home.css'
import background from './Images/MWbackground.png'
import Footer from './Footer'

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
        <div id="homePage" className="background" style={style}>
            <div style={{height: '30%'}}></div>
            <div id="siteName">
                MW STATS
            </div>
            <div style={{display: 'flex', flex: '1', justifyContent: 'center'}}>
                <SearchBar/>
            </div>
            <div id="empty">
                MW STATS
            </div>
            <div style={{height: '10%'}}></div>
            <div id="footer">
                <Footer/>
            </div>
        </div>
    )
}

export default Home