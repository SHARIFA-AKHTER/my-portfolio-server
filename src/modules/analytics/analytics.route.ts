import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";

const router = Router();

router.get("/stats", AnalyticsController.getDashboardStats);

export const AnalyticsRoutes = router;