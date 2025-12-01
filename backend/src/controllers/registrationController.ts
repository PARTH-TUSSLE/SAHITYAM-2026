import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinaryUpload";

const prisma = new PrismaClient();

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
    if (!eventId || !transactionId || !name || !email || !mobileNumber) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    if (!file) {
      res.status(400).json({ error: "Payment screenshot is required" });
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

    res.status(201).json({
      message: "Registration successful! Payment will be verified shortly.",
      registration,
    });
  } catch (error) {
    console.error("Registration with payment error:", error);
    res.status(500).json({ error: "Registration failed" });
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
      },
    });

    if (!registration) {
      res.status(404).json({ error: "Registration not found" });
      return;
    }

    // Delete image from Cloudinary if exists
    if (registration.paymentScreenshotId) {
      try {
        await deleteFromCloudinary(registration.paymentScreenshotId);
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        // Continue with deletion even if Cloudinary deletion fails
      }
    }

    await prisma.registration.delete({
      where: {
        id: registration.id,
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
      where: { userId },
      include: {
        event: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(registrations);
  } catch (error) {
    console.error("Get registrations error:", error);
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
};
