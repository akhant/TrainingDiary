import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { workoutStart, showMessage, workoutFinish } from "../AC";
import elapsedTime from "../helpers";

// TODO: fix timer
class Timer extends Component {
  state = {
    start: "",
    elapsed: 0
  };

  componentDidUpdate = () => {
    if (this.checkStat()) {
      const { workoutTime } = this.checkStat();
      if (!this.started && this.state.elapsed !== workoutTime) {
        this.setState({
          elapsed: workoutTime
        });
      }
    } else if (this.state.elapsed) {
      this.setState({
        elapsed: 0
      });
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
    this.finishSport();
  };

  // есть ли выбранный день в statistic
  checkStat = () =>
    _.find(this.props.statistic, {
      date: this.props.pickDate._d.toDateString()
    });

  tick = () => {
    this.setState({
      elapsed: Math.ceil((Date.now() - this.state.start) / 1000)
    });
  };

  startSport = () => {
    if (this.started) return null;
    const savedTime = this.checkStat()
      ? this.checkStat().workoutTime * 1000
      : 0;

    this.setState(
      {
        start: Date.now() - savedTime
      },
      () => {
        this.timer = setInterval(this.tick, 1000);
        this.props.workoutStart(this.props.pickDate, Date.now());
        this.started = 1;
        this.props.showMessage({ message: "", started: this.started });
      }
    );
  };

  finishSport = () => {
    if (!this.started) return null;

    const savedTime = this.checkStat().workoutTime
      ? this.checkStat().workoutTime * 1000
      : 0;
    clearInterval(this.timer);
    this.props.workoutFinish(this.props.pickDate, Date.now() + savedTime);
    this.started = 0;
    this.props.showMessage({ message: "", started: this.started });
  };

  render() {
    return (
      <div className="timer">
        <div className="timer_time">
          <div className="center timer_time_numerals">
            {" "}
            {elapsedTime(this.state.elapsed)}
          </div>
        </div>
        <button className="timer_btn btn" onClick={this.startSport}>
          {" "}
          {this.state.elapsed ? "Продолжить" : "начать "}
        </button>
        <button className="timer_btn btn" onClick={this.finishSport}>
          {" "}
          Закончить{" "}
        </button>
      </div>
    );
  }
}

export default connect(
  ({ statistic }) => ({ statistic }),
  { workoutStart, showMessage, workoutFinish }
)(Timer);
