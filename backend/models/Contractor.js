const { Schema } = require("mongoose");
const contractorConn = require("../db/contractorConn");

const ContractorSchema = new Schema(
  {
    contractorName: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    maritalStatus: {
      type: String,
      enum: ["single", "married", "widow", "divorced"],
      required: true,
    },

    spouseName: {
      type: String,
      trim: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    aadhaarCard: {
      type: String,
      required: true,
      trim: true,
    },

    panCard: {
      type: String,
      trim: true,
    },

    identificationMark: {
      type: String,
      trim: true,
    },

    permanentAddress: {
      type: String,
      required: true,
      trim: true,
    },

    educationQualification: {
      type: String,
      trim: true,
    },

    experienceDetails: {
      type: String,
      trim: true,
    },

    workType: {
      type: String, // electrical, civil, labour, etc.
      required: true,
      trim: true,
    },

    signature: {
      type: String, // Base64 string OR file URL
      trim: true,
    },

    utrNumber: {
      type: String,
      trim: true,
    },

    registrationId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = contractorConn.model("Contractor", ContractorSchema);
