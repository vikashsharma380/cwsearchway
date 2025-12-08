import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

// CREATE REGISTRATION (UploadThing Version)
router.post("/register", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const registrationId = "CWCON" + Date.now();

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
