"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./modules/user/user.routes");
const auth_route_1 = require("./modules/auth/auth.route");
const blog_route_1 = require("./modules/blog/blog.route");
const project_route_1 = require("./modules/project/project.route");
const contact_route_1 = require("./modules/contact/contact.route");
const testimonial_route_1 = require("./modules/testimonial/testimonial.route");
const faq_route_1 = require("./modules/faq/faq.route");
const newsletter_route_1 = require("./modules/newsletter/newsletter.route");
const analytics_route_1 = require("./modules/analytics/analytics.route");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    // origin: "http://localhost:3000",
    origin: "https://my-portfolio-client-umber.vercel.app",
    credentials: true,
}));
app.use("/api/user", user_routes_1.userRouter);
app.use("/api/auth", auth_route_1.AuthRoute);
app.use("/api/blog", blog_route_1.BlogRoute);
app.use("/api/projects", project_route_1.ProjectRoute);
app.use("/api/contacts", contact_route_1.ContactRoutes);
app.use("/api/testimonials", testimonial_route_1.testimonialRoutes);
app.use("/api/faqs", faq_route_1.FaqRoutes);
app.use("/api/newsletter", newsletter_route_1.NewsletterRoutes);
app.use("/api/analytics", analytics_route_1.AnalyticsRoutes);
// Default route for testing
app.get("/", (_req, res) => {
    res.send("Portfolio Api is Running");
});
// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map