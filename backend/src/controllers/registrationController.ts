import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinaryUpload";
import prisma from "../lib/prisma";
import { sendRegistrationConfirmation } from "../config/registrationEmail";

// Register with payment screenshot
export const registerWithPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const { eventId, transactionId, name, email, mobileNumber } = req.body;
    const file = req.file;

    // Validate required fields
    if (!eventId || !name || !email || !mobileNumber) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    if (!file) {
      res.status(400).json({ error: "Payment screenshot is required" });
      return;
    }

    // Validate file type and size
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      res.status(400).json({
        error:
          "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      res.status(400).json({
        error: "File size too large. Maximum size is 5MB.",
      });
      return;
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    // Check if already registered
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        userId,
        eventId,
        isActive: true,
      },
    });

    if (existingRegistration) {
      res.status(400).json({ error: "Already registered for this event" });
      return;
    }

    // Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(
      file.buffer,
      "sahityam-2026/payment-screenshots"
    );

    // Create registration with payment details
    const registration = await prisma.registration.create({
      data: {
        userId,
        eventId,
        transactionId,
        paymentScreenshotUrl: uploadResult.secure_url,
        paymentScreenshotId: uploadResult.public_id,
        registrantName: name,
        registrantEmail: email,
        registrantMobile: mobileNumber,
        paymentVerified: false, // Admin will verify later
      },
      include: {
        event: true,
      },
    });

    // Send registration confirmation email
    try {
      await sendRegistrationConfirmation(
        name,
        email,
        [registration.event.title],
        registration.id,
        200
      );
    } catch (emailError) {
      console.error(
        "Failed to send registration confirmation email:",
        emailError
      );
      // Continue even if email fails
    }

    res.status(201).json({
      message:
        "Registration successful! Check your email for confirmation. Payment will be verified shortly.",
      registration,
    });
  } catch (error) {
    console.error("Registration with payment error:", error);

    if (error instanceof Error) {
      // Check for specific errors
      if (error.message.includes("Cloudinary")) {
        res.status(500).json({
          error:
            "Failed to upload payment screenshot. Please try again with a different image.",
        });
        return;
      }
      if (error.message.includes("Unique constraint")) {
        res.status(400).json({
          error: "You are already registered for this event.",
        });
        return;
      }
      res.status(500).json({
        error: "Unable to complete registration. Please try again later.",
      });
    } else {
      res.status(500).json({
        error: "An unexpected error occurred during registration.",
      });
    }
  }
};

export const registerForEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const userId = (req as any).userId;
    const { eventId } = req.body;

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    // Check if already registered
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        userId,
        eventId,
        isActive: true,
      },
    });

    if (existingRegistration) {
      res.status(400).json({ error: "Already registered for this event" });
      return;
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        userId,
        eventId,
      },
      include: {
        event: true,
      },
    });

    res.status(201).json(registration);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const unregisterFromEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const { eventId } = req.params;

    const registration = await prisma.registration.findFirst({
      where: {
        userId,
        eventId,
        isActive: true,
      },
    });

    if (!registration) {
      res.status(404).json({ error: "Registration not found" });
      return;
    }

    // Mark registration as inactive instead of deleting
    await prisma.registration.update({
      where: {
        id: registration.id,
      },
      data: {
        isActive: false,
      },
    });

    res.json({ message: "Successfully unregistered from event" });
  } catch (error) {
    console.error("Unregister error:", error);
    res.status(500).json({ error: "Failed to unregister" });
  }
};

export const getUserRegistrations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).userId;

    const registrations = await prisma.registration.findMany({
      where: {
        userId,
      },
      include: {
        event: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map registrations to include necessary fields
    const formattedRegistrations = registrations.map((reg) => ({
      eventId: reg.eventId,
      isActive: reg.isActive,
      paymentStatus: reg.paymentStatus,
      rejectionReason: reg.rejectionReason,
      event: reg.event,
    }));

    res.json(formattedRegistrations);
  } catch (error) {
    console.error("Get registrations error:", error);
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
};
