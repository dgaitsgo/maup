import React, { Component } from 'react'
import p5 from 'p5'

import Controls from 'containers/Controls'
import Mixer from 'containers/Mixer'
import Visuals from 'containers/Visuals'

import './App.css'

class App extends Component {

	constructor() {
		super()
		this.state = {
			recording : false,
			playing : false,
			channels : []
		}

		let AudioContext = window.AudioContext || window.webkitAudioContext
		this.audioContext = new AudioContext()
		this.fileReader = new FileReader()
		this.waitingForFiles = 0
	}

	// componentDidMount() {

	// 	this.hydrateStateWithLocalStorage()
	// 	// add event listener to save state to localStorage
	// 	// when user leaves/refreshes the page
	// 	window.addEventListener(
	// 		"beforeunload",
	// 		this.saveStateToLocalStorage
	// 	)
	// }

	// componentWillUnmount() {
	// 	window.removeEventListener(
	// 		"beforeunload",
	// 		this.saveStateToLocalStorage
	// 	)
	// }

	/*************************************************************/
	//Local Storage
	//Implimentation details :
	//https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2
	/*************************************************************/
	saveStateToLocalStorage = () => {
		console.log('hello')
		window.localStorage.setItem('channels', JSON.stringify(this.state.channels))
	}

	hydrateStateWithLocalStorage = () => {

		// for all items in state
		for (let key in this.state) {
			// if the key exists in localStorage
			if (window.localStorage.hasOwnProperty(key)) {
				// get the key's value from localStorage
				let value = localStorage.getItem(key)

				// parse the localStorage string and setState
				try {
					value = JSON.parse(value);
					this.setState({ [key]: value })
				} catch (e) {
					// handle empty string
					this.setState({ [key]: value })
				}
			}
		}
	}

	/*************************************************************/
	//Functional
	/*************************************************************/
	onClickRecord = () => {

		const { recording } = this.state

		this.setState({ recording : !recording })
	}

	onClickPlay = () => {

		const { channels } = this.state

		let sources = []

		channels.forEach( (channel) => {

			let source = this.audioContext.createBufferSource()
			source.buffer = channel.buffer
			source.connect(this.audioContext.destination)
			source.start(0)
			sources.push(source)
		})

		this.setState({ playing : true, sources })

	}

	onClickStop = () => {

		const { sources } = this.state

		sources.forEach( source => source.stop(0) )

		this.setState({
			playing : false,
			recording : false,
			sources : []
		})
	}

	removeChannel = id => {

		const { channels } = this.state
		let nextChannels = []

		nextChannels = channels.filter(channel => channel.id != id)
		nextChannels.forEach( (channel, i) => channel.id = i + 1)
		this.setState({ channels : nextChannels })

	}

	updateChannels = channels => {
		this.setState({ newChannels : true, channels })
	}

	newChannels = (files) => {

		if (files.length === 0)
			return ;

		let nextChannels = [...this.state.channels]

		for (let i = 0; i < files.length; i++) {

			let audioFile = files[i]
			let fileReader = new FileReader()

			fileReader.readAsArrayBuffer(audioFile)
			fileReader.onload = e => {

				this.waitingForFiles += 1

				let file = e.target.result

				this.audioContext.decodeAudioData(file, (buffer) => {

					nextChannels.push({
						id : this.waitingForFiles + nextChannels.length,
						file : file,
						buffer : buffer,
						name : audioFile.name
					})
				})

				if (this.waitingForFiles === files.length) {
					this.waitingForFiles = 0
					this.updateChannels(nextChannels)
				}
			}
		}
	}

	/*************************************************************/
	//Presentation
	/*************************************************************/
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

	/*************************************************************/
	//Render
	/*************************************************************/

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
							newChannels={this.newChannels}
							uploadAudio={this.uploadAudio}
							channels={channels} />
					</div>
					<div className='right'>
						<div id='p5-canvas'></div>
						<Visuals _p5={p5} drawStack={[]} config={{ width : 500, height : 500 }} />
					</div>
				</div>
			</div>
		)
	}
}

export default App
