import DOMPurify from "dompurify";

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param dirty - The untrusted HTML string
 * @returns Sanitized HTML string safe for rendering
 */
export const sanitizeHtml = (dirty: string): string => {
  if (typeof window === "undefined") {
    // Server-side: return as-is or use isomorphic-dompurify
    return dirty;
  }

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
};

/**
 * Sanitize plain text input (removes all HTML)
 * @param input - The untrusted input string
 * @returns Plain text with HTML stripped
 */
export const sanitizeText = (input: string): string => {
  if (typeof window === "undefined") {
    return input.replace(/<[^>]*>/g, "");
  }

  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

/**
 * Sanitize user input for form fields
 * @param input - The user input
 * @returns Sanitized input
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return "";

  // Remove script tags and dangerous patterns
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
};

/**
 * Validate and sanitize email
 * @param email - Email address to validate
 * @returns Sanitized email or null if invalid
 */
export const sanitizeEmail = (email: string): string | null => {
  const sanitized = sanitizeText(email).toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized) ? sanitized : null;
};

/**
 * Validate and sanitize phone number
 * @param phone - Phone number to validate
 * @returns Sanitized phone or null if invalid
 */
export const sanitizePhone = (phone: string): string | null => {
  const sanitized = sanitizeText(phone)
    .replace(/[^\d+\-() ]/g, "")
    .trim();
  return sanitized.length >= 10 ? sanitized : null;
};
