import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  writer: { type: String, required: false, default: "not assigned" },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  payment: { type: Number, required: true },
  paid: { type: Number, required: false, default: 0 },
  status: { type: String, required: false, default: "open" },
  employer: { type: String, required: false, default: "none" },
});

const Task = mongoose.models.task || mongoose.model("task", taskSchema);
export default Task;
