import express from "express";
import Contractor from "../models/Contractor.js";
import upload from "../multer.js";        // multer for multipart form-data
import { uploadFile } from "../upload.js"; // AWS S3 uploader

const router = express.Router();

// REGISTER CONTRACTOR (WITH SIGNATURE UPLOAD)
router.post(
  "/register",
  upload.fields([
    { name: "signature", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      console.log("BODY RECEIVED:", req.body);
      console.log("FILES RECEIVED:", req.files);

      const registrationId =
        "CWCON" +
        new Date().getFullYear().toString().slice(-2) +
        Math.floor(1000 + Math.random() * 9000);

      // UPLOAD SIGNATURE TO S3
      let signatureUrl = "";

      if (req.files?.signature?.[0]) {
        signatureUrl = (await uploadFile(req.files.signature[0])).Location;
      }

      // BUILD PAYLOAD
      const payload = {
        ...req.body,

        mobile: req.body.phone,
        gender: req.body.gender?.toLowerCase(),
        workTypeOther: req.body.workTypeOther || null,

        signature: signatureUrl,
        registrationId,
        status: req.body.utrNumber ? "approved" : "pending",
      };

      const saved = await Contractor.create(payload);

      return res.json({
        success: true,
        registrationId,
        data: saved,
      });
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
);

// CHECK STATUS
router.get("/status/:id", async (req, res) => {
  try {
    const data = await Contractor.findOne({ registrationId: req.params.id });

    if (!data)
      return res.json({ success: false, message: "No record found!" });

    res.json({ success: true, data });
  } catch (error) {
    console.error("STATUS ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// FIND REGISTRATION ID
router.post("/find-id", async (req, res) => {
  try {
    const { contractorName, mobile, email, dob } = req.body;

    if (!contractorName || !mobile || !email || !dob) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const user = await Contractor.findOne({
      contractorName: { $regex: new RegExp("^" + contractorName + "$", "i") },
      mobile,
      email,
      dob,
    });

    if (!user) {
      return res.json({
        success: false,
        message: "No matching registration found!",
      });
    }

    return res.json({
      success: true,
      registrationId: user.registrationId,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

export default router;
