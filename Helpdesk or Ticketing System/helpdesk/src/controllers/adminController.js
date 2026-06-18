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