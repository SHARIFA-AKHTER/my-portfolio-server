import { Router } from "express";
import { FaqController } from "./faq.controller";


const router = Router();

router.post("/", FaqController.addFaq);
router.get("/", FaqController.getFaqs);

export const FaqRoutes = router;
