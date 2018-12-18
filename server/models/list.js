import mongoose from 'mongoose';

const { Schema } = mongoose;

const ListOfExercisesSchema = new Schema({
  exerciseName: String,
  weightFrom: String,
  weightTo: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('List', ListOfExercisesSchema);
