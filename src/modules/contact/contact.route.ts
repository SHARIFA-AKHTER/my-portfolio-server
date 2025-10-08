import express from "express";
import { handleContactMessage } from "./contact.controller";

const router = express.Router();

router.post("/", handleContactMessage);

export const ContactRoutes = router;
