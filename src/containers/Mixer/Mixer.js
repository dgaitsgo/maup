import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import Dropzone from 'react-dropzone'

import './Mixer.css'

class Mixer extends Component {

	onDrop = files => {

		const { newChannels } = this.props

		newChannels(files)
	}
	
	getChannels = ({ removeChannel, uploadAudio, channels }) => {
          
		let channelElems = channels.map( ({ id, name, audio }, i) =>
			<div key={'channel' + i } className='channel'>
				<i onClick={() => removeChannel(id)} className='material-icons channel-icon'>clear</i>
				<div className='channel-data'>
					<div className='channel-tab first'>
						{ i + 1 }
					</div>
					<div className='channel-tab'>
						<div className='channel-name'>{name}</div>
					</div>
				</div>
			</div>
		)

		return (
			<div className='channels-container'>
				<CSSTransitionGroup
					transitionName="channels-moves"
					transitionEnterTimeout={300}
					transitionLeaveTimeout={200}>
					{channelElems}
				</CSSTransitionGroup>
			</div>
		)
	}

	render() {

		const {
			channels,
			removeChannel,
			uploadAudio
		} = this.props

		console.log(channels)
	
		return (
			<div className='mixer'>
				<h4 className='section-title'>Mixer</h4>
				{this.getChannels({ removeChannel, channels, uploadAudio })}
				<div className='new-channel-button'>
					<Dropzone
						accept="audio/*"
						onDrop={this.onDrop}
	            		onFileDialogCancel={null}
	            		style={{}}
	          		>
						Drag and Drop Audio Files +
					</Dropzone>
				</div>
			</div>
		)
	}
}

export default Mixer