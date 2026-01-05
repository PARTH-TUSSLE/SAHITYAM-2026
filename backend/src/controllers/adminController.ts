import { Request, Response } from "express";
import { deleteFromCloudinary } from "../utils/cloudinaryUpload";
import prisma from "../lib/prisma";
import { sendPaymentVerificationEmail } from "../config/registrationEmail";

export const getAllEventRegistrations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let events;
    try {
      // Try including mobileNumber (works when Prisma schema/client is up-to-date)
      events = await prisma.event.findMany({
        include: {
          registrations: {
            where: {
              paymentStatus: {
                not: "REJECTED",
              },
              isActive: true,
            },
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
    } catch (err) {
      // If selecting mobileNumber causes an error (client/schema mismatch), retry without it
      console.warn(
        "adminController: failed to include mobileNumber, retrying without it",
        err
      );
      events = await prisma.event.findMany({
        include: {
          registrations: {
            where: {
              paymentStatus: {
                not: "REJECTED",
              },
              isActive: true,
            },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  email: true,
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
    }

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

    let event;
    try {
      event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          registrations: {
            where: {
              paymentStatus: {
                not: "REJECTED",
              },
              isActive: true,
            },
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
    } catch (err) {
      console.warn(
        "adminController.getEventRegistrations: failed to include mobileNumber, retrying without it",
        err
      );
      event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          registrations: {
            where: {
              paymentStatus: {
                not: "REJECTED",
              },
              isActive: true,
            },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  email: true,
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
    }

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

// Get all pending payment verifications
export const getPendingPayments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pendingRegistrations = await prisma.registration.findMany({
      where: {
        paymentStatus: "PENDING",
        paymentScreenshotUrl: {
          not: null,
        },
        isActive: true,
      },
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
        event: {
          select: {
            id: true,
            title: true,
            subtitle: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(pendingRegistrations);
  } catch (error) {
    console.error("Get pending payments error:", error);
    res.status(500).json({ error: "Failed to fetch pending payments" });
  }
};

// Get all verified payments
export const getVerifiedPayments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const verifiedRegistrations = await prisma.registration.findMany({
      where: {
        paymentStatus: "VERIFIED",
        isActive: true,
      },
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
        event: {
          select: {
            id: true,
            title: true,
            subtitle: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(verifiedRegistrations);
  } catch (error) {
    console.error("Get verified payments error:", error);
    res.status(500).json({ error: "Failed to fetch verified payments" });
  }
};

// Get all rejected payments
export const getRejectedPayments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const rejectedRegistrations = await prisma.registration.findMany({
      where: {
        paymentStatus: "REJECTED",
      },
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
        event: {
          select: {
            id: true,
            title: true,
            subtitle: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(rejectedRegistrations);
  } catch (error) {
    console.error("Get rejected payments error:", error);
    res.status(500).json({ error: "Failed to fetch rejected payments" });
  }
};

// Verify payment
export const verifyPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { registrationId } = req.params;
    const { verified, rejectionReason } = req.body;

    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
    });

    if (!registration) {
      res.status(404).json({ error: "Registration not found" });
      return;
    }

    // Check if registration is still active
    if (!registration.isActive) {
      res.status(400).json({
        error:
          "Cannot verify payment for inactive registration. User has unregistered from this event.",
      });
      return;
    }

    // If payment is rejected, update status to REJECTED and mark as inactive
    if (!verified) {
      const rejectedRegistration = await prisma.registration.update({
        where: { id: registrationId },
        data: {
          paymentVerified: false,
          paymentStatus: "REJECTED",
          rejectionReason: rejectionReason || null,
          isActive: false, // Automatically unregister user
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          event: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      // Send rejection email
      try {
        await sendPaymentVerificationEmail(
          rejectedRegistration.user.name,
          rejectedRegistration.user.email,
          [rejectedRegistration.event.title],
          rejectedRegistration.id,
          false
        );
      } catch (emailError) {
        console.error("Failed to send rejection email:", emailError);
      }

      res.json({
        message: "Payment rejected. User has been notified via email.",
        registration: rejectedRegistration,
        rejected: true,
      });
      return;
    }

    // If payment is verified, update the registration
    const updatedRegistration = await prisma.registration.update({
      where: { id: registrationId },
      data: {
        paymentVerified: verified,
        paymentStatus: "VERIFIED",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // Send verification email
    try {
      await sendPaymentVerificationEmail(
        updatedRegistration.user.name,
        updatedRegistration.user.email,
        [updatedRegistration.event.title],
        updatedRegistration.id,
        true
      );
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
    }

    res.json({
      message:
        "Payment verified successfully. User has been notified via email.",
      registration: updatedRegistration,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
};

// Get all inactive registrations
export const getInactiveRegistrations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inactiveRegistrations = await prisma.registration.findMany({
      where: {
        isActive: false,
        paymentStatus: {
          not: "REJECTED", // Exclude rejected payments from inactive list
        },
      },
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
        event: {
          select: {
            id: true,
            title: true,
            subtitle: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(inactiveRegistrations);
  } catch (error) {
    console.error("Get inactive registrations error:", error);
    res.status(500).json({ error: "Failed to fetch inactive registrations" });
  }
};

// Reactivate an inactive registration
export const reactivateRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { registrationId } = req.params;

    // Check if registration exists and is inactive
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: {
        event: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!registration) {
      res.status(404).json({ error: "Registration not found" });
      return;
    }

    if (registration.isActive) {
      res.status(400).json({ error: "Registration is already active" });
      return;
    }

    // Reactivate the registration
    const updatedRegistration = await prisma.registration.update({
      where: { id: registrationId },
      data: {
        isActive: true,
        // Reset payment status to PENDING so admin can verify again
        paymentStatus: "PENDING",
      },
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
        event: {
          select: {
            id: true,
            title: true,
            subtitle: true,
          },
        },
      },
    });

    res.json({
      message: "Registration reactivated successfully",
      registration: updatedRegistration,
    });
  } catch (error) {
    console.error("Reactivate registration error:", error);
    res.status(500).json({ error: "Failed to reactivate registration" });
  }
};
