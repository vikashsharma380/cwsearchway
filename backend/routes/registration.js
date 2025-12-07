import express from "express";
import Registration from "../models/Registration.js";
import multer from "multer";

const router = express.Router();

// FILE UPLOAD STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
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
      const registrationId = "CW" + Date.now();

      const newReg = await Registration.create({
        ...req.body,
        registrationId,
        signature: req.files.signature
          ? req.files.signature[0].filename
          : null,
        resume: req.files.resume ? req.files.resume[0].filename : null,
        payment: req.body.utrNumber ? "Completed" : "Pending",
      });

      res.json({ success: true, registrationId, data: newReg });
    } catch (error) {
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
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
