import React, { Fragment } from 'react';
import Exercise from './Exercise';

const ExerciseList = (props) => {
  const { exercises } = props.getDayData;
  const currentExercise = exercises.length && exercises[exercises.length - 1];
  return (
    <Fragment>
      {exercises.length ? (
        <div className='exercise-list'>
          <div className='current-exercise'>
            <Exercise
              key={currentExercise.exerciseId}
              exercise={currentExercise}
              {...props}
            />
          </div>
          <div className='previous-exercises'>
            {exercises.slice(0, -1).map((exercise) => (
              <Exercise
                key={exercise.exerciseId}
                exercise={exercise}
                {...props}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='no-exercises'>
          <h2 className='no-exercises_h2'>No exercises</h2>
        </div>
      )}
    </Fragment>
  );
};

export default ExerciseList;
