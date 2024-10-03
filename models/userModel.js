import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userid: { type: String, required: false },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  nationalid: { type: String, required: true, unique: true },
  whatsappnumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyed: { type: Boolean, default: false },
  role: { type: String, default: "user" },
  forgotpasswordtocken: { type: String },
  forgotpasswordexpire: { type: Date },
  verifytoken: { type: String },
  projects: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      deadline: { type: Date, required: true },
      payment: { type: Number, required: true },
      paid: { type: Number, required: false, default: 0 },
      status: { type: String, required: false, default: "open" },
      employer: { type: String, required: false, default: "none" },
    },
  ],
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
