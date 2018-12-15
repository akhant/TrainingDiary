import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ExerciseSelect extends Component {
  state = {
    selectedExercise: ' ',
  };

  componentDidMount = () => {
    this.setState({
      selectedExercise: this.props.exerciseName,
    });
  };

  selectOnChange = e => {
    this.setState({
      selectedExercise: e.target.value,
    });
    this.props.changeSelect(e.target.value);
  };

  optionsList = () => {
    const { listOfExercises } = this.props;
    if (listOfExercises) {
      const list = [];
      for (let i = 0; i < listOfExercises.length; i++) {
        list.push(
          <option key={i} value={listOfExercises[i].exerciseName}>
            {listOfExercises[i].exerciseName}
          </option>
        );
      }
      return list;
    }
  };

  render() {
    return (
      <div>
        <select
          onChange={this.selectOnChange}
          value={this.state.selectedExercise}
          className="exercise__select custom_select"
        >
          {this.optionsList()}
        </select>
      </div>
    );
  }
}

export default connect(({ listOfExercises }) => ({ listOfExercises }))(
  ExerciseSelect
);
