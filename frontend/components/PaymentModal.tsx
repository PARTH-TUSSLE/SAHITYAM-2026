"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventFee: number;
  onSubmit: (paymentData: PaymentData) => void;
  isLoading?: boolean;
  userEmail?: string;
  userMobile?: string;
}

export interface PaymentData {
  eventId: string;
  name: string;
  email: string;
  mobileNumber: string;
  transactionId: string;
  paymentScreenshot: File | null;
}

export default function PaymentModal({
  isOpen,
  onClose,
  eventTitle,
  eventFee,
  onSubmit,
  isLoading = false,
  userEmail = "",
  userMobile = "",
}: PaymentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: userEmail,
    mobileNumber: userMobile,
    transactionId: "",
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update email and mobile when user data changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        email: userEmail,
        mobileNumber: userMobile,
      }));
    }
  }, [isOpen, userEmail, userMobile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          screenshot: "File size should be less than 5MB",
        });
        return;
      }
      setPaymentScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrors({ ...errors, screenshot: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobileNumber))
      newErrors.mobileNumber = "Invalid mobile number (10 digits required)";
    if (!formData.transactionId.trim())
      newErrors.transactionId = "Transaction ID is required";
    if (!paymentScreenshot)
      newErrors.screenshot = "Payment screenshot is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real scenario, you would pass eventId as well
      const paymentData: PaymentData = {
        eventId: "", // This will be set by the parent component
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        transactionId: formData.transactionId,
        paymentScreenshot,
      };
      onSubmit(paymentData);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({ name: "", email: "", mobileNumber: "", transactionId: "" });
      setPaymentScreenshot(null);
      setPreviewUrl(null);
      setErrors({});
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-pink-100">
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="pr-12">
                <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent pb-1">
                  Complete Registration
                </h2>
                <p className="text-gray-700 mt-2 font-medium">{eventTitle}</p>
                <div className="mt-3 inline-block px-4 py-2 bg-pink-500 text-white rounded-full font-bold">
                  Registration Fee: ₹{eventFee}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-200px)] scrollbar-hide">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* QR Code Section */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border-2 border-pink-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <svg
                        className="w-6 h-6 text-pink-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                      </svg>
                      Scan QR Code to Pay
                    </h3>
                    <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                      <div className="relative w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center border-4 border-pink-200">
                        {/* Placeholder for QR Code - Replace with actual QR code image */}
                        <div className="text-center">
                          <svg
                            className="w-full h-full text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                            />
                          </svg>
                          <p className="text-sm text-gray-500 mt-2">
                            QR Code Here
                          </p>
                        </div>
                        {/* Uncomment and use when you have actual QR code image */}
                        {/* <Image
                          src="/qr-code.png"
                          alt="Payment QR Code"
                          fill
                          className="object-contain"
                        /> */}
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-gray-700">
                      <p className="flex items-start gap-2">
                        <span className="text-pink-500 mt-1">•</span>
                        <span>Scan the QR code using any UPI app</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-pink-500 mt-1">•</span>
                        <span>Pay ₹{eventFee} for registration</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-pink-500 mt-1">•</span>
                        <span>Take a screenshot of successful payment</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-pink-500 mt-1">•</span>
                        <span>Upload the screenshot below</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Section */}
                <div className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:bg-white transition-all outline-none font-medium"
                        placeholder="Enter your full name"
                        disabled={isLoading}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Email Address *{" "}
                        <span className="text-gray-500 text-xs font-normal">
                          (from your profile)
                        </span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        readOnly
                        className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl outline-none font-medium text-gray-600 cursor-not-allowed"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Mobile Number *{" "}
                        <span className="text-gray-500 text-xs font-normal">
                          (from your profile)
                        </span>
                      </label>
                      <input
                        type="tel"
                        value={formData.mobileNumber}
                        readOnly
                        className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl outline-none font-medium text-gray-700 cursor-not-allowed"
                        placeholder={
                          formData.mobileNumber
                            ? ""
                            : "Mobile number not found in profile"
                        }
                      />
                      {errors.mobileNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.mobileNumber}
                        </p>
                      )}
                    </div>

                    {/* Transaction ID */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Transaction ID / UPI Reference Number *
                      </label>
                      <input
                        type="text"
                        value={formData.transactionId}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            transactionId: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:bg-white transition-all outline-none font-medium"
                        placeholder="Enter transaction ID"
                        disabled={isLoading}
                      />
                      {errors.transactionId && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.transactionId}
                        </p>
                      )}
                    </div>

                    {/* Payment Screenshot Upload */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Payment Screenshot *
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="payment-screenshot"
                          disabled={isLoading}
                        />
                        <label
                          htmlFor="payment-screenshot"
                          className="flex flex-col items-center justify-center w-full h-32 px-4 py-6 bg-gray-50 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            className="w-8 h-8 text-gray-400 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="text-sm text-gray-600 font-medium">
                            {paymentScreenshot
                              ? paymentScreenshot.name
                              : "Click to upload payment screenshot"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG up to 5MB
                          </p>
                        </label>
                      </div>
                      {errors.screenshot && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.screenshot}
                        </p>
                      )}

                      {/* Preview */}
                      {previewUrl && (
                        <div className="mt-4 relative w-full h-40 rounded-xl overflow-hidden border-2 border-pink-200">
                          <Image
                            src={previewUrl}
                            alt="Payment screenshot preview"
                            fill
                            className="object-contain bg-gray-50"
                          />
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-pink-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            Complete Registration
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
