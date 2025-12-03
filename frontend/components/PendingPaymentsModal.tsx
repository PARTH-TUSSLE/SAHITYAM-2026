"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "@/lib/api";
import SuccessModal from "./SuccessModal";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  mobileNumber?: string;
}

interface Event {
  id: string;
  title: string;
  subtitle: string | null;
}

interface PendingPayment {
  id: string;
  userId: string;
  eventId: string;
  transactionId: string | null;
  paymentScreenshotUrl: string | null;
  registrantName: string | null;
  registrantEmail: string | null;
  registrantMobile: string | null;
  paymentVerified: boolean;
  paymentStatus: "PENDING" | "VERIFIED" | "REJECTED";
  createdAt: string;
  user: User;
  event: Event;
}

interface PendingPaymentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingPayments: PendingPayment[];
  onPaymentVerified: () => void;
}

export default function PendingPaymentsModal({
  isOpen,
  onClose,
  pendingPayments,
  onPaymentVerified,
}: PendingPaymentsModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<PendingPayment | null>(
    null
  );
  const [verifying, setVerifying] = useState(false);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });

  // Filter pending payments based on search query
  const filteredPayments = pendingPayments.filter((payment) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    const name = (
      payment.registrantName ||
      payment.user.name ||
      ""
    ).toLowerCase();
    const email = (
      payment.registrantEmail ||
      payment.user.email ||
      ""
    ).toLowerCase();
    const mobile = (
      payment.registrantMobile ||
      payment.user.mobileNumber ||
      ""
    ).toLowerCase();

    return (
      name.includes(query) || email.includes(query) || mobile.includes(query)
    );
  });

  const handleVerifyPayment = async (
    registrationId: string,
    verified: boolean
  ) => {
    try {
      setVerifying(true);
      setVerifyingId(registrationId);
      await apiClient.patch(`/admin/verify-payment/${registrationId}`, {
        verified,
      });

      setSuccessModal({
        isOpen: true,
        title: verified
          ? "Payment Verified!"
          : "Payment Rejected & User Unregistered",
        message: verified
          ? "The payment has been verified successfully. The user can now access the event."
          : "The payment has been rejected and the user has been automatically unregistered from the event. They can register again with a valid payment.",
        type: verified ? "success" : "error",
      });

      onPaymentVerified();
      setSelectedPayment(null);
    } catch (error: any) {
      setSuccessModal({
        isOpen: true,
        title: "Verification Failed",
        message:
          error.response?.data?.error ||
          "Failed to verify payment. Please try again.",
        type: "error",
      });
    } finally {
      setVerifying(false);
      setVerifyingId(null);
    }
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setImageModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 truncate">
                      Pending Payment Verifications
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                      {filteredPayments.length} payment
                      {filteredPayments.length !== 1 ? "s" : ""} awaiting
                      verification
                      {searchQuery &&
                        ` (filtered from ${pendingPayments.length})`}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
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
                </div>

                {/* Search Bar */}
                <div className="mt-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name, email, or mobile number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2.5 sm:py-3 pl-11 sm:pl-12 pr-10 text-sm sm:text-base bg-white border-2 border-purple-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all placeholder:text-gray-400"
                    />
                    <svg
                      className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 lg:p-6 pb-6 sm:pb-8 overflow-y-auto max-h-[calc(95vh-100px)] sm:max-h-[calc(90vh-120px)]">
                {filteredPayments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-green-600"
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
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {searchQuery ? "No Matching Payments" : "All Caught Up!"}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      {searchQuery
                        ? `No pending payments match "${searchQuery}"`
                        : "No pending payments to verify at the moment."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                    {filteredPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="bg-linear-to-br from-purple-50 via-pink-50 to-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-purple-200 hover:border-purple-300 transition-all ring-1 ring-purple-100/50"
                      >
                        {/* Event Info */}
                        <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-purple-200">
                          <div className="flex items-start sm:items-center justify-between gap-2 mb-2">
                            <h3 className="font-bold text-gray-900 text-base sm:text-lg flex-1 min-w-0">
                              {payment.event.title}
                            </h3>
                            <span className="px-2 sm:px-3 py-1 bg-linear-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-xs font-bold rounded-full whitespace-nowrap shadow-md shadow-purple-300/50">
                              PENDING
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Registered on{" "}
                            {new Date(payment.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>

                        {/* User Details */}
                        <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">
                              User Name
                            </p>
                            <p className="font-bold text-sm sm:text-base text-gray-900 truncate">
                              {payment.registrantName || payment.user.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">
                              Email
                            </p>
                            <p className="text-xs sm:text-sm text-gray-700 break-all">
                              {payment.registrantEmail || payment.user.email}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">
                              Mobile
                            </p>
                            <p className="font-semibold text-sm sm:text-base text-gray-900">
                              {payment.registrantMobile ||
                                payment.user.mobileNumber ||
                                "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">
                              Transaction ID
                            </p>
                            <p className="font-mono text-xs sm:text-sm bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-purple-200 break-all">
                              {payment.transactionId || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Payment Screenshot */}
                        {payment.paymentScreenshotUrl && (
                          <div className="mb-3 sm:mb-4">
                            <p className="text-xs text-gray-500 font-medium mb-2">
                              Payment Screenshot
                            </p>
                            <div
                              className="relative h-40 sm:h-48 bg-white rounded-lg overflow-hidden border-2 border-purple-200 cursor-pointer hover:border-purple-400 transition-colors group ring-1 ring-purple-100/30"
                              onClick={() =>
                                openImageModal(payment.paymentScreenshotUrl!)
                              }
                            >
                              <Image
                                src={payment.paymentScreenshotUrl}
                                alt="Payment Screenshot"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain group-hover:scale-105 transition-transform"
                                unoptimized
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2">
                                  <svg
                                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 sm:gap-3">
                          <button
                            onClick={() =>
                              handleVerifyPayment(payment.id, true)
                            }
                            disabled={verifying}
                            className={`flex-1 bg-linear-to-r from-green-500 to-green-600 text-white font-bold py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base ${
                              verifying && verifyingId === payment.id
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            {verifying && verifyingId === payment.id ? (
                              <>
                                <span className="relative inline-flex h-4 w-4 sm:h-5 sm:w-5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                                  <span className="relative inline-flex rounded-full h-full w-full border-2 border-white border-t-transparent animate-spin"></span>
                                </span>
                                <span className="hidden sm:inline">
                                  Verifying...
                                </span>
                                <span className="sm:hidden">...</span>
                              </>
                            ) : (
                              <>
                                <svg
                                  className="w-4 h-4 sm:w-5 sm:h-5"
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
                                Verify
                              </>
                            )}
                          </button>
                          <button
                            onClick={() =>
                              handleVerifyPayment(payment.id, false)
                            }
                            disabled={verifying}
                            className={`flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base ${
                              verifying && verifyingId === payment.id
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            {verifying && verifyingId === payment.id ? (
                              <>
                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span className="hidden sm:inline">
                                  Processing...
                                </span>
                                <span className="sm:hidden">...</span>
                              </>
                            ) : (
                              <>
                                <svg
                                  className="w-4 h-4 sm:w-5 sm:h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Reject
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => {
          setSuccessModal({ ...successModal, isOpen: false });
        }}
        title={successModal.title}
        message={successModal.message}
        type={successModal.type}
      />

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {imageModalOpen && selectedImageUrl && (
          <div
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
            onClick={() => setImageModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-6xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedImageUrl}
                  alt="Payment Screenshot Zoomed"
                  fill
                  sizes="100vw"
                  className="object-contain"
                  unoptimized
                />
              </div>
              <button
                onClick={() => setImageModalOpen(false)}
                className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors shadow-lg"
              >
                <svg
                  className="w-6 h-6 text-gray-900"
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
