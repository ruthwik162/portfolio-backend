import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { adminMailOptions, clientMailOptions } from "./mailTemplates.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test email connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Mail server not ready:", error);
  } else {
    console.log("Mail server is ready to send messages");
  }
});

// API endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    // Admin notification
    await transporter.sendMail(adminMailOptions(name, email, subject, message));

    // Client auto-reply
    await transporter.sendMail(clientMailOptions(name, email));

    res.json({ success: true, msg: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, msg: "Failed to send message" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
