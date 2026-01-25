import { Router } from "express";
import { NewsletterController } from "./newsletter.controller";

const router = Router();

router.post("/subscribe", NewsletterController.subscribe);


router.get("/subscribers", NewsletterController.getSubscribers);
router.delete("/subscribers/:id", NewsletterController.removeSubscriber);

export const NewsletterRoutes = router;