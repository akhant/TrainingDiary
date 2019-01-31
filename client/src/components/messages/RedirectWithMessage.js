import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import Delay from 'react-delay';
import { Redirect } from 'react-router-dom';

export default class RedirectWithMessage extends Component {
  state = {
    time: this.props.time || 5,
  };

  componentWillUnmount = () => clearInterval(this.timer);

  componentDidMount = () => {
    this.timeCounter();
  };

  tick = () => {
    this.setState({ time: this.state.time - 1 });
  };

  timeCounter = () => {
    this.timer = setInterval(this.tick, 1000);
    if (this.state.time === 0) clearInterval(this.timer);
  };

  render() {
    const { to, message } = this.props;
    const { time } = this.state;
    return (
      <div className="redirect-with-message">
        <Message style={{ fontSize: '30px' }} positive>
          {message}
        </Message>
        <h2> Redirect in {time} sec </h2>
        <Delay wait={time * 1000}>
          <Redirect to={`${to}`} />
        </Delay>
      </div>
    );
  }
}
