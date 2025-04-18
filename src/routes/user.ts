import express from "express";
import userController from "../controllers/user.controller";
import { validateUserAuth, validateUserSignUp } from "../middlewares/validation/validator/user.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", validateUserSignUp, userController.signUp);
router.post("/signin", validateUserAuth, userController.signIn);
router.post("/generate-referral", authMiddleware, userController.generateReferralLink);
router.post("/process-referral", authMiddleware, userController.processReferral);

export default router;
