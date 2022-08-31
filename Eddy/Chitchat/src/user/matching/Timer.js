import React, { Component } from 'react'

class Timer extends Component {
    constructor(props) {
        super(props);
      }
    state = {
        minutes: 0,
        seconds: 30,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state
            //calculate the countdown time for each interval
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        //display the countdown time
        return (
            <div>
                { minutes === 0 && seconds === 0
                    ? this.props.timeout() //go to the chatroom
                    : <h1 className="pop_up_quiz_title">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
        )
    }
}

export default Timer;
