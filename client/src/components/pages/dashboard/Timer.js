import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { addParam } from '../../../AC';
import elapsedTime from '../../../helpers';
import { WORKOUT_START, WORKOUT_FINISH } from '../../../queries';

// TODO: fix timer
class Timer extends Component {
  state = {
    start: '',
    elapsed: this.props.statistic ? Math.ceil(this.props.statistic.workoutTime / 1000) : 0,
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
    // this.finish();
  };

  tick = () => {
    this.setState(state => ({ elapsed: Math.round((Date.now() - state.start) / 1000) }));
  };

  start = async (workoutStart) => {
    const { started } = this.props.params;
    if (started) return null;
    // send start time to server
    await workoutStart({ variables: { workoutStart: Date.now().toString() } });

    this.setState(
      {
        start: Date.now(),
      },
      () => {
        this.timer = setInterval(this.tick, 1000);

        this.props.addParam({ started: true, message: '' });
      }
    );
  };

  finish = async (workoutFinish) => {
    const { started } = this.props.params;
    if (!started) return null;
    // send finish time to server
    clearInterval(this.timer);
    await workoutFinish({ variables: { workoutFinish: Date.now().toString() } });

    
    this.props.addParam({ started: false, message: '' });
  };

  render() {
    const { elapsed } = this.state;

    return (
      <div className="timer">
        <div className="timer_time">
          <div className="center timer_time_numerals"> {elapsedTime(elapsed)}</div>
        </div>
        <Mutation mutation={WORKOUT_START}>
          {workoutStart => (
            <button className="timer_btn btn" onClick={e => this.start(workoutStart)}>
              {' '}
              {elapsed ? 'Continue' : 'Start '}
            </button>
          )}
        </Mutation>
        <Mutation mutation={WORKOUT_FINISH}>
          {workoutFinish => (
            <button className="timer_btn btn" onClick={e => this.finish(workoutFinish)}>
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
  ({ params }) => ({ params }),
  { addParam }
)(Timer);
