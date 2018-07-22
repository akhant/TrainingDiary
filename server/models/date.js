import mongoose from "mongoose";

const { Schema } = mongoose;

const DateSchema = new Schema({
  date: String
});

export default mongoose.model("Date", DateSchema);
