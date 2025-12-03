import jwt from "jsonwebtoken";

const getJWTSecret = (): string => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error(
      "FATAL ERROR: JWT_SECRET environment variable is not set. " +
        "Please set JWT_SECRET in your .env file for security."
    );
  }

  return JWT_SECRET;
};

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, getJWTSecret(), { expiresIn: "7d" });
};

export const verifyToken = (
  token: string
): { userId: string; role: string } | null => {
  try {
    const decoded = jwt.verify(token, getJWTSecret()) as {
      userId: string;
      role: string;
    };
    return decoded;
  } catch (error) {
    return null;
  }
};
