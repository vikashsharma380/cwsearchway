import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

// GET all registrations
router.get("/all", async (req, res) => {
  try {
    const data = await Registration.find().sort({ timestamp: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// UPDATE status (Accept/Reject)
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    await Registration.findByIdAndUpdate(req.params.id, {
      status: status,
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// DELETE user
router.delete("/delete/:id", async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// UPDATE full user details
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body, // All editable fields accepted
      { new: true }
    );

    res.json({ success: true, updated });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});
export default router;