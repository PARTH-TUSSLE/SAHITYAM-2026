import { Router } from "express";
import {
  registerForEvent,
  unregisterFromEvent,
  getUserRegistrations,
} from "../controllers/registrationController";
import { authMiddleware } from "../middleware/auth";
import { eventRegistrationValidation } from "../utils/validators";

const router = Router();

router.post("/", authMiddleware, eventRegistrationValidation, registerForEvent);
router.delete("/:eventId", authMiddleware, unregisterFromEvent);
router.get("/my-registrations", authMiddleware, getUserRegistrations);

export default router;
