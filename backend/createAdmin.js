import mongoose from "mongoose";
import Admin from "./models/Admin.js";

// MongoDB Connection
mongoose
  .connect("mongodb+srv://cwsearchway_db_user:Cwsearchway2580@cluster0.jlkcpjq.mongodb.net/cwsearchway")
  .then(() => {
    console.log("MongoDB Connected");
    return createAdmin();
  })
  .catch((err) => console.log(err));

async function createAdmin() {
  try {
    const admin = await Admin.create({
      email: "admin@cwsearchway.com",
      password: "123456", // plain text as you wanted
    });

    console.log("Admin Created:", admin);
    process.exit();
  } catch (error) {
    console.log("Error:", error.message);
    process.exit();
  }
}
