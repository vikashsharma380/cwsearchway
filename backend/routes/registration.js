import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

// CREATE REGISTRATION
router.post("/register", async (req, res) => {
  try {
    const registrationId = "CW" + Date.now();

    const newReg = await Registration.create({
      ...req.body,
      registrationId,
    });

    res.json({ success: true, registrationId, data: newReg });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

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
