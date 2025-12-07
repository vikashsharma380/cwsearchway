import express from "express";
import Registration from "../models/Registration.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// CLOUDINARY STORAGE (FIXED)
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "cwsearchway_uploads";
    let format = file.originalname.split(".").pop().toLowerCase();
    let resource_type = "image"; // default

    // Signature = image only
    if (file.fieldname === "signature") {
      return {
        folder,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: `signature-${Date.now()}`,
        resource_type: "image",
      };
    }

    // Resume = pdf/doc/docx/image
    if (file.fieldname === "resume") {
      if (["pdf", "doc", "docx"].includes(format)) {
        resource_type = "raw"; // 👈 PDF fix
      }

      return {
        folder,
        allowed_formats: ["pdf", "doc", "docx", "jpg", "jpeg", "png", "webp"],
        public_id: `resume-${Date.now()}`,
        resource_type, // raw or image
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
      console.log("Uploaded Files:", req.files);

      const registrationId = "CW" + Date.now();

      const newReg = await Registration.create({
        ...req.body,
        registrationId,
        signature: req.files?.signature?.[0]?.path || null, 
        resume: req.files?.resume?.[0]?.path || null,       
        payment: req.body.utrNumber ? "Completed" : "Pending",
      });

      res.json({ success: true, registrationId, data: newReg });
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      res.status(500).json({ success: false, error: error.message });
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
