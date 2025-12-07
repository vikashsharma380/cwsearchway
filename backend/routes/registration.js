import express from "express";
import Registration from "../models/Registration.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const router = express.Router();

// Multer temp folder
const upload = multer({ dest: "temp/" });

// CREATE REGISTRATION
router.post(
  "/register",
  upload.fields([
    { name: "signature", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("Files received:", req.files);

      let signatureUrl = null;
      let resumeUrl = null;

      // 👉 Signature Upload (IMAGE)
      if (req.files.signature) {
        const sig = await cloudinary.uploader.upload(
          req.files.signature[0].path,
          {
            folder: "cwsearchway_uploads/signatures",
            resource_type: "image",
          }
        );
        signatureUrl = sig.secure_url;
      }

      // 👉 Resume Upload (PDF/DOC = RAW)
     // RESUME UPLOAD (PDF = RAW)
if (req.files.resume) {
  const resume = await cloudinary.uploader.upload(
    req.files.resume[0].path,
    {
      folder: "cwsearchway_uploads/resumes",
      resource_type: "auto",
      format: "pdf"   // FIX
    }
  );

  resumeUrl =
    resume.secure_url ||
    `https://res.cloudinary.com/${cloudinary.config().cloud_name}/raw/upload/${resume.public_id}.pdf`;
}


      // generate unique ID
      const registrationId = "CW" + Date.now();

      // Save DB
      const newReg = await Registration.create({
        ...req.body,
        registrationId,
        signature: signatureUrl,
        resume: resumeUrl,
        payment: req.body.utrNumber ? "Completed" : "Pending",
      });

      // Delete temp files
      if (req.files.signature)
        fs.unlinkSync(req.files.signature[0].path);
      if (req.files.resume)
        fs.unlinkSync(req.files.resume[0].path);

      return res.json({ success: true, registrationId, data: newReg });
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

export default router;
