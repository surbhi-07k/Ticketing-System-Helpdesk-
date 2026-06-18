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

      attachments: [
        {
          type: String,
        },
      ],

      tags: [
        {
          type: String,
          trim: true,
        },
      ],

      responseDeadline: {
        type: Date,
      },
      resolutionDeadline: {
        type: Date,
      },
      resolvedAt: {
        type: Date,
        default: null,
      },

      status: {
        type: String,
        enum: [
          "open",
          "in-progress",
          "waiting",
          "resolved",
          "closed",
        ],
        default: "open",
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