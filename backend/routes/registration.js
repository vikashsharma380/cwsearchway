import express from "express";
import Registration from "../models/Registration.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const router = express.Router();

// Multer MEMORY storage (NO TEMP FILES)
const upload = multer({ storage: multer.memoryStorage() });

// Cloudinary stream upload helper
const uploadToCloudinary = (buffer, folder, resource_type, public_id) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
        public_id,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// CREATE REGISTRATION
router.post(
  "/register",
  upload.fields([
    { name: "signature", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("FILES:", req.files);

      let signatureUrl = null;
      let resumeUrl = null;

      // SIGNATURE → IMAGE
      if (req.files.signature) {
        const sig = await uploadToCloudinary(
          req.files.signature[0].buffer,
          "cwsearchway_uploads/signatures",
          "image",
          `signature-${Date.now()}`
        );

        signatureUrl = sig.secure_url;
      }

      // RESUME → PDF/DOC = RAW
      if (req.files.resume) {
        const ext = req.files.resume[0].originalname.split(".").pop().toLowerCase();

        const resume = await uploadToCloudinary(
          req.files.resume[0].buffer,
          "cwsearchway_uploads/resumes",
          "raw", // IMPORTANT
          `resume-${Date.now()}`
        );

        resumeUrl = resume.secure_url;
      }

      const registrationId = "CW" + Date.now();

      const newReg = await Registration.create({
        ...req.body,
        registrationId,
        signature: signatureUrl,
        resume: resumeUrl,
        payment: req.body.utrNumber ? "Completed" : "Pending",
      });

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
