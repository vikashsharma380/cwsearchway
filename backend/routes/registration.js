import express from "express";
import Registration from "../models/Registration.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

// ensure uploads folder exists (important for deploy)
// path relative to backend root
const UPLOAD_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log("Created uploads directory:", UPLOAD_DIR);
}

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

// Optional: accept only images for signature and pdf/images for resume
const fileFilter = (req, file, cb) => {
  const name = file.fieldname; // "signature" or "resume"
  const ext = path.extname(file.originalname).toLowerCase();

  if (name === "signature") {
    // allow common images for signature
    if ([".png", ".jpg", ".jpeg", ".webp", ".svg"].includes(ext)) return cb(null, true);
    return cb(new Error("Signature must be an image (png/jpg/jpeg/webp/svg)"));
  }

  if (name === "resume") {
    // allow pdf or images for resume
    if ([".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg"].includes(ext)) return cb(null, true);
    return cb(new Error("Resume must be PDF/DOC/DOCX or image"));
  }

  // default allow
  cb(null, true);
};

// limits (example: 5MB per file)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// CREATE REGISTRATION
router.post(
  "/register",
  upload.fields([
    { name: "signature", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // debug logs to inspect incoming request (helpful for 500)
      console.log("=== /register called ===");
      console.log("req.body keys:", Object.keys(req.body));
      console.log("req.files keys:", req.files ? Object.keys(req.files) : "no files");
      if (req.files) {
        if (req.files.signature) console.log("signature file:", req.files.signature[0].filename);
        if (req.files.resume) console.log("resume file:", req.files.resume[0].filename);
      }

      const registrationId = "CW" + Date.now();

      const newReg = await Registration.create({
        ...req.body,
        registrationId,
        signature: req.files?.signature?.[0]?.filename || null,
        resume: req.files?.resume?.[0]?.filename || null,
        payment: req.body.utrNumber ? "Completed" : "Pending",
      });

      return res.json({ success: true, registrationId, data: newReg });
    } catch (error) {
      // log full error to server console for logs
      console.error("REGISTER ERROR:", error);
      // send back message but avoid leaking sensitive stack in production
      return res.status(500).json({ success: false, error: error.message || "Server error" });
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
