import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

// CREATE REGISTRATION (UploadThing Version)
router.post("/register", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const registrationId = "CW" + Date.now();

    const newReg = await Registration.create({
  ...req.body,
  registrationId,
  signature: req.body.signature || null,
  resume: req.body.resume || null,
  payment: req.body.utrNumber ? "Completed" : "Pending",
});


    return res.json({ success: true, registrationId, data: newReg });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ success: false, error: error.message });
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
    console.error("STATUS ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
