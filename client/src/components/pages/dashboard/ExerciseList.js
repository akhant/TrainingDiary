import React, { Fragment } from 'react';
import Exercise from './Exercise';

const ExerciseList = (props) => {
  const { exercises } = props.getDayData;
  return (
    <Fragment>
      {exercises.length ? (
        <div className="exercise-list">
          {exercises.map(exercise => (
            <Exercise key={exercise.exerciseId} exercise={exercise} {...props} />
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
