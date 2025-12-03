import { useState } from "react";

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message: string;
}

interface FieldValidation {
  [key: string]: ValidationRule[];
}

export function useFormValidation(validationRules: FieldValidation) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (name: string, value: string): string | null => {
    const rules = validationRules[name];
    if (!rules) return null;

    for (const rule of rules) {
      // Required validation
      if (rule.required && !value.trim()) {
        return rule.message;
      }

      // Skip other validations if field is empty and not required
      if (!value.trim()) continue;

      // Min length validation
      if (rule.minLength && value.length < rule.minLength) {
        return rule.message;
      }

      // Max length validation
      if (rule.maxLength && value.length > rule.maxLength) {
        return rule.message;
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message;
      }

      // Custom validation
      if (rule.custom && !rule.custom(value)) {
        return rule.message;
      }
    }

    return null;
  };

  const validate = (formData: { [key: string]: string }): boolean => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName] || "");
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const validateSingleField = (name: string, value: string) => {
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error || "",
    }));
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const clearError = (name: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
    setTouched({});
  };

  return {
    errors,
    touched,
    validate,
    validateSingleField,
    handleBlur,
    clearError,
    clearAllErrors,
  };
}

// Common validation rules
export const commonValidations = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  phone: {
    pattern: /^[\d+\-() ]{10,}$/,
    message: "Please enter a valid phone number (minimum 10 digits)",
  },
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s]+$/,
    message: "Name must be 2-100 characters and contain only letters",
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message:
      "Password must be at least 8 characters with uppercase, lowercase, and number",
  },
};

// FormError component for displaying validation errors
export function FormError({ error }: { error?: string }) {
  if (!error) return null;

  return (
    <div className="flex items-start gap-2 mt-1 text-red-600 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
      <svg
        className="w-4 h-4 flex-shrink-0 mt-0.5"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span>{error}</span>
    </div>
  );
}

// FormInput component with built-in validation display
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
}

export function FormInput({
  label,
  error,
  touched,
  className = "",
  ...props
}: FormInputProps) {
  const showError = touched && error;

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-bold text-gray-900 mb-2"
      >
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 border-2 transition-all duration-300 outline-none ${
          showError
            ? "border-red-400 focus:border-red-500 focus:bg-red-50"
            : "border-gray-200 focus:border-purple-400 focus:bg-white"
        } ${className}`}
      />
      {showError && <FormError error={error} />}
    </div>
  );
}

// FormTextarea component with built-in validation display
interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  touched?: boolean;
}

export function FormTextarea({
  label,
  error,
  touched,
  className = "",
  ...props
}: FormTextareaProps) {
  const showError = touched && error;

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-bold text-gray-900 mb-2"
      >
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        {...props}
        className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 border-2 transition-all duration-300 outline-none resize-none ${
          showError
            ? "border-red-400 focus:border-red-500 focus:bg-red-50"
            : "border-gray-200 focus:border-purple-400 focus:bg-white"
        } ${className}`}
      />
      {showError && <FormError error={error} />}
    </div>
  );
}
