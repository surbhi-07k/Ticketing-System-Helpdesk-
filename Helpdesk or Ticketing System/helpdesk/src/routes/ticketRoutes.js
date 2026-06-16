import express from "express";

import {
  createTicket,
} from "../controllers/ticketController.js";

import protect from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/",
  protect,
  createTicket
);

export default router;