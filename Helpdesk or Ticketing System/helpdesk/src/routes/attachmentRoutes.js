import express from "express";

import protect from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

import {
  uploadAttachment,
  getAttachments,
} from "../controllers/attachmentController.js";

const router =
  express.Router();

router.post(
  "/tickets/:id/attachments",
  protect,
  upload.single("file"),
  uploadAttachment
);

router.get(
  "/tickets/:id/attachments",
  protect,
  getAttachments
);

export default router;