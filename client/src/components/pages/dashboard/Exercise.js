import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Icon } from 'semantic-ui-react';
import ApproachList from './ApproachList';
import ExerciseSelect from './ExerciseSelect';
import { REMOVE_EXERCISE, GET_DAY_DATA } from '../../../queries';

class Exercise extends Component {
  state = {
    exerciseId: this.props.exercise.exerciseId,
    hover: false,
  };

  handleRemoveExercise = async (removeExercise) => {
    await removeExercise();
    /* this.props.refetchGetDayData(); */
  };

  handleHover = (arg) => {
    this.setState({ hover: arg });
  };

  render() {
    const { exercise } = this.props;
    const { hover } = this.state;
    return (
      <Mutation
        mutation={REMOVE_EXERCISE}
        variables={{ exerciseId: exercise.exerciseId }}
        refetchQueries={[{ query: GET_DAY_DATA, variables: { date: new Date().toDateString() } }]}
      >
        {removeExercise => (
          <div
            onMouseEnter={() => this.handleHover(true)}
            onMouseLeave={() => this.handleHover(false)}
            className="exercise"
          >
            <ExerciseSelect {...this.props} />
            <div>
              <ApproachList hover={hover} {...this.props} />
            </div>
            {hover && (
              <div
                role="button"
                tabIndex={0}
                onClick={() => this.handleRemoveExercise(removeExercise)}
                className="exercise__btn_delete"
              >
                <Icon size="mini" name="trash alternate" />
              </div>
            )}
          </div>
        )}
      </Mutation>
    );
  }
}

export default Exercise;
