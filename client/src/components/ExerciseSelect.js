import React, { Component } from "react";
import { exerciseList } from "constants";

export class ExerciseSelect extends Component {
  state = {
    selectedExercise: " "
  };

  componentDidMount = () => {
    this.setState({
      selectedExercise: this.props.exerciseName
    });
  };

  selectOnChange = e => {
    this.setState({
      selectedExercise: e.target.value
    });
    this.props.changeSelect(e.target.value);
  };

  optionsList = () => {
    const list = [];
    for (let i = 0; i < exerciseList.length; i++) {
      list.push(
        <option key={i} value={exerciseList[i].exerciseName}>
          {exerciseList[i].exerciseName}
        </option>
      );
    }
    return list;
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

export default ExerciseSelect;
