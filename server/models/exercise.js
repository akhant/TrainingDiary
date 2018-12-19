import mongoose from 'mongoose';

const { Schema } = mongoose;

const ExerciseSchema = new Schema({
  dateId: String,
  userId: String,
  exerciseName: String,
});

export default mongoose.model('Exercise', ExerciseSchema);
