import express from "express";
import { handleContactForm } from "../controllers/contactController";
import { contactValidation, validate } from "../middleware/validation";

const router = express.Router();

// POST /api/contact - Handle contact form submission
router.post("/", contactValidation, validate, handleContactForm);

export default router;
