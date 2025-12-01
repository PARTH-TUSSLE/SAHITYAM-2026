import { Router } from "express";
import { authMiddleware, adminMiddleware } from "../middleware/auth";
import {
  getAllEventRegistrations,
  getEventRegistrations,
  getAllUsers,
  getUserById,
  getPendingPayments,
  verifyPayment,
} from "../controllers/adminController";

const router = Router();

// All routes require authentication and admin role
router.use(authMiddleware, adminMiddleware);

// Get all events with their registrations
router.get("/events", getAllEventRegistrations);

// Get specific event registrations
router.get("/events/:eventId", getEventRegistrations);

// Get all users
router.get("/users", getAllUsers);

// Get specific user details
router.get("/users/:userId", getUserById);

// Get all pending payment verifications
router.get("/pending-payments", getPendingPayments);

// Verify or unverify a payment
router.patch("/verify-payment/:registrationId", verifyPayment);

export default router;
