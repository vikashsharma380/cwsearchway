import mongoose from "mongoose";
const { Schema } = mongoose;

const ContractorSchema = new Schema(
  {
    contractorName: { type: String, required: true, trim: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    spouseName: { type: String, trim: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },

    mobile: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },

    aadhaarCard: { type: String, required: true },
    panCard: { type: String },

    identificationMark: { type: String },
    permanentAddress: { type: String, required: true },

    educationQualification: { type: String },
    experienceDetails: { type: String },

    workType: { type: String, required: true },
    workTypeOther: { type: String },

    paymentType: { type: String },
    utrNumber: { type: String },

    signature: { type: String },

    registrationId: { type: String, unique: true, required: true },

    agree: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    remark: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Contractor", ContractorSchema);
