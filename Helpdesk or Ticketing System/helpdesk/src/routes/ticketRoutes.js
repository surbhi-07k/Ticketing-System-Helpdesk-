import express from "express";

import {
  createTicket,
  getMyTickets,
  getTicketById,
  updateTicketStatus,
  getAllTickets,
  assignTicket,
  getAssignedTickets,
  deleteTicket,
} from "../controllers/ticketController.js";

import {
  createTicketValidation,
} from "../validators/ticketValidator.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import validateTicket from "../middleware/validateTicket.js";
import validate from "../middleware/validationResultMiddleware.js";

const router =
  express.Router();

router.post(
  "/",
  protect,
  createTicketValidation,
  validate,
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
  "/assigned",
  protect,
  authorize("agent"),
  getAssignedTickets
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

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteTicket
);

export default router;

