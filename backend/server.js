import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import registrationRoutes from "./routes/registration.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://cwsearchway_db_user:Cwsearchway2580@cluster0.jlkcpjq.mongodb.net/cwsearchway?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/registration", registrationRoutes);
import adminRoutes from "./routes/admin.js";
app.use("/api/admin", adminRoutes);
import adminAuthRoutes from "./routes/adminAuth.js";
app.use("/api/admin", adminAuthRoutes);
app.use("/uploads", express.static("uploads"));



// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
