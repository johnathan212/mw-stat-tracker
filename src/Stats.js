import React from 'react'
import './Stats.css'

var Stats = function(props) {
    if(props.stats.status !== 'error' || props.stats === undefined){
        const lifetimeStats = props.stats.data.lifetime.all.properties
        let rankStyles = {
            background: 'url("https://www.callofduty.com/cdn/app/icons/mw/ranks/mp/icon_rank_66.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
        }

        return (
            // <h1> {props.stats.data.username}{console.log(props.stats)}</h1>
            <div id="playerStats">
                <h1> {props.stats.data.username} </h1>
                <div id="rankImage" style={rankStyles}>rank</div>
                <div id="killStats">
                    <div id="winLoss">
                        <h2>WINS</h2>
                        <p> {lifetimeStats.wins}</p>
                        <h2>LOSSES</h2>
                        <p>{lifetimeStats.losses}</p>
                    </div>
                    <div id="score">
                        <h2>SCORE</h2>
                        <p>{lifetimeStats.score}</p>
                        <h2>BEST SPM</h2>
                        <p>{lifetimeStats.bestSPM}</p>
                    </div>
                    <div id="kdRatio">
                        <p1> {lifetimeStats.kdRatio.toFixed(2)}</p1>
                        <h3>KD RATIO</h3>
                    </div>
                    <div id="kills">
                        <h2>KILLS</h2>
                        <p> {lifetimeStats.kills}</p>
                        <h2>DEATHS</h2>
                        <p> {lifetimeStats.deaths}</p>
                    </div>
                    <div id="winLossAccuracy">
                        <h2>W/L RATIO</h2>
                        <p> {lifetimeStats.wlRatio}</p>
                        <h2>ACCURACY</h2>
                        <p> {(Math.round(lifetimeStats.accuracy * 100))}%</p>
                    </div>
                </div>
                
            </div>
        );
    } else {
    return <div><h1> INVALID PLAYER NAME</h1></div>
    }
}

export default Stats