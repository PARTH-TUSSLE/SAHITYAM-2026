import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Ensure user is authenticated first
    if (!req.userId || !req.userRole) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    if (req.userRole !== "ADMIN") {
      res.status(403).json({
        error: "Admin access required",
        code: "INSUFFICIENT_PERMISSIONS",
      });
      return;
    }
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(403).json({ error: "Access forbidden" });
  }
};
