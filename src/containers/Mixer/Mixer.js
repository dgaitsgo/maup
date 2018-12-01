import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

import './Mixer.css'

class Mixer extends Component {
	
	getChannels = ({ removeChannel, channels }) => {
          
		let channelElems = channels.map( ({ type, name, id }, i) => {
				return (
					<div key={'channel' + i } className='channel'>
						<i onClick={() => removeChannel(id)} className='material-icons channel-icon'>clear</i>
						<div className='channel-data'>
							<div className='channel-tab first'>
								{ i + 1 }
							</div>
							<div className='channel-tab'>
								{
									type === 'empty'
									? <div className='audio-upload'><a>Upload Audio</a></div>
									: <div>Soundcloud liek visualization</div>
								}
							</div>
						</div>
					</div>
				)
			})

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
			newChannel,
			removeChannel
		} = this.props
	
		return (
			<div className='mixer'>
				<h4 className='section-title'>Mixer</h4>
				{this.getChannels({ removeChannel, channels })}
				<div className='new-channel-button' onClick={newChannel}>
					New Channel +
				</div>
			</div>
		)
	}
}

export default Mixer