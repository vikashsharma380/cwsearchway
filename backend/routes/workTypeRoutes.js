import express from "express";
import WorkType from "../models/WorkType.js";

const router = express.Router();

// Get all work types
router.get("/", async (req, res) => {
  const items = await WorkType.find();
  res.json({ success: true, data: items });
});

// Add new work type
router.post("/", async (req, res) => {
  const { name } = req.body;
  const newItem = await WorkType.create({ name });
  res.json({ success: true, data: newItem });
});

// Delete a work type
router.delete("/:id", async (req, res) => {
  await WorkType.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
