import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Icon } from 'semantic-ui-react';
import { CHANGE_SELECT_EXERCISE_NAME } from '../../../queries';

class ExerciseSelect extends Component {
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
    this.props.refetchGetDayData();
  };

  optionsList = () => {
    const {
      getDayData: { list },
    } = this.props;
    const renderList = [];
    renderList.push(
      <option key={0} value='Choose exercise'>
        choose exercise
      </option>
    );
    for (let i = 0; i < list.length; i++) {
      renderList.push(
        <option
          className='custom-select__option'
          key={i + 1}
          value={list[i].exerciseName}
        >
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
          <div className='custom-select__wrapper'>
            <select
              onChange={(e) => this.onChangeSelect(e, changeSelectExerciseName)}
              value={this.state.selectedExercise}
              className='exercise__select custom-select_padding'
            >
              {this.optionsList()}
            </select>
            <Icon className='custom-select__icon' name='caret down' />
          </div>
        )}
      </Mutation>
    );
  }
}

export default ExerciseSelect;
