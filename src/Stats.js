import React, {Component} from 'react'
import './Stats.css'
import Collapsible from 'react-collapsible'

class Stats extends Component {
    constructor(props) {
        super(props)
        console.log("working")
        this.state = {
            username: props.match.params.username
        }
    }

    render() {
        console.log(this.props)
        if(this.props.stats.status !== 'error' || this.props.stats === undefined){
            const lifetimeStats = this.props.stats.data.lifetime.all.properties
            let rankStyles = {
                height: '100px',
                width: '100px',
                background: `url("https://www.callofduty.com/cdn/app/icons/mw/ranks/mp/icon_rank_${this.props.stats.data.level}.png")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
            }
    
            return (
                // <h1> {props.stats.data.username}{console.log(props.stats)}</h1>
                <div id="playerStats">
                    <h1> {this.props.stats.data.username} </h1>
                    {/* <h1> {username} </h1> */}
                    <div id="level">
                        <div id="levelText">LEVEL {this.props.stats.data.level} </div>
                        <div id="rankImage" style={rankStyles}></div>
                    </div>
                    <div id="lifetimeStats">
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
                                {lifetimeStats.kdRatio.toFixed(2)}
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
                                <p> {lifetimeStats.wlRatio.toFixed(1)}</p>
                                <h2>ACCURACY</h2>
                                <p> {(Math.round(lifetimeStats.accuracy * 100))}%</p>
                            </div>
                        </div>
                        <Collapsible trigger="VIEW MORE" triggerWhenOpen="VIEW LESS">
                            <div id="moreStats">
                                <div className="moreStatsColumn">
                                    <div className="moreStatsElement">
                                        <div className="moreStatsElementLeft">
                                            <h1> HEADSHOTS: </h1>
                                        </div>
                                        <div className="moreStatsElementRight">
                                            <p>{lifetimeStats.headshots}</p>
                                        </div>
                                    </div>
                                    <div className="moreStatsElement">
                                        <div className="moreStatsElementLeft">
                                            <h1> GAMES PLAYED: </h1>
                                        </div>
                                        <div className="moreStatsElementRight">
                                            <p>{lifetimeStats.totalGamesPlayed}</p>
                                        </div>
                                    </div>
                                    <div className="moreStatsElement">
                                        <div className="moreStatsElementLeft">
                                            <h1> ASSISTS: </h1>
                                        </div>
                                        <div className="moreStatsElementRight">
                                            <p>{lifetimeStats.assists}</p>
                                        </div>
                                    </div>
                                    <div className="moreStatsElement">
                                        <div className="moreStatsElementLeft">
                                            <h1> Time Played: </h1>
                                        </div>
                                        <div className="moreStatsElementRight">
                                            <p>
                                                {(lifetimeStats.timePlayedTotal / 86400).toFixed(0)}
                                                <span style={{color: 'white'}}>D &nbsp;</span>
                                                {Math.ceil((lifetimeStats.timePlayedTotal / 86400) / 3600)}
                                                <span style={{color: 'white'}}>H</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="moreStatsColumn">
                                    <div className="moreStatsElement">
                                        <div className="moreStatsElementLeft">
                                            <h1> SUICIDES: </h1>
                                        </div>
                                        <div className="moreStatsElementRight">
                                            <p> {lifetimeStats.suicides}</p>
                                        </div>
                                    </div>
                                    <div className="moreStatsElement">
                                        <div className="moreStatsElementLeft">
                                            <h1> BEST K/D: </h1>
                                        </div>
                                        <div className="moreStatsElementRight">
                                            <p>{lifetimeStats.bestKD}</p>
                                        </div>
                                    </div>
                                    <div className="moreStatsElement">
                                        <div className="moreStatsElementLeft">
                                            <h1> BEST KILLS: </h1>
                                        </div>
                                        <div className="moreStatsElementRight">
                                            <p>{lifetimeStats.bestKills}</p>
                                        </div>
                                    </div>
                                    <div className="moreStatsElement">
                                        <div className="moreStatsElementLeft">
                                            <h1> SCORE/GAME: </h1>
                                        </div>
                                        <div className="moreStatsElementRight">
                                            <p>{lifetimeStats.scorePerGame}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="moreStatsColumn">
                                    <div className="moreStatsElement">
                                        <div className="moreStatsElementLeft">
                                            <h1> BEST DEATHS: </h1>
                                        </div>
                                        <div className="moreStatsElementRight">
                                            <p> {lifetimeStats.bestDeaths}</p>
                                        </div>
                                    </div>
                                    <div className="moreStatsElement">
                                        <div className="moreStatsElementLeft">
                                            <h1> BEST KILL STREAK: </h1>
                                        </div>
                                        <div className="moreStatsElementRight">
                                            <p>{lifetimeStats.bestKillStreak}</p>
                                        </div>
                                    </div>
                                    <div className="moreStatsElement">
                                        <div className="moreStatsElementLeft">
                                            <h1> BEST SCORE: </h1>                                   
                                        </div>
                                        <div className="moreStatsElementRight">
                                            <p>{lifetimeStats.bestScore}</p>
                                        </div>
                                    </div>
                                    <div className="moreStatsElement">
                                        <div className="moreStatsElementLeft">
                                            <h1> SPM: </h1>
                                        </div>
                                        <div className="moreStatsElementRight">
                                            <p>{Math.round(lifetimeStats.scorePerMinute)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapsible>
                    </div>
                    <div id="weaponStats">
                    </div>
                    <br></br>
                </div>
            );
        } else {
        return <div><h1> INVALID PLAYER NAME</h1></div>
        }
    }
}

export default Stats