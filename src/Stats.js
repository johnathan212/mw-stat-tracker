import React from 'react'

var Stats = function(props) {
    if(props.stats.status !== 'error'){
        return (
            // <h1> {props.stats.data.username}{console.log(props.stats)}</h1>
            <div id="playerStats">
                <h1> {props.stats.data.username} </h1>
                <div id="killStats">
                    <p> {props.stats.data.lifetime.all.properties.kdRatio} </p>
                </div>
                <div id ="gameStats">

                </div>
            </div>
        );
    } else {
    return <div><h1> INVALID PLAYER NAME</h1></div>
    }
}

export default Stats