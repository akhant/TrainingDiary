import mongoose from 'mongoose';

const { Schema } = mongoose;

const StatisticSchema = new Schema({
  dateId: String,
  exerciseId: String,
  approachId: String,
  userId: String,
  date: String,
  workoutStart: String,
  workoutFinish: String,
  workoutTime: { type: String, default: '0' },
});

export default mongoose.model('Statistic', StatisticSchema);
