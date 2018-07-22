import mongoose from "mongoose";

const { Schema } = mongoose;

const ExerciseSchema = new Schema({
  approachId: { type: Schema.Types.ObjectId, ref: "Date" },
  exerciseName: String,
  date: String
});

export default mongoose.model("Exercise", ExerciseSchema);
