import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String, // plain text
});

export default mongoose.model("Admin", AdminSchema);
