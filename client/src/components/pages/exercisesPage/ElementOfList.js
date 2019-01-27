import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import ChangeExerciseForm from './ChangeExerciseForm';

const ElementOfList = ({
  handleClick, exercise, index, activeIndex, refetchGetList,
}) => (
  <div className="ElementOfList">
    <Accordion.Title active={activeIndex === index} index={index} onClick={() => handleClick(index)}>
      <Icon name="dropdown" />
      {exercise.exerciseName}
    </Accordion.Title>
    <Accordion.Content active={activeIndex === index}>
      <ChangeExerciseForm exercise={exercise} changeActiveIndex={handleClick} />
    </Accordion.Content>
  </div>
);

export default ElementOfList;
