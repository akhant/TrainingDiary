import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { showMessage } from '../../../AC';
import elapsedTime from '../../../helpers';
import {Mutation} from 'react-apollo'
import {WORKOUT_START, WORKOUT_FINISH} from '../../../queries'

// TODO: fix timer
class Timer extends Component {
  state = {
    start: '',
    elapsed: 0,
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
    this.finish();
  };


  tick = () => {
    this.setState({
      elapsed: Math.round((Date.now() - this.state.start) / 1000),
    });
  };

  start = (workoutStart) => {
    if (this.started) return null;
//send start time to server
    workoutStart({variables: { workoutStart: Date.now().toString() }})

    this.setState(
      {
        start: Date.now() /* - savedTime */,
      },
      () => {
        this.timer = setInterval(this.tick, 1000);
        
        this.started = 1;
        this.props.showMessage({ message: '', started: this.started });
      }
    );
  };

  finish = (workoutFinish) => {
    if (!this.started) return null;
//send finish time to server
    workoutFinish({variables: { workoutFinish: Date.now().toString() }})
   
    clearInterval(this.timer);
    this.started = 0;
    this.props.showMessage({ message: '', started: this.started });
  };

  render() {
    return (
      <div className="timer">
        <div className="timer_time">
          <div className="center timer_time_numerals">
            {' '}
            {elapsedTime(this.state.elapsed)}
          </div>
        </div>
        <Mutation mutation={WORKOUT_START} >
        {(workoutStart) => (
          <button className="timer_btn btn" onClick={(e)=> this.start(workoutStart)}>
          {' '}
          {this.state.elapsed ? 'Continue' : 'Start '}
        </button>
        )}
        </Mutation>
        <Mutation mutation={WORKOUT_FINISH} >
        {(workoutFinish) => (
          <button className="timer_btn btn" onClick={(e)=> this.finish(workoutFinish)}>
          {' '}
          Finish{' '}
        </button>
        )}
        </Mutation>
        
      </div>
    );
  }
}

export default connect(
  null, 
  { showMessage }
)(Timer);
