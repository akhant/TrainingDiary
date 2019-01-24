import mongoose from 'mongoose';

const { Schema } = mongoose;

const ApproachSchema = new Schema({
  userId: String,
  exerciseId: String,
  dateId: String,
  value: String,
  approachNumber: Number,
  exerciseName: String,
  date: String,
  exerciseTime: Number,
  restTime: Number,
  timeFromStart: Number,
  weight: Number,
  approachId: String,
});

export default mongoose.model('Approach', ApproachSchema);
