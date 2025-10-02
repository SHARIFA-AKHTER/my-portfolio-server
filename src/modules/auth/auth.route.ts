import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();
// Email + Password login
router.post("/login", AuthController.loginWithEmailAndPassword);
// Google login (separate route)
router.post("/login", AuthController.authWithGoogle);

export const AuthRoute = router;
