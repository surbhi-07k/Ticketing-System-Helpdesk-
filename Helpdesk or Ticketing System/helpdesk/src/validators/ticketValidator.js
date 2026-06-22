import { body } from "express-validator";

export const createTicketValidation = [
  body("title")
    .notEmpty()
    .withMessage(
      "Title is required"
    ),

  body("description")
    .notEmpty()
    .withMessage(
      "Description is required"
    ),

  body("priority")
    .optional()
    .isIn([
      "low",
      "medium",
      "high",
    ])
    .withMessage(
      "Invalid priority"
    ),

  body("category")
    .optional()
    .isIn([
      "technical",
      "billing",
      "account",
      "other",
    ])
    .withMessage(
      "Invalid category"
    ),
];