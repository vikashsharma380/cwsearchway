import mongoose from "mongoose";

const WorkTypeSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

export default mongoose.model("WorkType", WorkTypeSchema);
