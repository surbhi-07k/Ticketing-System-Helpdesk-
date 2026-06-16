import express from "express";

import {
  createTicket,
  getMyTickets,
  getTicketById,
  updateTicketStatus,
  getAllTickets,
  assignTicket,
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
  "/",
  protect,
  authorize(
    "admin",
    "agent"
  ),
  getAllTickets
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

router.patch(
  "/:id/assign",
  protect,
  authorize("admin"),
  assignTicket
);

export default router;

