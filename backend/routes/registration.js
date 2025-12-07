import express from "express";
import Registration from "../models/Registration.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// CLOUDINARY STORAGE
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder = "cwsearchway_uploads";

    // Signature only images
    if (file.fieldname === "signature") {
      return {
        folder,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: `signature-${Date.now()}`,
      };
    }

    // Resume can be pdf or images
    if (file.fieldname === "resume") {
      return {
        folder,
        allowed_formats: ["pdf", "jpg", "jpeg", "png", "webp"],
        public_id: `resume-${Date.now()}`,
      };
    }

    return { folder };
  },
});

const upload = multer({ storage });

// CREATE REGISTRATION
router.post(
  "/register",
  upload.fields([
    { name: "signature", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("Files uploaded:", req.files);

      const registrationId = "CW" + Date.now();

      const newReg = await Registration.create({
        ...req.body,
        registrationId,
        signature: req.files?.signature?.[0]?.path || null,  // URL from Cloudinary
        resume: req.files?.resume?.[0]?.path || null,        // URL from Cloudinary
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
