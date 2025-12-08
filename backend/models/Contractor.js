const { Schema } = require("mongoose");
const contractorConn = require("../db/contractorConn");

const ContractorSchema = new Schema(
  {
    contractorName: { type: String, required: true, trim: true },

    dob: { type: String, required: true },

    gender: { type: String, required: true }, // frontend se Male/Female aayega, backend me convert karenge

    maritalStatus: { type: String, required: true },

    spouseName: { type: String, trim: true },

    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },

    mobile: { type: String, required: true, trim: true },   // FIXED for frontend (phone → mobile)

    email: { type: String, trim: true, lowercase: true },

    aadhaarCard: { type: String, required: true },
    panCard: { type: String },

    identificationMark: { type: String },

    permanentAddress: { type: String, required: true },

    educationQualification: { type: String },
    experienceDetails: { type: String },

    workType: { type: String, required: true }, // "Other" + workTypeOther supported
    workTypeOther: { type: String },

    paymentType: { type: String }, // 999 / 1499

    utrNumber: { type: String },

    signature: { type: String },

    registrationId: {
      type: String,
      unique: true,
      required: true,
    },

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

module.exports = contractorConn.model("Contractor", ContractorSchema);
