import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to check validation results
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array(),
    });
  }
  next();
};

/**
 * Validation rules for contact form
 */
export const contactValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be 2-100 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[\d+\-() ]+$/)
    .withMessage("Invalid phone number format"),

  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 5, max: 200 })
    .withMessage("Subject must be 5-200 characters"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be 10-2000 characters"),
];

/**
 * Validation rules for registration
 */
export const registrationValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be 2-100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("mobileNumber")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .matches(/^\+?[\d\s\-()]+$/)
    .withMessage("Invalid mobile number format"),

  body("eventIds")
    .isArray({ min: 1 })
    .withMessage("At least one event must be selected")
    .custom((value) => {
      if (value.some((id: any) => typeof id !== "string")) {
        throw new Error("Invalid event ID format");
      }
      return true;
    }),
];

/**
 * Validation rules for event creation
 */
export const eventValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be 3-200 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 5000 })
    .withMessage("Description must be 10-5000 characters"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["LITERATURE", "ART", "WORKSHOP", "PERFORMANCE", "OTHER"])
    .withMessage("Invalid category"),

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),

  body("maxParticipants")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Max participants must be a positive integer"),

  body("registrationFee")
    .isFloat({ min: 0 })
    .withMessage("Registration fee must be a non-negative number"),
];

/**
 * Validation rules for login
 */
export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

/**
 * Validation rules for signup
 */
export const signupValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be 2-100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain uppercase, lowercase, and number"),

  body("mobileNumber")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .matches(/^\+?[\d\s\-()]+$/)
    .withMessage("Invalid mobile number format"),
];
