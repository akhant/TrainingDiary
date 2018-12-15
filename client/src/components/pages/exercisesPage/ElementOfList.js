import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon } from 'semantic-ui-react';
import ChangeExerciseForm from './ChangeExerciseForm';

class ElementOfList extends Component {
  static propTypes = {
    exercise: PropTypes.object.isRequired,
  };

  render() {
    const { exercise, activeIndex } = this.props;
    return (
      <div className="ElementOfList">
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          {exercise.exerciseName}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <button className="btn">Remove exercise</button>
          <ChangeExerciseForm />
        </Accordion.Content>
      </div>
    );
  }
}

export default ElementOfList;
