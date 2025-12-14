import { Request, Response } from "express";
import { sendContactEmail, sendConfirmationEmail } from "../config/email";

// Rate limiting map (in-memory for simplicity)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 5; // Max 5 submissions per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

// Helper function to check rate limit
const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];

  // Remove old timestamps outside the window
  const validTimestamps = timestamps.filter((ts) => now - ts < RATE_WINDOW);

  if (validTimestamps.length >= RATE_LIMIT) {
    return false; // Rate limit exceeded
  }

  // Add current timestamp
  validTimestamps.push(now);
  rateLimitMap.set(identifier, validTimestamps);

  return true;
};

export const handleContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error:
          "Please provide all required fields: name, email, subject, and message",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address",
      });
    }

    // Rate limiting by IP address
    const identifier = req.ip || req.socket.remoteAddress || "unknown";
    if (!checkRateLimit(identifier)) {
      return res.status(429).json({
        success: false,
        error: "Too many submissions. Please try again later.",
      });
    }

    // Send email to admin
    await sendContactEmail(
      name.trim(),
      email.trim(),
      phone?.trim() || "",
      subject.trim(),
      message.trim()
    );

    // Send confirmation email to user
    await sendConfirmationEmail(name.trim(), email.trim());

    return res.status(200).json({
      success: true,
      message:
        "Your message has been sent successfully! We will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      error:
        "Failed to send message. Please try again later or contact us directly at mindbenders@cgcuniversity.org",
    });
  }
};
