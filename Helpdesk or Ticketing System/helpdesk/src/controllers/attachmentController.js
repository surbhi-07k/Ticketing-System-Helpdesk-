import Attachment from "../models/Attachment.js";
import Ticket from "../models/Ticket.js";

export const uploadAttachment =
  async (req, res) => {
    try {
      const ticketId =
        req.params.id;

      const ticket =
        await Ticket.findById(
          ticketId
        );

      if (!ticket) {
        return res.status(404).json({
          message:
            "Ticket not found",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message:
            "No file uploaded",
        });
      }

      const attachment =
        await Attachment.create({
          ticket: ticketId,

          uploadedBy:
            req.user._id,

          originalName:
            req.file.originalname,

          fileName:
            req.file.filename,

          filePath:
            req.file.path,

          mimeType:
            req.file.mimetype,

          fileSize:
            req.file.size,
        });

      res.status(201).json({
        message:
          "File uploaded successfully",
        attachment,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

  export const getAttachments =
  async (req, res) => {
    try {
      const ticketId =
        req.params.id;

      const ticket =
        await Ticket.findById(
          ticketId
        );

      if (!ticket) {
        return res.status(404).json({
          message:
            "Ticket not found",
        });
      }

      const attachments =
        await Attachment.find({
          ticket: ticketId,
        })
          .populate(
            "uploadedBy",
            "name email role"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        message:
          "Attachments fetched successfully",
        attachments,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };