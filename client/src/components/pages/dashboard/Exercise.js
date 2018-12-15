import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApproachList from './ApproachList';
import ExerciseSelect from './ExerciseSelect';
import { deleteExercise, changeExerciseNameValue } from '../../../AC';

export class Exercise extends Component {
  state = {
    id: this.props.exercise._id,
  };

  handleDeleteExercise = () => {
    this.props.deleteExercise(this.props.pickDate, this.state.id);
  };

  handleChangeExerciseNameValue = e => {
    this.props.changeExerciseNameValue(e, this.props.exercise._id);
  };

  render() {
    const { exercise } = this.props;

    return (
      <div className="Exercise">
        <ExerciseSelect
          changeSelect={this.handleChangeExerciseNameValue}
          exerciseName={exercise.exerciseName}
        />
        <div>
          <ApproachList exercise={exercise} />
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={this.handleDeleteExercise}
          className="deleteExercise_btn"
        >
          {' '}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteExercise, changeExerciseNameValue }
)(Exercise);
