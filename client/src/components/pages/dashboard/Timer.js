import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { addParam } from '../../../AC';
import { elapsedTime } from '../../../helpers';
import { WORKOUT_START, WORKOUT_FINISH } from '../../../queries';

class Timer extends Component {
  state = {
    start: this.props.statistic
      ? this.props.statistic.workoutStart
      : Date.now(),
    elapsed:
      this.props.statistic && !this.props.params.started
        ? Math.ceil(this.props.statistic.workoutTime / 1000)
        : 0,
    timerOpacity: 0,
  };

  componentWillUnmount = () => {
    this.stop();
  };

  tick = () => {
    const { start } = this.state;

    this.setState({ elapsed: Math.round((Date.now() - start) / 1000) });
  };

  componentDidMount = () => {
    const { started } = this.props.params;
    this.setState({ timerOpacity: 1 });
    if (started) {
      this.continue();
    }
  };

  continue = () => {
    this.timer = setInterval(this.tick, 1000);
    this.props.addParam({ started: true, message: '' });
  };

  start = async () => {
    const {
      params: { started },
      client,
      statistic,
    } = this.props;
    const { elapsed } = this.state;

    if (started) return null;
    this.setState({ start: statistic ? statistic.workoutStart : Date.now() });
    this.continue();
    // send start time to server only first time
    if (!elapsed) {
      await client.mutate({
        mutation: WORKOUT_START,
        variables: { workoutStart: Date.now().toString() },
      });
    }
  };

  stop = async () => {
    const { started } = this.props.params;

    if (!started) return null;

    // send finish time to server
    clearInterval(this.timer);
    await this.props.client.mutate({
      mutation: WORKOUT_FINISH,
      variables: { workoutFinish: Date.now().toString() },
    });
  };

  finish = async () => {
    this.stop();
    this.props.addParam({ started: false, message: '' });
  };

  render() {
    const { elapsed, timerOpacity } = this.state;
    return (
      <div className='timer'>
        <button
          className='timer__btn timer__btn_start btn'
          onClick={this.start}
        >
          {' '}
          {'Start'}
        </button>

        <div className='timer__time'>
          <div
            className='timer__time_numerals'
            style={{ opacity: timerOpacity, transitionDelay: '1s' }}
          >
            {elapsedTime(elapsed)}
          </div>
        </div>

        <button
          className='timer__btn timer__btn_finish btn'
          onClick={this.finish}
        >
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
