import express from "express";
import Contractor from "../models/Contractor.js";

const router = express.Router();

// GET ALL CONTRACTORS
router.get("/all-contractors", async (req, res) => {
  try {
    const data = await Contractor.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// UPDATE STATUS + REMARK (ACCEPT / REJECT)
router.put("/update-status-contractor/:id", async (req, res) => {
  try {
    const { status, remark } = req.body;

    const updated = await Contractor.findByIdAndUpdate(
      req.params.id,
      {
        status: status,
        remark: remark || "",
      },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// DELETE CONTRACTOR
router.delete("/delete-contractor/:id", async (req, res) => {
  try {
    await Contractor.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// FULL UPDATE CONTRACTOR DETAILS
router.put("/update-contractor/:id", async (req, res) => {
  try {
    const updated = await Contractor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, updated });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

export default router;
