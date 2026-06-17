import Comment from "../models/Comment.js";
import Ticket from "../models/Ticket.js";

export const addComment = async (
  req,
  res
) => {
  try {
    const {
      message,
      isInternal,
    } = req.body;

    if (!message) {
      return res.status(400).json({
        message:
          "Comment message is required",
      });
    }

    const ticket =
      await Ticket.findById(
        req.params.id
      );

    if (!ticket) {
      return res.status(404).json({
        message:
          "Ticket not found",
      });
    }

    if (
      isInternal === true &&
      req.user.role ===
        "customer"
    ) {
      return res.status(403).json({
        message:
          "Customers cannot add internal notes",
      });
    }

    const comment =
      await Comment.create({
        ticket:
          req.params.id,

        user:
          req.user._id,

        message,

        isInternal:
          isInternal || false,
      });

    res.status(201).json({
      message:
        "Comment added successfully",
      comment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};