import express from "express";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/roleMiddleware.js";

import {
  getAllUsers,
  updateUser,
  deleteUser,
  getOverviewAnalytics,
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