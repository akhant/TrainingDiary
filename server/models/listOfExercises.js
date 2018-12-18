import mongoose from 'mongoose';

const { Schema } = mongoose;

const ListOfExercisesSchema = new Schema({
  exerciseName: String,
  weight: Object,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('List', ListOfExercisesSchema);
