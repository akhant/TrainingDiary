import React, { Fragment } from 'react';
import Exercise from './Exercise';

const ExerciseList = (props) => {
  const { exercises } = props.getDayData;
  return (
    <Fragment>
      {exercises.length ? (
        <div className="exercise_list">
          {exercises.map(exercise => (
            <Exercise key={exercise.exerciseId} exercise={exercise} {...props} />
          ))}
        </div>
      ) : (
        <div className="no_exercises">
          <h2 className="no_exercises_h2">No exercises</h2>
        </div>
      )}
    </Fragment>
  );
};

export default ExerciseList;
