import React from 'react';
import { elapsedTime } from '../../../helpers';

export default function TrainingTime({ workoutTime }) {
  return (
    <div className="training_time">
      <span>Training time:</span>
      <span>{elapsedTime(Math.ceil(workoutTime / 1000))}</span>
    </div>
  );
}
