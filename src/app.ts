import compression from "compression";
import cors from "cors";
import express from "express";
import { userRouter } from "./modules/user/user.routes";
import { AuthRoute } from "./modules/auth/auth.route";
import { BlogRoute } from "./modules/blog/blog.route";
import { ProjectRoute } from "./modules/project/project.route";
import { ContactRoutes } from "./modules/contact/contact.route";

const app = express();

// Middleware
app.use(express.json());
app.use(compression());

app.use(
  cors({
    origin: "http://localhost:3000",

    // origin: "https://my-portfolio-client-umber.vercel.app",

    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/auth", AuthRoute);
app.use("/api/blog", BlogRoute);
app.use("/api/projects", ProjectRoute);
app.use("/api/contacts", ContactRoutes);
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

export default app;
