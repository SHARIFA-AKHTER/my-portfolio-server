"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoutes = void 0;
const express_1 = require("express");
const faq_controller_1 = require("./faq.controller");
const router = (0, express_1.Router)();
router.post("/", faq_controller_1.FaqController.addFaq);
router.get("/", faq_controller_1.FaqController.getFaqs);
router.delete("/:id", faq_controller_1.FaqController.deleteFaq);
exports.FaqRoutes = router;
//# sourceMappingURL=faq.route.js.map