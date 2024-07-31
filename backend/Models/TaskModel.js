import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  deadline: {
    type: String,
  },
  priority: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model("Task", taskSchema);
