import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { CHANGE_SELECT_EXERCISE_NAME } from '../../../queries';

export class ExerciseSelect extends Component {
  state = {
    selectedExercise: this.props.exercise.exerciseName || '',
    
  };


  componentDidMount = () => {
    this.setState({
      selectedExercise: this.props.exercise.exerciseName,
    });
  };

  onChangeSelect = async (e, changeSelectExerciseName) => {
    
    this.setState({
      selectedExercise: e.target.value,
    });
    await changeSelectExerciseName({
      variables: {
        exerciseId: this.props.exercise.exerciseId,
        exerciseName: e.target.value,
      },
    });
    this.props.refetchGetDayData()
    
  };

  optionsList = () => {
    const { getDayData: {list} } = this.props;
    const renderList = [];
    renderList.push(
      <option key={0} value="Choose exercise">
        Choose exercise
      </option>
    );
    for (let i = 0; i < list.length; i++) {
      renderList.push(
        <option key={i + 1} value={list[i].exerciseName}>
          {list[i].exerciseName}
        </option>
      );
    }
    return renderList;
  };

  render() {
    return (
      <Mutation mutation={CHANGE_SELECT_EXERCISE_NAME}>
        {(changeSelectExerciseName) => (
          <select
            onChange={e => this.onChangeSelect(e, changeSelectExerciseName)}
            value={this.state.selectedExercise}
            className="exercise__select custom_select"
          >
            {this.optionsList()}
          </select>
        )}
      </Mutation>
    );
  }
}

export default ExerciseSelect;
