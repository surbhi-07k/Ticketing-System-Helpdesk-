import express from "express";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/roleMiddleware.js";

import {
  getAllUsers,
  updateUser,
  deleteUser,
  getOverviewAnalytics,
  getTicketsByStatus,
  getTicketsByAgent,
} from "../controllers/adminController.js";

const router =
  express.Router();

router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);

router.get(
  "/analytics/overview",
  protect,
  authorize("admin"),
  getOverviewAnalytics
);

router.get(
  "/analytics/by-status",
  protect,
  authorize("admin"),
  getTicketsByStatus
);

router.get(
  "/analytics/by-agent",
  protect,
  authorize("admin"),
  getTicketsByAgent
);

router.patch(
  "/users/:id",
  protect,
  authorize("admin"),
  updateUser
);

router.delete(
  "/users/:id",
  protect,
  authorize("admin"),
  deleteUser
);

export default router;