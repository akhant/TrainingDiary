import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApproachList from './ApproachList';
import ExerciseSelect from './ExerciseSelect';
import { changeExerciseNameValue } from '../../../AC';
import { Mutation } from 'react-apollo';
import { REMOVE_EXERCISE } from '../../../queries';

export class Exercise extends Component {
  state = {
    exerciseId: this.props.exercise.exerciseId,
  };

  handleRemoveExercise = async (removeExercise, refetchGetDayData) => {
    await removeExercise();
    await refetchGetDayData();
  };

  handleChangeExerciseNameValue = e => {
    this.props.changeExerciseNameValue(e, this.props.exercise.exerciseId);
  };

  render() {
    const { exercise } = this.props;

    return (
      <Mutation
        mutation={REMOVE_EXERCISE}
        variables={{ exerciseId: exercise.exerciseId }}
      >
        {removeExercise => (
          <div className="Exercise">
            <ExerciseSelect
              changeSelect={this.handleChangeExerciseNameValue}
              exerciseName={exercise.exerciseName}
              list={this.props.list}
            />
            <div>
              <ApproachList
                exercise={exercise}
                approaches={this.props.approaches}
              />
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() =>
                this.handleRemoveExercise(
                  removeExercise,
                  this.props.refetchGetDayData
                )
              }
              className="deleteExercise_btn"
            >
              {' '}
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default connect(
  null,
  { changeExerciseNameValue }
)(Exercise);
