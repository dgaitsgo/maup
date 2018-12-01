import React, { Component } from 'react'
import classNames from 'classnames'
import './Controls.css'

class Controls extends Component {

	render() {

		const {
			playing,
			recording,
			onClickPlay,
			onClickStop,
			onClickRecord
		} = this.props

		const baseButtonClass = 'material-icons control-button'
	
		return (
		
			<div className='controls'>
				<i onClick={playing ? null : onClickPlay} className={classNames(baseButtonClass, { 'inactive' : playing }) }>play_arrow</i>
				<i onClick={playing ? onClickStop : null} className={classNames(baseButtonClass, { 'inactive' : !playing }) }>stop</i>
				<i onClick={onClickRecord} id='record' className={classNames(baseButtonClass, { 'recording' : recording, }) }>fiber_manual_record</i>
			</div>
		);
	}
}

export default Controls