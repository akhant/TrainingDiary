import React from 'react';
import { Query } from 'react-apollo';
import Exercise from './Exercise';
import { GET_DAY_DATA } from '../../../queries';

const ExerciseList = (props) => {
  const pickDate = props.pickDate._d.toDateString();
  /* <div className="no_exercises">
        <h2 className="no_exercises_h2">No exercises</h2>
      </div> */
  return (
    <Query query={GET_DAY_DATA} variables={{ date: pickDate }}>
      {({ data }) => {
        console.log('​ExerciseList -> data', data);
        if (data && data.getDayData) {
          return (
            <div className="ExerciseList">
              {data.getDayData.exercises.map(exercise => (
                <Exercise
                  dateId={exercise.dateId}
                  pickDate={pickDate}
                  key={exercise.exerciseId}
                  exercise={exercise}
                  approaches={data.getDayData.approaches}
                />
              ))}
            </div>
          );
        }
        return <div>Empty</div>
      }}
    </Query>
  );
};

export default ExerciseList;
