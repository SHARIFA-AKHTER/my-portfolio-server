import { Request, Response } from "express";
import { AnalyticsService } from "./analytics.service";

const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsService.getStatsFromDB();
    
    res.status(200).json({
      success: true,
      message: "Analytics data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while fetching analytics",
    });
  }
};

export const AnalyticsController = {
  getDashboardStats,
};