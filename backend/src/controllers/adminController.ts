import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEventRegistrations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = await prisma.event.findMany({
      include: {
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                email: true,
                mobileNumber: true,
                createdAt: true,
              },
            },
          },
        },
      },
      orderBy: {
        title: "asc",
      },
    });

    // Transform data to include registration count
    const eventsWithStats = events.map((event) => ({
      ...event,
      registrationCount: event.registrations.length,
    }));

    res.json(eventsWithStats);
  } catch (error) {
    console.error("Get all event registrations error:", error);
    res.status(500).json({ error: "Failed to fetch event registrations" });
  }
};

export const getEventRegistrations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { eventId } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                email: true,
                mobileNumber: true,
                createdAt: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    res.json(event);
  } catch (error) {
    console.error("Get event registrations error:", error);
    res.status(500).json({ error: "Failed to fetch event registrations" });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        registrations: {
          include: {
            event: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        registrations: {
          include: {
            event: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
