import mongoose from 'mongoose';

const { Schema } = mongoose;

const ListOfExercises = new Schema({
  exerciseName: String,
  weight: Object,
});

export default mongoose.model('ListOfExercises', ListOfExercises);
