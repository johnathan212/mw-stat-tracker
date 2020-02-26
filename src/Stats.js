import React, {Component} from 'react'
import './Stats.css'
import Collapsible from 'react-collapsible'
import Axios from 'axios';
import WeaponStats from './WeaponStats'
import KillStreakStats from './KillStreakStats'
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom'
import {ClipLoader} from 'react-spinners'
import Footer from './Footer';
import Cookies from 'js-cookie'

class Stats extends Component {
	constructor(props) {
		super(props)
		this.state = {
			platform: this.props.match.params.platform,
			username: this.props.match.params.username,
			loading: false
		}
	}
	componentDidMount() {
		this.search(this.state.username, this.state.platform)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location.pathname !== this.props.location.pathname) {
			this.setState({
				platform: this.props.match.params.platform,
				username: this.props.match.params.username
			})
			this.search(this.props.match.params.username, this.props.match.params.platform)
		}
	}

	getUsername(url) {
		let username
		for(let i = url.length - 1; url.charAt(i) !== '/'; i--) {
			username = url.substring(i, url.length)
		}
		return username
	}

	async search(username, platform) {
		this.setState({ loading: true })

		await Axios.get(`https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${platform}/gamer/${username}/profile/type/mp`)
			.then(result => {
				const data = result.data
				this.setState({ stats: data })
			})
		this.setState({ loading: false })
	}

	render() {
		if(this.state.loading === true) {
			return (
			<div
				style={{
					display: 'flex',
					height: '100vh',
					width: '100%',
					justifyContent: 'center', 
					alignItems: 'center'
				}}
			>
				<div style={{display: 'flex', flexDirection: 'row', margin: 'auto', fontSize: '30px'}}>
					LOADING 
					<div className="sweet-loading" style={{marginLeft: '10px'}}>
        		<ClipLoader
          		size={25}
          		color={"#white"}
          		loading={this.state.loading}
        	/>
      		</div>
				</div>
			</div>
			)
		} else if(this.state.stats && this.state.stats.status !== "error") {
			const lifetimeStats = this.state.stats.data.lifetime.all.properties
			
			let currentCookie = Cookies.get("history")
			let cookieArray
			let newCookie = this.props.history.location.pathname
			if(currentCookie === undefined) {
				Cookies.set("history", newCookie)
			} else {
				cookieArray = currentCookie.split(",")
				if(!cookieArray.includes(newCookie)) {
					if(this.state.username === this.getUsername(newCookie)) {
						newCookie = currentCookie + ',' + newCookie
						Cookies.set("history", newCookie)
					}
				}
			}


			let rankStyles = {
				height: '100px',
				width: '100px',
				background: `url("https://www.callofduty.com/cdn/app/icons/mw/ranks/mp/icon_rank_${this.state.stats.data.level}.png")`,
				backgroundSize: 'contain',
				backgroundRepeat: 'no-repeat'
			}

			return (
				<div>
					<div id="searchBarBox">
						<div id="searchBarHomeLink">
							<Link id="homeLink"to="/">MW-STATS</Link>
						</div>
						<div id="searchBar">
							<SearchBar/>
						</div>
						<div id="emptyDiv">
							<Link to="/">MW-STATS</Link>
						</div>
					</div>
					<div id="playerStats">
						<h1> {this.state.stats.data.username} </h1>
						<div id="level">
							<div id="levelText">LEVEL {this.state.stats.data.level} </div>
							<div id="rankImage" style={rankStyles}></div>
						</div>
						<div id="lifetimeStats">
							<div id="killStats">
								<div id="winLoss">
									<h2>WINS</h2>
									<p> {lifetimeStats.wins.toLocaleString('en-US')}</p>
									<h2>LOSSES</h2>
									<p>{lifetimeStats.losses.toLocaleString('en-US')}</p>
								</div>
								<div id="score">
									<h2>SCORE</h2>
									<p>{lifetimeStats.score.toLocaleString('en-US')}</p>
									<h2>BEST SPM</h2>
									<p>{lifetimeStats.bestSPM.toLocaleString('en-US')}</p>
								</div>
								<div id="kdRatio">
									{lifetimeStats.kdRatio.toFixed(2).toLocaleString('en-US')}
									<h3>KD RATIO</h3>
								</div>
								<div id="kills">
									<h2>KILLS</h2>
									<p> {lifetimeStats.kills.toLocaleString('en-US')}</p>
									<h2>DEATHS</h2>
									<p> {lifetimeStats.deaths.toLocaleString('en-US')}</p>
								</div>
								<div id="winLossAccuracy">
									<h2>W/L RATIO</h2>
									<p> {lifetimeStats.wlRatio.toFixed(1)}</p>
									<h2>ACCURACY</h2>
									<p> {(Math.round(lifetimeStats.accuracy * 100))}%</p>
								</div>
							</div>
							<Collapsible trigger="VIEW MORE ▼" triggerWhenOpen="VIEW LESS ▲">
								<div id="moreStats">
									<div className="moreStatsColumn">
										<div className="moreStatsElement">
											<div className="moreStatsElementLeft">
												<h1> HEADSHOTS: </h1>
											</div>
											<div className="moreStatsElementRight">
												<p>{lifetimeStats.headshots.toLocaleString('en-US')}</p>
											</div>
										</div>
										<div className="moreStatsElement">
											<div className="moreStatsElementLeft">
												<h1> GAMES PLAYED: </h1>
											</div>
											<div className="moreStatsElementRight">
												<p>{lifetimeStats.totalGamesPlayed.toLocaleString('en-US')}</p>
											</div>
										</div>
										<div className="moreStatsElement">
											<div className="moreStatsElementLeft">
												<h1> ASSISTS: </h1>
											</div>
											<div className="moreStatsElementRight">
												<p>{lifetimeStats.assists.toLocaleString('en-US')}</p>
											</div>
										</div>
										<div className="moreStatsElement">
											<div className="moreStatsElementLeft">
												<h1> Time Played: </h1>
											</div>
											<div className="moreStatsElementRight">
												<p>
													{(lifetimeStats.timePlayedTotal / 86400).toFixed(0).toLocaleString('en-US')}
													<span style={{ color: 'white' }}>D &nbsp;</span>
													{Math.ceil((lifetimeStats.timePlayedTotal / 86400) / 3600).toLocaleString('en-US')}
													<span style={{ color: 'white' }}>H</span>
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
												<p> {lifetimeStats.suicides.toLocaleString('en-US')}</p>
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
												<p>{lifetimeStats.bestKills.toLocaleString('en-US')}</p>
											</div>
										</div>
										<div className="moreStatsElement">
											<div className="moreStatsElementLeft">
												<h1> SCORE/GAME: </h1>
											</div>
											<div className="moreStatsElementRight">
												<p>{lifetimeStats.scorePerGame.toLocaleString('en-US')}</p>
											</div>
										</div>
									</div>
									<div className="moreStatsColumn">
										<div className="moreStatsElement">
											<div className="moreStatsElementLeft">
												<h1> BEST DEATHS: </h1>
											</div>
											<div className="moreStatsElementRight">
												<p> {lifetimeStats.bestDeaths.toLocaleString('en-US')}</p>
											</div>
										</div>
										<div className="moreStatsElement">
											<div className="moreStatsElementLeft">
												<h1> BEST KILL STREAK: </h1>
											</div>
											<div className="moreStatsElementRight">
												<p>{lifetimeStats.bestKillStreak.toLocaleString('en-US')}</p>
											</div>
										</div>
										<div className="moreStatsElement">
											<div className="moreStatsElementLeft">
												<h1> BEST SCORE: </h1>
											</div>
											<div className="moreStatsElementRight">
												<p>{lifetimeStats.bestScore.toLocaleString('en-US')}</p>
											</div>
										</div>
										<div className="moreStatsElement">
											<div className="moreStatsElementLeft">
												<h1> SPM: </h1>
											</div>
											<div className="moreStatsElementRight">
												<p>{Math.round(lifetimeStats.scorePerMinute).toLocaleString('en-US')}</p>
											</div>
										</div>
									</div>
								</div>
							</Collapsible>
						</div>
						<div>
							<WeaponStats weaponStats={this.state.stats.data.lifetime.itemData} />
						</div>
						<div>
							<KillStreakStats killStreakStats={this.state.stats.data.lifetime.scorestreakData} />
						</div>
						<br></br>
					</div>
					<Footer/>
				</div>
			);
		} else {
			return (
				<div style={{display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'center', fontSize: '30px'}}>
					<SearchBar/>
					PLAYER NOT FOUND
					<Link to='/'>RETURN</Link>
				</div>
			)
		}
	}
}

export default Stats