import mongoose from 'mongoose';

const { Schema } = mongoose;

const ExerciseSchema = new Schema({
  dateId: { type: Schema.Types.ObjectId, ref: 'Date' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  exerciseName: String,
});

export default mongoose.model('Exercise', ExerciseSchema);
