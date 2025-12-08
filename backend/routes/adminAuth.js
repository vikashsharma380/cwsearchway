import express from "express";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "CWSEARCHWAY_SECRET_KEY";

// LOGIN ADMIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin)
    return res.json({ success: false, message: "Admin not found" });

  if (password !== admin.password)
    return res.json({ success: false, message: "Incorrect password" });

  const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1d" });

  res.json({ success: true, token });
});

export default router;
