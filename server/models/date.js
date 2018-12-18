import mongoose from 'mongoose';

const { Schema } = mongoose;

const DateSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  date: String,
});

export default mongoose.model('Date', DateSchema);
