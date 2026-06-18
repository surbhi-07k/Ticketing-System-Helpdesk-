import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

export const getAllUsers =
  async (req, res) => {
    try {
      const users =
        await User.find()
          .select("-password")
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        message:
          "Users fetched successfully",
        count: users.length,
        users,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const updateUser =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      const {
        role,
        isActive,
      } = req.body;

      if (role) {
        user.role = role;
      }

      if (
        isActive !== undefined
      ) {
        user.isActive =
          isActive;
      }

      await user.save();

      res.status(200).json({
        message:
          "User updated successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const deleteUser =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      await user.deleteOne();

      res.status(200).json({
        message:
          "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const getOverviewAnalytics =
  async (req, res) => {
    try {
      // Total tickets
      const totalTickets =
        await Ticket.countDocuments();

      // Open tickets
      const openTickets =
        await Ticket.countDocuments({
          status: "open",
        });

      // Today's date range
      const today =
        new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      // Resolved today
      const resolvedToday =
        await Ticket.countDocuments({
          status: "resolved",
          updatedAt: {
            $gte: today,
          },
        });

      // Average resolution time
      const resolvedTickets =
        await Ticket.find({
          status: "resolved",
        });

      let avgResolutionTime =
        0;

      if (
        resolvedTickets.length >
        0
      ) {
        const totalTime =
          resolvedTickets.reduce(
            (sum, ticket) => {
              return (
                sum +
                (ticket.updatedAt -
                  ticket.createdAt)
              );
            },
            0
          );

        avgResolutionTime =
          totalTime /
          resolvedTickets.length;

        avgResolutionTime =
          Math.round(
            avgResolutionTime /
              (1000 * 60 * 60)
          ); // hours
      }

      res.status(200).json({
        totalTickets,
        openTickets,
        resolvedToday,
        avgResolutionTimeHours:
          avgResolutionTime,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const getTicketsByStatus =
  async (req, res) => {
    try {
      const stats =
        await Ticket.aggregate([
          {
            $group: {
              _id: "$status",
              count: {
                $sum: 1,
              },
            },
          },
        ]);

      res.status(200).json({
        message:
          "Status analytics fetched successfully",
        stats,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const getTicketsByAgent =
  async (req, res) => {
    try {
      const stats =
        await Ticket.aggregate([
          {
            $match: {
              assignedTo: {
                $ne: null,
              },
            },
          },

          {
            $group: {
              _id: "$assignedTo",
              ticketCount: {
                $sum: 1,
              },
            },
          },

          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "agent",
            },
          },

          {
            $unwind: "$agent",
          },

          {
            $project: {
              _id: 0,
              agentId:
                "$agent._id",
              name:
                "$agent.name",
              email:
                "$agent.email",
              ticketCount: 1,
            },
          },
        ]);

      res.status(200).json({
        message:
          "Agent analytics fetched successfully",
        stats,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const getSLABreaches =
  async (req, res) => {
    try {
      const tickets =
        await Ticket.find({
          status: {
            $ne: "resolved",
          },
        })
          .populate(
            "customer",
            "name email"
          )
          .populate(
            "assignedTo",
            "name email"
          );

      const breaches =
        tickets.filter(
          (ticket) => {
            const now =
              new Date();

            const createdAt =
              new Date(
                ticket.createdAt
              );

            const diffHours =
              (now - createdAt) /
              (1000 * 60 * 60);

            switch (
              ticket.priority
            ) {
              case "urgent":
                return (
                  diffHours > 4
                );

              case "high":
                return (
                  diffHours > 8
                );

              case "medium":
                return (
                  diffHours > 24
                );

              case "low":
                return (
                  diffHours > 72
                );

              default:
                return false;
            }
          }
        );

      res.status(200).json({
        message:
          "SLA breaches fetched successfully",
        count:
          breaches.length,
        breaches,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };