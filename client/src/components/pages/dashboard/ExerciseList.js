import React, { Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import Exercise from './Exercise';

const ExerciseList = (props) => {
  const { exercises } = props.getDayData;
  return (
    <Fragment>
      {exercises.length ? (
        <div className="exercise-list">
          {exercises.map(exercise => (
            <CSSTransition in apear classNames="fade" timeout={5000}>
              {state => <Exercise key={exercise.exerciseId} exercise={exercise} {...props} />}
            </CSSTransition>
          ))}
        </div>
      ) : (
        <div className="no-exercises">
          <h2 className="no-exercises_h2">No exercises</h2>
        </div>
      )}
    </Fragment>
  );
};

export default ExerciseList;
