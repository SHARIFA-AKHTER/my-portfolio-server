"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const analytics_service_1 = require("./analytics.service");
const getDashboardStats = async (req, res) => {
    try {
        const result = await analytics_service_1.AnalyticsService.getStatsFromDB();
        res.status(200).json({
            success: true,
            message: "Analytics data retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while fetching analytics",
        });
    }
};
exports.AnalyticsController = {
    getDashboardStats,
};
//# sourceMappingURL=analytics.controller.js.map