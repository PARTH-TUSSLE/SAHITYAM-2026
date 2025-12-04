import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  name: string;
  required: boolean;
  description?: string;
}

const ENV_VARIABLES: EnvConfig[] = [
  {
    name: "DATABASE_URL",
    required: true,
    description: "PostgreSQL database connection string",
  },
  {
    name: "JWT_SECRET",
    required: true,
    description: "Secret key for JWT token generation",
  },
  {
    name: "CLOUDINARY_CLOUD_NAME",
    required: true,
    description: "Cloudinary cloud name for image uploads",
  },
  {
    name: "CLOUDINARY_API_KEY",
    required: true,
    description: "Cloudinary API key",
  },
  {
    name: "CLOUDINARY_API_SECRET",
    required: true,
    description: "Cloudinary API secret",
  },
  {
    name: "EMAIL_HOST",
    required: false,
    description: "SMTP host for sending emails",
  },
  {
    name: "EMAIL_PORT",
    required: false,
    description: "SMTP port",
  },
  {
    name: "EMAIL_USER",
    required: false,
    description: "Email username for SMTP",
  },
  {
    name: "EMAIL_PASSWORD",
    required: false,
    description: "Email password for SMTP",
  },
  {
    name: "FRONTEND_URL",
    required: false,
    description: "Frontend URL for CORS",
  },
  {
    name: "PORT",
    required: false,
    description: "Server port",
  },
  {
    name: "NODE_ENV",
    required: false,
    description: "Environment mode (development/production)",
  },
];

export const validateEnvironment = (): void => {
  const missingRequired: string[] = [];
  const missingOptional: string[] = [];

  console.log("\n🔍 Validating environment variables...\n");

  ENV_VARIABLES.forEach((envVar) => {
    const value = process.env[envVar.name];

    if (!value || value.trim() === "") {
      if (envVar.required) {
        missingRequired.push(envVar.name);
        console.error(
          `❌ MISSING REQUIRED: ${envVar.name}${
            envVar.description ? ` - ${envVar.description}` : ""
          }`
        );
      } else {
        missingOptional.push(envVar.name);
        console.warn(
          `⚠️  MISSING OPTIONAL: ${envVar.name}${
            envVar.description ? ` - ${envVar.description}` : ""
          }`
        );
      }
    } else {
      // Mask sensitive values
      const maskedValue =
        envVar.name.includes("SECRET") ||
        envVar.name.includes("PASSWORD") ||
        envVar.name.includes("KEY")
          ? "***" + value.slice(-4)
          : value.length > 50
          ? value.slice(0, 30) + "..." + value.slice(-10)
          : value;

      console.log(`✅ ${envVar.name}: ${maskedValue}`);
    }
  });

  console.log("\n");

  if (missingRequired.length > 0) {
    console.error("❌ FATAL: Missing required environment variables!\n");
    console.error("Please ensure the following are set in your .env file:");
    missingRequired.forEach((varName) => {
      const envConfig = ENV_VARIABLES.find((v) => v.name === varName);
      console.error(
        `  - ${varName}${
          envConfig?.description ? `: ${envConfig.description}` : ""
        }`
      );
    });
    console.error("\nServer cannot start without these variables.\n");
    process.exit(1);
  }

  if (missingOptional.length > 0) {
    console.warn("⚠️  Some optional environment variables are not set:");
    missingOptional.forEach((varName) => {
      const envConfig = ENV_VARIABLES.find((v) => v.name === varName);
      console.warn(
        `  - ${varName}${
          envConfig?.description ? `: ${envConfig.description}` : ""
        }`
      );
    });
    console.warn("Some features may not work as expected.\n");
  }

  console.log("✅ Environment validation complete!\n");
};

// Additional validation for specific values
export const validateSpecificValues = (): void => {
  // Validate JWT_SECRET length
  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret && jwtSecret.length < 32) {
    console.warn(
      "⚠️  WARNING: JWT_SECRET should be at least 32 characters for better security"
    );
  }

  // Validate NODE_ENV
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv && !["development", "production", "test"].includes(nodeEnv)) {
    console.warn(
      `⚠️  WARNING: NODE_ENV is set to "${nodeEnv}". Expected: development, production, or test`
    );
  }

  // Validate PORT
  const port = process.env.PORT;
  if (
    port &&
    (isNaN(Number(port)) || Number(port) < 1 || Number(port) > 65535)
  ) {
    console.warn(`⚠️  WARNING: PORT "${port}" is not a valid port number`);
  }
};

export default {
  validateEnvironment,
  validateSpecificValues,
};
