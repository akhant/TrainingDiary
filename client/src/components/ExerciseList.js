import React from "react";
import Exercise from "./Exercise";

const ExerciseList = props => {
  let ex = [];
  props.exercises.map(exercise => {
    if (exercise.date === props.pickDate._d.toDateString()) {
      ex.push(exercise);
    }
  });
  console.log(+props.pickDate._d, +Date.now())
  if (!ex.length) {
    return (
      <div className="no_exercises">
        <h2 className="no_exercises_h2">
          В этот день нет упражнений
        </h2>
      </div>
    );
  }

  return (
    <div className="ExerciseList">
      {ex.map(exercise => {
        return (
          <Exercise
            dateId={exercise.dateId}
            pickDate={props.pickDate}
            key={exercise._id}
            exercise={exercise}
          />
        );
      })}
    </div>
  );
};

export default ExerciseList;
