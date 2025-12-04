import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  cause?: any;
}

// Error logger function
const logError = (err: CustomError, req: Request): void => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: err.message,
    code: err.code,
    statusCode: err.statusCode,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("user-agent"),
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  console.error("Error occurred:", JSON.stringify(errorLog, null, 2));
};

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error
  logError(err, req);

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === "P2002") {
      const target = (err.meta?.target as string[]) || [];
      const field = target[0] || "field";
      res.status(409).json({
        error: `A record with this ${field} already exists`,
        code: "DUPLICATE_ENTRY",
        field,
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

    // Required field missing
    if (err.code === "P2000") {
      res.status(400).json({
        error: "Required field is missing or value is too long",
        code: "VALIDATION_ERROR",
      });
      return;
    }

    // Generic Prisma error
    res.status(400).json({
      error: "Database operation failed",
      code: "DATABASE_ERROR",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
    return;
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

  // Handle Prisma initialization errors
  if (err instanceof Prisma.PrismaClientInitializationError) {
    console.error("Prisma initialization error:", err);
    res.status(503).json({
      error: "Database connection failed. Please try again later.",
      code: "DATABASE_UNAVAILABLE",
    });
    return;
  }

  // Handle Prisma Rust panic errors
  if (err instanceof Prisma.PrismaClientRustPanicError) {
    console.error("Prisma Rust panic:", err);
    res.status(500).json({
      error: "A critical database error occurred",
      code: "DATABASE_CRITICAL_ERROR",
    });
    return;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      error: "Invalid authentication token",
      code: "INVALID_TOKEN",
    });
    return;
  }

  if (err.name === "TokenExpiredError") {
    res.status(401).json({
      error: "Authentication token has expired",
      code: "TOKEN_EXPIRED",
    });
    return;
  }

  // Handle validation errors from express-validator
  if (err.name === "ValidationError") {
    res.status(400).json({
      error: err.message || "Validation failed",
      code: "VALIDATION_ERROR",
    });
    return;
  }

  // Handle custom status codes
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  // Determine user-friendly error message
  let userMessage = err.message;
  if (isProduction && statusCode === 500) {
    userMessage = "An unexpected error occurred. Please try again later.";
  }

  // Don't expose internal error details in production
  const errorResponse: any = {
    error: userMessage,
    code: err.code || "INTERNAL_ERROR",
  };

  // Only include stack trace and details in development
  if (!isProduction) {
    if (err.stack) {
      errorResponse.stack = err.stack;
    }
    if (err.cause) {
      errorResponse.cause = err.cause;
    }
  }

  res.status(statusCode).json(errorResponse);
};
