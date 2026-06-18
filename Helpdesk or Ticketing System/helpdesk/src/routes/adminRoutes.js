import express from "express";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/roleMiddleware.js";

import {
  getAllUsers,
  updateUser,
} from "../controllers/adminController.js";

const router =
  express.Router();

router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);

router.patch(
  "/users/:id",
  protect,
  authorize("admin"),
  updateUser
);

export default router;