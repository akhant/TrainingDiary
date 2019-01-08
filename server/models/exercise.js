import mongoose from 'mongoose';

const { Schema } = mongoose;

const ExerciseSchema = new Schema({
  exerciseId: String,
  userId: String,
  exerciseName: { type: String, default: '' },
  date: String,
});

export default mongoose.model('Exercise', ExerciseSchema);
