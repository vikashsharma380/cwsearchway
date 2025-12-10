import express from "express";
import Registration from "../models/Registration.js";
import { upload } from "../upload.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "signature", maxCount: 1 },
    { name: "resume", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      console.log("BODY RECEIVED:", req.body);
      console.log("FILES RECEIVED:", req.files);

      const registrationId =
        "CWEMP" +
        new Date().getFullYear().toString().slice(-2) +
        Math.floor(1000 + Math.random() * 9000);

      // Upload files to S3
     const signatureUrl = req.files?.signature?.[0]?.location || "";
const resumeUrl = req.files?.resume?.[0]?.location || "";

      // Save DB Entry
      const newReg = await Registration.create({
        ...req.body,
        registrationId,
        signature: signatureUrl,
        resume: resumeUrl,
        payment: req.body.utrNumber ? "Completed" : "Pending",
      });

      return res.json({
        success: true,
        registrationId,
        data: newReg,
      });

    } catch (error) {
      console.error("REGISTER ERROR:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }
);



// CHECK STATUS
router.get("/status/:id", async (req, res) => {
  try {
    const data = await Registration.findOne({
      registrationId: req.params.id,
    });

    if (!data) return res.json({ success: false, message: "Not Found" });

    res.json({ success: true, data });
  } catch (error) {
    console.error("STATUS ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// FIND REGISTRATION ID
router.post("/find-id", async (req, res) => {
  try {
    const { employeeName, phone, email, dob } = req.body;

    if (!employeeName || !phone || !email || !dob) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const user = await Registration.findOne({
      employeeName: { $regex: new RegExp("^" + employeeName + "$", "i") },
      phone,
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
