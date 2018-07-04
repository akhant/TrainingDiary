import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DateSchema = new Schema({
  date: String
});

export default mongoose.model("Date", DateSchema);
