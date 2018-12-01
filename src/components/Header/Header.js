import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
	
	render() {

		const { title } = this.props
	
		return (

			<div className='header'>
				<p className='header-title'>{title}</p>
			</div>
		)
	}
}

export default Header