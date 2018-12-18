import mongoose from 'mongoose';

const { Schema } = mongoose;

const StatisticSchema = new Schema({
  dateId: { type: Schema.Types.ObjectId, ref: 'Date' },
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' },
  approachId: { type: Schema.Types.ObjectId, ref: 'Approach' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  date: String,
  workoutStart: Number,
  workoutFinish: Number,
  workoutTime: Number,
});

export default mongoose.model('Statistic', StatisticSchema);
