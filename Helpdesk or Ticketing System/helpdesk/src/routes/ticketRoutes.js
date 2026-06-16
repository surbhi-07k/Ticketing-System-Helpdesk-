import express from "express";

import {
  createTicket,
  getMyTickets,
  getTicketById,
  updateTicketStatus,
} from "../controllers/ticketController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router =
  express.Router();

router.post(
  "/",
  protect,
  createTicket
);

router.get(
  "/my",
  protect,
  getMyTickets
);

router.get(
  "/:id",
  protect,
  getTicketById
);

router.patch(
  "/:id/status",
  protect,
  authorize(
    "admin",
    "agent"
  ),
  updateTicketStatus
);

export default router;

