import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ExerciseSelect extends Component {
  state = {
    selectedExercise: ' ',
    list: this.props.list,
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
    const { listOfExercises, list } = this.props;
    console.log('list', list);
    let trueList = listOfExercises.length ? listOfExercises : list;

    const renderList = [];
    for (let i = 0; i < trueList.length; i++) {
      renderList.push(
        <option key={i} value={trueList[i].exerciseName}>
          {trueList[i].exerciseName}
        </option>
      );
    }
    return renderList;
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
