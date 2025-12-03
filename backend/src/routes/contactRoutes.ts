import express from "express";
import { handleContactForm } from "../controllers/contactController";

const router = express.Router();

// POST /api/contact - Handle contact form submission
router.post("/", handleContactForm);

export default router;
