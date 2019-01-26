import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import ApproachList from './ApproachList';
import ExerciseSelect from './ExerciseSelect';
import { REMOVE_EXERCISE } from '../../../queries';

class Exercise extends Component {
  state = {
    exerciseId: this.props.exercise.exerciseId,
  };

  handleRemoveExercise = async (removeExercise) => {
    await removeExercise();
    this.props.refetchGetDayData();
  };

  render() {
    const { exercise } = this.props;

    return (
      <Mutation mutation={REMOVE_EXERCISE} variables={{ exerciseId: exercise.exerciseId }}>
        {removeExercise => (
          <div className="exercise">
            <ExerciseSelect {...this.props} />
            <div>
              <ApproachList {...this.props} />
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => this.handleRemoveExercise(removeExercise)}
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

export default Exercise;
