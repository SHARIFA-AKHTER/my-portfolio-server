import { Request, Response } from "express";
import { FaqService } from "./faq.service";


const getFaqs = async (req: Request, res: Response) => {
  try {
    const result = await FaqService.getAllFaqs();
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addFaq = async (req: Request, res: Response) => {
  try {
    const result = await FaqService.createFaq(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const FaqController = { getFaqs, addFaq };