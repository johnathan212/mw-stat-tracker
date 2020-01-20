import React from 'react'
import SearchBar from './SearchBar'

var Stats = function(props) {
    if(props.stats){
        return (
            // <h1> {props.stats.data.username}{console.log(props.stats)}</h1>
            <div id="playerStats">
                <SearchBar/>
                <h1> {props.stats.data.username} </h1>
                <div id="killStats">
                    <p> {props.stats.data.lifetime.all.properties.kdRatio} </p>
                </div>
                <div id ="gameStats">

                </div>
            </div>
        );
    } else {
        return <div></div>
    }
}

export default Stats