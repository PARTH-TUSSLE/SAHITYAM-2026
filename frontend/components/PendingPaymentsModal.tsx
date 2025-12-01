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
        title: verified ? "Payment Verified!" : "Payment Rejected",
        message: verified
          ? "The payment has been verified successfully. The user can now access the event."
          : "The payment has been rejected. The user can see this status in their profile and may register again with a valid payment.",
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-pink-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">
                      Pending Payment Verifications
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {pendingPayments.length} payment
                      {pendingPayments.length !== 1 ? "s" : ""} awaiting
                      verification
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors"
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
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {pendingPayments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10 text-green-600"
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      All Caught Up!
                    </h3>
                    <p className="text-gray-600">
                      No pending payments to verify at the moment.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {pendingPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200 hover:border-pink-300 transition-all"
                      >
                        {/* Event Info */}
                        <div className="mb-4 pb-4 border-b border-pink-200">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-gray-900 text-lg">
                              {payment.event.title}
                            </h3>
                            <span className="px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
                              PENDING
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
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
                        <div className="space-y-3 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">
                              User Name
                            </p>
                            <p className="font-bold text-gray-900">
                              {payment.registrantName || payment.user.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">
                              Email
                            </p>
                            <p className="text-gray-700">
                              {payment.registrantEmail || payment.user.email}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">
                              Mobile
                            </p>
                            <p className="font-semibold text-gray-900">
                              {payment.registrantMobile ||
                                payment.user.mobileNumber ||
                                "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">
                              Transaction ID
                            </p>
                            <p className="font-mono text-sm bg-white px-3 py-2 rounded-lg border border-pink-200">
                              {payment.transactionId || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Payment Screenshot */}
                        {payment.paymentScreenshotUrl && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 font-medium mb-2">
                              Payment Screenshot
                            </p>
                            <div
                              className="relative h-48 bg-white rounded-lg overflow-hidden border-2 border-pink-200 cursor-pointer hover:border-pink-400 transition-colors group"
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
                                    className="w-6 h-6 text-gray-900"
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
                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              handleVerifyPayment(payment.id, true)
                            }
                            disabled={verifying}
                            className={`flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                              verifying && verifyingId === payment.id
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            {verifying && verifyingId === payment.id ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Verifying...
                              </>
                            ) : (
                              <>
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
                                Verify
                              </>
                            )}
                          </button>
                          <button
                            onClick={() =>
                              handleVerifyPayment(payment.id, false)
                            }
                            disabled={verifying}
                            className={`flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                              verifying && verifyingId === payment.id
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            {verifying && verifyingId === payment.id ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                              </>
                            ) : (
                              <>
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
