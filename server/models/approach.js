import mongoose from 'mongoose';

const { Schema } = mongoose;

const ApproachSchema = new Schema({
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' },
  dateId: { type: Schema.Types.ObjectId, ref: 'Date' },
  value: String,
  approachNumber: Number,
  exerciseName: String,
  date: String,
  exerciseTime: Number,
  restTime: Number,
  timeFromStart: Number,
  weight: Number,
});

export default mongoose.model('Approach', ApproachSchema);
