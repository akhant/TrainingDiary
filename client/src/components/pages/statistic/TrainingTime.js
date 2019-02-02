import React from 'react';
import { elapsedTime } from '../../../helpers';

export default function TrainingTime({ workoutTime }) {
  return (
    <div className="training-time">
      <div className="training-time__inner">
        <div className="training-time__label">Time:</div>
        <div className="training-time__time">{elapsedTime(Math.ceil(workoutTime / 1000))}</div>
      </div>
    </div>
  );
}
