import React, { Component } from 'react'
// import amplitude from './scenes/amplitude'

class Visuals extends Component {

    constructor(props) {

        super(props)

        const {
            _p5,
            drawStack,
            config
        } = this.props

        this.Scene = p5 => {
            p5.setup = () => {
        		// this.canvas = p5.createCanvas(config.width, config.height, p5.WEBGL).canvas
                this.canvas = p5.createCanvas(config.width, config.height).canvas
                this.ctx = this.canvas.getContext('2d')
                p5.background(0)
                p5.fill(255)
                p5.noStroke()
            }

            p5.draw = () => {
                drawStack.forEach(draw => draw(p5))
            }
        }

        new _p5(this.Scene, 'p5-canvas')
    }

    render() {
        return (null)
    }

}


export default Visuals
