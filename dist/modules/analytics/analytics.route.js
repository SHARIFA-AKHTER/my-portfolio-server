"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRoutes = void 0;
const express_1 = require("express");
const analytics_controller_1 = require("./analytics.controller");
const router = (0, express_1.Router)();
router.get("/stats", analytics_controller_1.AnalyticsController.getDashboardStats);
exports.AnalyticsRoutes = router;
//# sourceMappingURL=analytics.route.js.map