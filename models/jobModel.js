import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  writer: { type: String, required: true, default: "not assigned" },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  payment: { type: Number, required: true },
  status: { type: String, required: true, default: "open" },
  employer: { type: String, required: true, default: "none" },
});

const Job = mongoose.models.job || mongoose.model("job", jobSchema);
export default Job;
