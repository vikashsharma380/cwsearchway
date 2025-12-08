import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  employeeName: String,
  dob: String,
  gender: String,
  fatherName: String,
  motherName: String,
  spouseName: String,

  phone: String , 
  email: String,

  aadhar: String,
  panCard: String,
  identificationMark: String,
  maritalStatus: String,

  permanentAddress: String,
 

  eduQualification: String,
  additionalQualification: String,
  experienceDetails: String,
  workPreference: String,

  utrNumber: String,
  signature: String,
  resume: String,

  payment: { type: String, default: "Pending" },

  registrationId: String,
  status: { type: String, default: "Pending" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Registration", RegistrationSchema);
