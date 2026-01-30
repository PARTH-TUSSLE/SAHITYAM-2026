import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Connection retry configuration
const MAX_RETRIES = 5;
const RETRY_DELAY = 2000; // 2 seconds

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Create Prisma Client with error handling and connection pooling
const createPrismaClient = () => {
  const prisma = new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    errorFormat: "pretty",
  });

  // Add connection lifecycle hooks
  prisma.$on("error" as never, (e: any) => {
    console.error("Prisma error event:", e);
  });

  return prisma;
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Note: Connection keepalive removed to allow Neon DB to scale to zero
// Prisma handles reconnection automatically when needed

// Test database connection with retry logic
export const testDatabaseConnection = async (): Promise<boolean> => {
  console.log("🔌 Testing database connection...");

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await prisma.$connect();
      await prisma.$queryRaw`SELECT 1`;
      console.log("✅ Database connection successful!");
      return true;
    } catch (error: any) {
      console.error(
        `❌ Database connection attempt ${attempt}/${MAX_RETRIES} failed:`,
        error.message
      );

      if (attempt < MAX_RETRIES) {
        console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await delay(RETRY_DELAY);
      } else {
        console.error(
          "❌ FATAL: Could not connect to database after maximum retries"
        );
        console.error("\nPlease check:");
        console.error("  1. DATABASE_URL is correctly set in .env");
        console.error("  2. Database server is running and accessible");
        console.error("  3. Database credentials are correct");
        console.error("  4. Network connectivity to database");
        console.error("\nError details:", error.message);

        if (error.code) {
          console.error("Error code:", error.code);
        }

        return false;
      }
    }
  }

  return false;
};

// Graceful shutdown
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    console.log("✅ Database disconnected successfully");
  } catch (error: any) {
    console.error("❌ Error disconnecting from database:", error.message);
  }
};

// Graceful shutdown
process.on("beforeExit", async () => {
  await disconnectDatabase();
});

process.on("SIGINT", async () => {
  console.log("\n⏹️  Received SIGINT, shutting down gracefully...");
  await disconnectDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n⏹️  Received SIGTERM, shutting down gracefully...");
  await disconnectDatabase();
  process.exit(0);
});

// Handle uncaught errors
process.on("uncaughtException", async (error) => {
  console.error("❌ Uncaught Exception:", error);
  await disconnectDatabase();
  process.exit(1);
});

process.on("unhandledRejection", async (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  await disconnectDatabase();
  process.exit(1);
});

export default prisma;
