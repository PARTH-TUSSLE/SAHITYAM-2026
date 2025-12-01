import { Router } from "express";
import {
  registerForEvent,
  registerWithPayment,
  unregisterFromEvent,
  getUserRegistrations,
} from "../controllers/registrationController";
import { authMiddleware } from "../middleware/auth";
import { eventRegistrationValidation } from "../utils/validators";
import upload from "../config/multer";

const router = Router();

// New route for registration with payment screenshot
router.post(
  "/with-payment",
  authMiddleware,
  upload.single("paymentScreenshot"),
  registerWithPayment
);

// Old route for direct registration (kept for backward compatibility)
router.post("/", authMiddleware, eventRegistrationValidation, registerForEvent);
router.delete("/:eventId", authMiddleware, unregisterFromEvent);
router.get("/my-registrations", authMiddleware, getUserRegistrations);

export default router;
