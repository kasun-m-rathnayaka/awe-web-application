import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
