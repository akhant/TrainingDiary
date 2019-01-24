import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

class Weight extends Component {
  state = {
    weight: this.props.weight,
  };
  handleChangeWeightValue = e => {
    e.preventDefault();
    this.setState({
      weight: e.target.value,
    });
    this.props.onChangeWeight(e.target.value);
  };

  optionsList = () => {
    const exercise = _.find(
      this.props.list,
      e => this.props.exercise.exerciseName === e.exerciseName
    );

    const renderList = [];
    renderList.push(
      <option key={0} value="Choose weight">
        Choose weight
      </option>
    );
    if (exercise) {
      for (let i = exercise.weightTo; i > exercise.weightFrom; i--) {
        renderList.push(
          <option key={i + 1} value={i}>
            {i}
          </option>
        );
      }
      return renderList;
    }
  };

  render() {
    return (
      <div className="weight">
        <span className="weight_header">Вес: </span>
        <select
          className="weight__select custom_select"
          value={this.state.weight}
          onChange={this.handleChangeWeightValue}
        >
          {this.optionsList()}
        </select>
      </div>
    );
  }
}

Weight.propTypes = {
  onChangeWeight: PropTypes.func,
};

export default connect(({ listOfExercises }) => ({ listOfExercises }))(Weight);
