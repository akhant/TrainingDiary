import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StatisticSchema = new Schema({
  dateId: { type: Schema.Types.ObjectId, ref: "Date" },
  exerciseId: { type: Schema.Types.ObjectId, ref: "Exercise" },
  approachId: { type: Schema.Types.ObjectId, ref: "Approach" },
  date: String,
  workoutStart: Number,
  workoutFinish: Number,
  workoutTime: Number,
  });

export default mongoose.model("Statistic", StatisticSchema);
