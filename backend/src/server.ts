import dotenv from "dotenv";

// Load environment variables FIRST before any other imports
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import registrationRoutes from "./routes/registrationRoutes";
import adminRoutes from "./routes/adminRoutes";
import contactRoutes from "./routes/contactRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { apiLimiter } from "./middleware/rateLimiter";
import {
  validateEnvironment,
  validateSpecificValues,
} from "./config/validateEnv";
import { testDatabaseConnection } from "./lib/prisma";

// Validate environment variables before starting
validateEnvironment();
validateSpecificValues();

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5000;

// CORS Configuration
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Apply rate limiting to all API routes
app.use("/api", apiLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// Health check with database status
app.get("/api/health", async (req, res) => {
  try {
    const dbConnected = await testDatabaseConnection();
    res.json({
      status: "ok",
      message: "Server is running",
      database: dbConnected ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      message: "Server health check failed",
      database: "error",
      timestamp: new Date().toISOString(),
    });
  }
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    code: "NOT_FOUND",
    path: req.path,
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server with database connection check
const startServer = async () => {
  try {
    console.log("\n🚀 Starting SAHITYAM 2026 Backend Server...\n");

    // Test database connection
    const dbConnected = await testDatabaseConnection();

    if (!dbConnected) {
      console.error(
        "\n❌ FATAL: Cannot start server without database connection"
      );
      process.exit(1);
    }

    // Start listening
    app.listen(PORT, () => {
      console.log("\n✅ Server started successfully!");
      console.log(`📍 Server URL: http://localhost:${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🌐 CORS enabled for: ${FRONTEND_URL}`);
      console.log(`🔒 Rate limiting: Active`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log("\n✨ Ready to accept requests!\n");
    });
  } catch (error) {
    console.error("\n❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
