import path from "path";
import express from "express";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import ticketRoutes from "./src/routes/ticketRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";
import attachmentRoutes from "./src/routes/attachmentRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Parse JSON body
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/tickets", commentRoutes);
app.use("/api", attachmentRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Helpdesk API Running....");
});

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});