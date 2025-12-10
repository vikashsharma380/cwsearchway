import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
import cors from "cors";
// ---------------- CORS FIX (CUSTOM) ----------------
app.use(cors());


// DO NOT USE cors() AT ALL → REMOVE IT

// app.use(cors());

app.use(express.json());

// ---------------- DB CONNECTION ----------------
mongoose
  .connect("mongodb+srv://cwsearchway_db_user:Cwsearchway2580@cluster0.jlkcpjq.mongodb.net/cwsearchway?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ---------------- ROUTES ----------------
import registrationRoutes from "./routes/registration.js";
app.use("/api/registration", registrationRoutes);

import adminRoutes from "./routes/admin.js";
app.use("/api/admin", adminRoutes);

import adminAuthRoutes from "./routes/adminAuth.js";
app.use("/api/admin", adminAuthRoutes);

app.use("/uploads", express.static("uploads"));

import adminContractorRoutes from "./routes/adminContractorRoutes.js";
app.use("/api/admin", adminContractorRoutes);

import workTypeRoutes from "./routes/workTypeRoutes.js";
app.use("/api/work-types", workTypeRoutes);

import { handler as uploadHandler } from "./uploadthing.js";
app.use("/api/uploadthing", uploadHandler);

// ---------------- START SERVER ----------------
app.listen(5000, () => console.log("Server running on port 5000"));
