import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon } from 'semantic-ui-react';
import ChangeExerciseForm from './ChangeExerciseForm';

class ElementOfList extends Component {
  static propTypes = {
    exercise: PropTypes.object.isRequired,
  };

  render() {
    const { exercise, index, activeIndex, refetchGetList } = this.props;
    return (
      <div className="ElementOfList">
        <Accordion.Title
          active={activeIndex === index}
          index={index}
          onClick={() => this.props.handleClick(index)}
        >
          <Icon name="dropdown" />
          {exercise.exerciseName}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
         
          <ChangeExerciseForm
            refetchGetList={refetchGetList}
            exercise={exercise}
            changeActiveIndex={this.props.handleClick}
          />
        </Accordion.Content>
      </div>
    );
  }
}

export default ElementOfList;
