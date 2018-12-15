import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Approach extends Component {
  state = {
    approachValue: '',
    finishApproach: 0,
  };
  componentDidMount = () => {
    this.setState({
      approachValue: this.props.approach.value,
    });
  };

  handleChangeApproachValue = e => {
    // exercise finished

    // exercise Time
    this.exerciseTime = Date.now() - this.props.startApproach;

    this.setState(
      {
        approachValue: e.target.value,
        finishApproach: Date.now(),
      },
      () => {
        // save changes
        this.props.onChangeApproachValue(
          this.state.approachValue,
          this.props.approach._id,
          this.exerciseTime,
          this.props.restTime,
          this.state.finishApproach
        );
      }
    );
  };

  handleDeleteApproach = () => {
    this.props.onDeleteApproach(this.props.approach._id);
  };

  optionsList = () => {
    const list = [];
    for (let i = 0; i < 21; i++) {
      list.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return list;
  };

  render() {
    return (
      <div className="Approach">
        <select
          className="Approach__select custom_select"
          value={this.state.approachValue}
          onChange={this.handleChangeApproachValue}
        >
          {this.optionsList()}
        </select>
        <div
          role="button"
          tabIndex={0}
          className="deleteApproach_btn"
          onClick={this.handleDeleteApproach}
        >
          -
        </div>
      </div>
    );
  }
}

export default connect(({ statistic }) => ({
  statistic,
}))(Approach);
