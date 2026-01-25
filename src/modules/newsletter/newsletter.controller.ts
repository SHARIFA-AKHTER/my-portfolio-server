import { Request, Response } from "express";
import { NewsletterService } from "./newsletter.service";

const subscribe = async (req: Request, res: Response) => {
  try {
    const result = await NewsletterService.subscribeToNewsletter(req.body);
    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.code === 'P2002' ? "Email already exists!" : error.message,
    });
  }
};

const getSubscribers = async (req: Request, res: Response) => {
  try {
    const result = await NewsletterService.getAllSubscribers();
    res.status(200).json({
      success: true,
      message: "Subscribers retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeSubscriber = async (req: Request, res: Response) => {
  try {
    await NewsletterService.deleteSubscriber(req.params.id);
    res.status(200).json({
      success: true,
      message: "Subscriber removed successfully",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const NewsletterController = {
  subscribe,
  getSubscribers,
  removeSubscriber,
};