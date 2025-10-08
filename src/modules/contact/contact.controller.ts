import { Request, Response } from "express";
import { createContact } from "./contact.service";

export const handleContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const contact = await createContact({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: "Message received successfully ✅",
      contact,
    });
  } catch (error) {
    console.error("❌ Contact error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error ❌",
    });
  }
};
