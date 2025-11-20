import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();

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
