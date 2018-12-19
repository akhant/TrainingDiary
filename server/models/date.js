import mongoose from 'mongoose';

const { Schema } = mongoose;

const DateSchema = new Schema({
  userId: String,
  date: String,
});

export default mongoose.model('Date', DateSchema);
