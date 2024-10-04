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
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "projects" },
    },
  ],
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
