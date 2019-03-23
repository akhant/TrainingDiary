import mongoose from 'mongoose';

const { Schema } = mongoose;

const ListOfExercisesSchema = new Schema({
  exerciseName: String,
  weightFrom: String,
  weightTo: String,
  userId: String,
  exerciseDescriptionId: String,
});

export default mongoose.model('List', ListOfExercisesSchema);
