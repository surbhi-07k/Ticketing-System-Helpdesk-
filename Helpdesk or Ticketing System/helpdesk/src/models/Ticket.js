import mongoose from "mongoose";

const ticketSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        enum: [
          "technical",
          "billing",
          "account",
          "other",
        ],
        default: "other",
      },

      priority: {
        type: String,
        enum: [
          "low",
          "medium",
          "high",
        ],
        default: "medium",
      },

      status: {
        type: String,
        enum: [
          "open",
          "in-progress",
          "resolved",
          "closed",
        ],
        default: "open",
      },

      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

const Ticket = mongoose.model(
  "Ticket",
  ticketSchema
);

export default Ticket;