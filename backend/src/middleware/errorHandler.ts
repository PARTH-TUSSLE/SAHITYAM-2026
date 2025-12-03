import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error for debugging (consider using a proper logging service in production)
  console.error("Error occurred:", {
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === "P2002") {
      res.status(409).json({
        error: "A record with this information already exists",
        code: "DUPLICATE_ENTRY",
      });
      return;
    }

    // Record not found
    if (err.code === "P2025") {
      res.status(404).json({
        error: "The requested resource was not found",
        code: "NOT_FOUND",
      });
      return;
    }

    // Foreign key constraint failed
    if (err.code === "P2003") {
      res.status(400).json({
        error: "Invalid reference to related resource",
        code: "INVALID_REFERENCE",
      });
      return;
    }
  }

  // Handle Prisma validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      error: "Invalid data provided",
      code: "VALIDATION_ERROR",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
    return;
  }

  // Handle custom status codes
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  // Don't expose internal error details in production
  const errorResponse: any = {
    error:
      isProduction && statusCode === 500
        ? "An unexpected error occurred. Please try again later."
        : err.message || "Internal server error",
    code: err.code || "INTERNAL_ERROR",
  };

  // Only include stack trace in development
  if (!isProduction && err.stack) {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};
