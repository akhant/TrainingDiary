import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { addParam } from '../../../AC';
import { elapsedTime } from '../../../helpers';
import { WORKOUT_START, WORKOUT_FINISH } from '../../../queries';

// TODO: fix timer
class Timer extends Component {
  state = {
    start: this.props.statistic ? this.props.statistic.workoutStart : Date.now(),
    elapsed: this.props.statistic ? Math.ceil(this.props.statistic.workoutTime / 1000) : 0,
  };

  componentWillUnmount = () => {
    this.stop();
  };

  tick = () => {
    this.setState({ elapsed: Math.round((Date.now() - this.state.start) / 1000) });
  };

  componentDidMount = () => {
    const { started } = this.props.params;
    if (started) this.continue();
  };

  continue = () => {
    this.timer = setInterval(this.tick, 1000);
    this.props.addParam({ started: true, message: '' });
  };

  start = async () => {
    const { started } = this.props.params;
    if (started) return null;
    this.continue();
    // send start time to server only first time
    if (!this.state.elapsed) {
      await this.props.client.mutate({ mutation: WORKOUT_START, variables: { workoutStart: Date.now().toString() } });
    }
  };

  stop = async () => {
    const { started } = this.props.params;
    if (!started) return null;
    // send finish time to server
    clearInterval(this.timer);
    await this.props.client.mutate({ mutation: WORKOUT_FINISH, variables: { workoutFinish: Date.now().toString() } });
  };

  finish = async () => {
    this.stop();
    this.props.addParam({ started: false, message: '' });
  };

  render() {
    const { elapsed } = this.state;

    return (
      <div className="timer">
        <div className="timer_time">
          <div className="center timer_time_numerals"> {elapsedTime(elapsed)}</div>
        </div>
        <button className="timer_btn btn" onClick={this.start}>
          {' '}
          {elapsed ? 'Continue' : 'Start '}
        </button>

        <button className="timer_btn btn" onClick={this.finish}>
          {' '}
          Finish{' '}
        </button>
      </div>
    );
  }
}

export default withApollo(
  connect(
    ({ params }) => ({ params }),
    { addParam }
  )(Timer)
);
