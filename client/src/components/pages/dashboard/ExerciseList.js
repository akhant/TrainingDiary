import React from 'react';
import Exercise from './Exercise';

const ExerciseList = (props) => {
  const ex = [];
  props.exercises.map((exercise) => {
    if (exercise.date === props.pickDate._d.toDateString()) {
      ex.push(exercise);
    }
  });

  if (!ex.length) {
    return (
      <div className="no_exercises">
        <h2 className="no_exercises_h2">No exercises</h2>
      </div>
    );
  }

  return (
    <div className="ExerciseList">
      {ex.map(exercise => (
        <Exercise
          dateId={exercise.dateId}
          pickDate={props.pickDate}
          key={exercise._id}
          exercise={exercise}
        />
      ))}
    </div>
  );
};

export default ExerciseList;
