import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  dob: String,
  gender: String,
  fatherName: String,
  motherName: String,
  maritalStatus: String,
  aadhar: String,
  address: String,
  district: String,
  policeStation: String,
  state: String,
  pincode: String,

  edu10Board: String,
  edu10Percent: String,
  edu10Year: String,

  edu12Board: String,
  edu12Percent: String,
  edu12Year: String,

  gradBoard: String,
  gradPercent: String,
  gradYear: String,

  postGradBoard: String,
  postGradPercent: String,
  postGradYear: String,

  experience: String,
  resume: String,

  // ⭐ IMPORTANT FIELD
  jobRole: String,

  registrationId: String,
  status: { type: String, default: "Pending" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Registration", RegistrationSchema);
