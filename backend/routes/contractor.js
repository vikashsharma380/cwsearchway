import express from "express";
import Contractor from "../models/Contractor.js";

const router = express.Router();

// REGISTER CONTRACTOR
router.post("/register", async (req, res) => {
  try {
    console.log("RECEIVED BODY:", req.body);

    const registrationId = "CWCON" + Date.now();

    const payload = {
      ...req.body,

      // FIX 1: phone → mobile
      mobile: req.body.phone,

      // FIX 2: gender lowercase
      gender: req.body.gender?.toLowerCase(),

      // FIX 3: workTypeOther support
      workTypeOther: req.body.workTypeOther || null,

      registrationId,
      status: req.body.utrNumber ? "approved" : "pending",
    };

    const saved = await Contractor.create(payload);

    return res.json({
      success: true,
      registrationId,
      data: saved,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// CHECK STATUS
router.get("/status/:id", async (req, res) => {
  try {
    const data = await Contractor.findOne({ registrationId: req.params.id });

    if (!data)
      return res.json({ success: false, message: "No record found!" });

    res.json({ success: true, data });
  } catch (error) {
    console.error("STATUS ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// FIND REGISTRATION ID
router.post("/find-id", async (req, res) => {
  try {
    const { contractorName, mobile, email, dob } = req.body;

    if (!contractorName || !mobile || !email || !dob) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const user = await Contractor.findOne({
      contractorName: { $regex: new RegExp("^" + contractorName + "$", "i") },
      mobile,
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
