import express from "express";
import { getAllContacts, handleContactMessage } from "./contact.controller";
import authMiddleware from "../../middleware/auth";
import { adminMiddleware } from "../../middleware/adminMiddleware";

const router = express.Router();

router.post("/", handleContactMessage);

router.get("/", authMiddleware, adminMiddleware, getAllContacts);

export const ContactRoutes = router;
