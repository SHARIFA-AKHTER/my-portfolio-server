"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterRoutes = void 0;
const express_1 = require("express");
const newsletter_controller_1 = require("./newsletter.controller");
const router = (0, express_1.Router)();
router.post("/subscribe", newsletter_controller_1.NewsletterController.subscribe);
router.get("/subscribers", newsletter_controller_1.NewsletterController.getSubscribers);
router.delete("/subscribers/:id", newsletter_controller_1.NewsletterController.removeSubscriber);
exports.NewsletterRoutes = router;
//# sourceMappingURL=newsletter.route.js.map