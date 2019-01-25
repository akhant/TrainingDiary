import mongoose from 'mongoose';

const { Schema } = mongoose;

const StatisticSchema = new Schema({
  dateId: String,
  exerciseId: String,
  approachId: String,
  userId: String,
  date: String,
  workoutStart: String,
  finishWorkout: String,
  workoutTime: String,
});

export default mongoose.model('Statistic', StatisticSchema);
