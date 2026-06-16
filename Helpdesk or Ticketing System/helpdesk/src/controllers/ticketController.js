import Ticket from "../models/Ticket.js";

export const createTicket = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      category,
      priority,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message:
          "Title and description are required",
      });
    }

    const ticket =
      await Ticket.create({
        title,
        description,
        category,
        priority,
        customer: req.user._id,
      });

    res.status(201).json({
      message:
        "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};