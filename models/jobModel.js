import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  payment: { type: Number, required: true },
  status: { type: String, required: true },
  employer: { type: String, required: true },
});

const Job = mongoose.models.job || mongoose.model("job", jobSchema);
export default Job;
