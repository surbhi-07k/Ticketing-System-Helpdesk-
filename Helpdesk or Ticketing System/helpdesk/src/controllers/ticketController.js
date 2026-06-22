import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import calculateSLA from "../services/slaService.js";
import checkSLABreach from "../utils/checkSLABreach.js";
import sendEmail from "../services/emailService.js";

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
      tags,
      attachments,
    } = req.body;

    const agents = await User.find({
      role: "agent",
      isActive: true,
    });

    let selectedAgent = null;

    if (agents.length > 0) {
      let minTickets = Infinity;

      for (const agent of agents) {

        const ticketCount =
          await Ticket.countDocuments({
            assignedTo: agent._id,
            status: {
              $in: [
                "open",
                "in-progress",
                "waiting",
              ],
            },
          });

        if (
          ticketCount < minTickets
        ) {
          minTickets = ticketCount;
          selectedAgent = agent;
        }
      }
    }

    const {
      responseDeadline,
      resolutionDeadline,
    } = calculateSLA(priority);

  
    const ticket =
      await Ticket.create({
        title,
        description,
        category,
        priority,
        customer: req.user._id,
        assignedTo:
          selectedAgent
            ? selectedAgent._id
            : null,

        tags: tags || [],
        attachments:
          attachments || [],

        responseDeadline,
        resolutionDeadline,
      });

      await sendEmail(
        req.user.email,
        "Ticket Created",
        `Your ticket "${ticket.title}" has been created successfully.`
      );

    res.status(201).json({
      message:
        "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


export const getMyTickets = async (
  req,
  res
) => {
  try {
    const tickets =
      await Ticket.find({
        customer: req.user._id,
      }).sort({
        createdAt: -1,
      });

    const updatedTickets =
      tickets.map((ticket) => {
        const ticketObj =
          ticket.toObject();

        ticketObj.isSlaBreached =
          checkSLABreach(ticket);

        return ticketObj;
      });

    res.status(200).json({
      count: updatedTickets.length,
      tickets: updatedTickets,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getTicketById =
  async (req, res) => {
    try {
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
        ticket.customer.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          message:
            "Access denied",
        });
      }

      const ticketObj = ticket.toObject();

        ticketObj.isSlaBreached =
        checkSLABreach(ticket);

      res.status(200).json(ticketObj);


    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const updateTicketStatus =
  async (req, res) => {
    try {
      const { status } = req.body;

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

      const transitions = {
        open: ["in-progress"],

        "in-progress": [
          "resolved",
        ],

        resolved: ["closed"],

        closed: [],
      };

      const currentStatus =
        ticket.status;

      const allowedStatuses =
        transitions[
          currentStatus
        ];

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          message: `Cannot change status from ${currentStatus} to ${status}`,
        });
      }

      ticket.status = status;

      if (status === "resolved") {
        ticket.resolvedAt = new Date();
      }

      await ticket.save();
      
      const customer =
        await User.findById(
          ticket.customer
        );

        await sendEmail(
          customer.email,
          "Ticket Status Updated",
          `Your ticket "${ticket.title}" status is now ${ticket.status}.`
        );

      res.status(200).json({
        message:
          "Ticket status updated successfully",
        ticket,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const getAllTickets =
  async (req, res) => {
    try {

      const page =
        parseInt(req.query.page) || 1;

      const limit =
        parseInt(req.query.limit) || 5;

      const skip =
        (page - 1) * limit;

      const filter = {};

      if (req.query.status) {
        filter.status =
          req.query.status;
      }

      if (req.query.priority) {
        filter.priority =
          req.query.priority;
      }

      if (req.query.assignedTo) {
        filter.assignedTo =
          req.query.assignedTo;
      }

      const tickets =
        await Ticket.find(filter)
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit);

      const updatedTickets =
        tickets.map((ticket) => {
          const ticketObj =
            ticket.toObject();

          ticketObj.isSlaBreached =
            checkSLABreach(ticket);

          return ticketObj;
        });

      const totalTickets =
        await Ticket.countDocuments(
        filter
      );

      res.status(200).json({
        page,
        limit,
        totalTickets,
        totalPages: Math.ceil(
          totalTickets / limit
        ),
        count: updatedTickets.length,
        tickets: updatedTickets,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const assignTicket =
  async (req, res) => {
    try {
      const { agentId } =
        req.body;

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

      const agent =
        await User.findById(
          agentId
        );

      if (!agent) {
        return res.status(404).json({
          message:
            "Agent not found",
        });
      }

      if (
        agent.role !== "agent"
      ) {
        return res.status(400).json({
          message:
            "User is not an agent",
        });
      }

      ticket.assignedTo =
        agent._id;

      await ticket.save();

      res.status(200).json({
        message:
          "Ticket assigned successfully",
        ticket,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const getAssignedTickets =
  async (req, res) => {
    try {
      const tickets =
        await Ticket.find({
          assignedTo: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        count: tickets.length,
        tickets,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

export const deleteTicket =
  async (req, res) => {
    try {
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

      await ticket.deleteOne();

      res.status(200).json({
        message:
          "Ticket deleted successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };