import React, { Component } from 'react'

// import Header from 'components/Header'
import Controls from 'containers/Controls'
import Mixer from 'containers/Mixer'

import './App.css'

class App extends Component {
	
	constructor() {
		super()
		this.state = {
			recording : false,
			playing : false,
			channels : [ { id : 1, type : 'empty', 'name' : '' } ]
		}
	}

	onClickRecord = () => {

		const { recording } = this.state

		this.setState({ recording : !recording })
	}

	onClickPlay = () => {
		this.setState({ playing : true })
	}

	onClickStop = () => {
		this.setState({ playing : false, recording : false })
	}

	removeChannel = id => {
		
		const { channels } = this.state
		let nextChannels = []

		nextChannels = channels.filter(channel => channel.id != id)
		nextChannels.forEach( (channel, i) => channel.id = i + 1)
		this.setState({ channels : nextChannels })

	}

	newEmptyChannel = () => {
		
		let { channels } = this.state

		channels.push({ id : channels.length + 1, type : 'empty', 'name' : '' })

		this.setState({
			channels
		})
	}

	getHeader = ({ playing, recording }) =>
		<div className='header'>
			<div className='third'>
				<p className='header-title'>MAUP.</p>
			</div>
			<div className='third'>
				<Controls
					playing={playing}
					recording={recording}
					onClickRecord={this.onClickRecord}
					onClickPlay={this.onClickPlay}
					onClickStop={this.onClickStop}
					/>
			</div>
			<div className='third'>
				<a><u>Tour</u></a>/
				<a><u>Github</u></a>
			</div>
		</div>


	render() {

		const { 
			recording,
			playing,
			channels
		} = this.state

		return (
			<div className='app-container'>
				{this.getHeader({ playing, recording })}
				<div className='content'>
					<div className='left'>
						<Mixer
							removeChannel={this.removeChannel}
							newChannel={this.newEmptyChannel}
							channels={channels}/>
					</div>
					<div className='right'>
					</div>
				</div>
			</div>
		)
	}
}

export default App