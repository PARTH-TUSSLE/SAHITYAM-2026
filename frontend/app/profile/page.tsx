"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import apiClient from "@/lib/api";
import BackgroundElements from "@/components/ui/BackgroundElements";
import PremiumSpinner from "@/components/PremiumSpinner";

interface Registration {
  id: string;
  eventId: string;
  createdAt: string;
  paymentVerified: boolean;
  paymentStatus: "PENDING" | "VERIFIED" | "REJECTED";
  rejectionReason?: string | null;
  isActive: boolean;
  event: {
    id: string;
    title: string;
    subtitle: string | null;
    description: string;
    image: string;
  };
}

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingRegistrations, setLoadingRegistrations] = useState(true);
  const [unregisteringEventId, setUnregisteringEventId] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoadingRegistrations(true);
        const response = await apiClient.get("/registrations/my-registrations");

        if (!response.data || !Array.isArray(response.data)) {
          console.warn("Invalid registrations response format");
          setRegistrations([]);
          return;
        }

        setRegistrations(response.data);
      } catch (err: any) {
        console.error("Error fetching registrations:", err);
        // Set empty array instead of keeping loading state
        setRegistrations([]);
      } finally {
        setLoadingRegistrations(false);
      }
    };

    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  const handleUnregister = async (eventId: string) => {
    if (!eventId) {
      console.error("Invalid event ID");
      return;
    }

    // Confirm before unregistering
    const confirmed = window.confirm(
      "Are you sure you want to remove this event from your profile? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setUnregisteringEventId(eventId);
      await apiClient.delete(`/registrations/${eventId}`);
      // Remove the registration from the state completely
      setRegistrations((prev) => prev.filter((reg) => reg.eventId !== eventId));
    } catch (err: any) {
      console.error("Error unregistering:", err);
      const errorMessage =
        err.response?.data?.error ||
        "Failed to remove event. Please try again.";
      alert(errorMessage);
    } finally {
      setUnregisteringEventId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PremiumSpinner size="xl" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <BackgroundElements />
      <div className="min-h-screen relative overflow-hidden pt-20 pb-12">
        {/* Animated Background */}

        {/* Decorative Pattern */}
        {/* Decorative pattern overlay removed */}

        <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
          {/* Profile Header */}
          <div className="relative mb-8">
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md ring-2 ring-purple-200/50">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-3 border-white shadow-md">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {user?.name}
                  </h1>
                  <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                      @{user?.username}
                    </span>
                    <span className="hidden md:block text-gray-300">•</span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {user?.email}
                    </span>
                    {user?.mobileNumber && (
                      <>
                        <span className="hidden md:block text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                          </svg>
                          {user.mobileNumber}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
                    <div className="bg-purple-50 rounded-lg px-4 py-2 border border-purple-200 ring-1 ring-purple-100/50">
                      <div className="text-lg font-bold text-purple-600">
                        {
                          registrations.filter(
                            (r) => r.isActive && r.paymentStatus !== "REJECTED"
                          ).length
                        }
                      </div>
                      <div className="text-xs text-gray-600">Active Events</div>
                    </div>
                    <div className="bg-green-50 rounded-lg px-4 py-2 border border-green-200">
                      <div className="text-lg font-bold text-green-600">
                        {
                          registrations.filter(
                            (r) => r.paymentVerified && r.isActive
                          ).length
                        }
                      </div>
                      <div className="text-xs text-gray-600">Verified</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg px-4 py-2 border border-yellow-200">
                      <div className="text-lg font-bold text-yellow-600">
                        {
                          registrations.filter(
                            (r) =>
                              !r.paymentVerified &&
                              r.paymentStatus === "PENDING" &&
                              r.isActive
                          ).length
                        }
                      </div>
                      <div className="text-xs text-gray-600">Pending</div>
                    </div>
                    <div className="bg-red-50 rounded-lg px-4 py-2 border border-red-200">
                      <div className="text-lg font-bold text-red-600">
                        {
                          registrations.filter(
                            (r) => r.paymentStatus === "REJECTED"
                          ).length
                        }
                      </div>
                      <div className="text-xs text-gray-600">Rejected</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                      <div className="text-lg font-bold text-gray-600">
                        {
                          registrations.filter(
                            (r) => !r.isActive && r.paymentStatus !== "REJECTED"
                          ).length
                        }
                      </div>
                      <div className="text-xs text-gray-600">Inactive</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registrations Section */}
          <div className="relative space-y-8">
            {/* Active Registrations */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                My Registered Events
              </h2>

              {loadingRegistrations ? (
                <div className="flex justify-center py-12">
                  <PremiumSpinner size="lg" />
                </div>
              ) : registrations.filter(
                  (r) => r.isActive && r.paymentStatus !== "REJECTED"
                ).length === 0 ? (
                <div className="text-center py-16 relative">
                  <div className="inline-block mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                    <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 rounded-3xl flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 text-xl font-bold mb-2">
                    No events registered yet
                  </p>
                  <p className="text-gray-600 mb-6">
                    Start your journey by exploring amazing events!
                  </p>
                  <button
                    onClick={() => router.push("/events")}
                    className="relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-600/50 transition-all transform hover:scale-105 overflow-hidden group ring-1 ring-white/20"
                  >
                    <span className="relative z-10">Browse Events</span>
                    <svg
                      className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12"></div>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {registrations
                    .filter((r) => r.isActive && r.paymentStatus !== "REJECTED")
                    .map((registration) => (
                      <div
                        key={`active-${registration.id}`}
                        className="group relative"
                      >
                        {/* Card Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={registration.event.image}
                              alt={registration.event.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                            {/* Event Title */}
                            <h3 className="absolute bottom-4 left-4 right-4 text-xl font-black text-white drop-shadow-2xl">
                              {registration.event.title}
                            </h3>

                            {/* Payment Status Badge */}
                            {registration.paymentStatus === "VERIFIED" ? (
                              <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Verified
                              </div>
                            ) : registration.paymentStatus === "PENDING" ? (
                              <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Pending
                              </div>
                            ) : (
                              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Rejected
                              </div>
                            )}
                          </div>

                          <div className="p-5">
                            {registration.event.subtitle && (
                              <p className="text-gray-600 text-sm font-medium mb-4 line-clamp-2">
                                {registration.event.subtitle}
                              </p>
                            )}

                            {/* Rejection Notice */}
                            {registration.paymentStatus === "REJECTED" && (
                              <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                                <div className="flex items-start gap-1.5 sm:gap-2">
                                  <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm font-bold text-red-800 mb-0.5 sm:mb-1">
                                      Payment Rejected
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-red-700 leading-tight sm:leading-normal">
                                      {registration.rejectionReason ||
                                        "Your payment verification was rejected. Please verify your payment details and register again with correct information."}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500 font-medium">
                                <svg
                                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {new Date(
                                  registration.createdAt
                                ).toLocaleDateString()}
                              </div>

                              {registration.paymentStatus === "REJECTED" ? (
                                <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto">
                                  <button
                                    onClick={() => router.push(`/events`)}
                                    className="relative flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-[10px] sm:text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-2 shadow-md shadow-green-500/40 hover:shadow-lg hover:shadow-green-600/50 overflow-hidden group ring-1 ring-white/20"
                                  >
                                    <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                                      <svg
                                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                      </svg>
                                      <span className="xs:inline sm:hidden">
                                        Re-reg
                                      </span>
                                      <span className="hidden sm:inline">
                                        Re-register
                                      </span>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500 skew-x-12"></div>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleUnregister(registration.eventId)
                                    }
                                    disabled={
                                      unregisteringEventId ===
                                      registration.eventId
                                    }
                                    className={`relative flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-[10px] sm:text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-2 shadow-md shadow-red-500/40 hover:shadow-lg hover:shadow-red-600/50 overflow-hidden group ring-1 ring-white/20 ${
                                      unregisteringEventId ===
                                      registration.eventId
                                        ? "opacity-70 cursor-not-allowed"
                                        : ""
                                    }`}
                                  >
                                    <span className="relative z-10 flex items-center gap-1">
                                      {unregisteringEventId ===
                                      registration.eventId ? (
                                        <PremiumSpinner
                                          size="sm"
                                          variant="inline"
                                        />
                                      ) : (
                                        <>
                                          <svg
                                            className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                          <span>Remove</span>
                                        </>
                                      )}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500 skew-x-12"></div>
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleUnregister(registration.eventId)
                                  }
                                  disabled={
                                    unregisteringEventId ===
                                    registration.eventId
                                  }
                                  className={`relative px-5 py-2.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white text-sm font-bold rounded-lg transition-all flex items-center gap-2 shadow-md shadow-purple-500/40 hover:shadow-lg hover:shadow-purple-600/50 overflow-hidden group ring-1 ring-white/20 ${
                                    unregisteringEventId ===
                                    registration.eventId
                                      ? "opacity-70 cursor-not-allowed"
                                      : ""
                                  }`}
                                >
                                  <span className="relative z-10 flex items-center gap-2">
                                    {unregisteringEventId ===
                                    registration.eventId ? (
                                      <>
                                        <PremiumSpinner
                                          size="sm"
                                          variant="inline"
                                        />
                                        <span>Loading...</span>
                                      </>
                                    ) : (
                                      <>
                                        <svg
                                          className="w-4 h-4"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                        Unregister
                                      </>
                                    )}
                                  </span>
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12"></div>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Inactive Registrations Section */}
            {registrations.filter(
              (r) => !r.isActive && r.paymentStatus !== "REJECTED"
            ).length > 0 && (
              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    Inactive Registrations
                  </h2>
                  <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                    {
                      registrations.filter(
                        (r) => !r.isActive && r.paymentStatus !== "REJECTED"
                      ).length
                    }
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Events you have unregistered from.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {registrations
                    .filter(
                      (r) => !r.isActive && r.paymentStatus !== "REJECTED"
                    )
                    .map((registration) => (
                      <div
                        key={`inactive-${registration.id}`}
                        className="group relative opacity-75"
                      >
                        {/* Card Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={registration.event.image}
                              alt={registration.event.title}
                              className="w-full h-full object-cover grayscale"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                            {/* Event Title */}
                            <h3 className="absolute bottom-4 left-4 right-4 text-xl font-black text-white drop-shadow-2xl">
                              {registration.event.title}
                            </h3>

                            {/* Inactive Badge */}
                            <div className="absolute top-4 right-4 bg-gray-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Inactive
                            </div>
                          </div>

                          <div className="p-5">
                            {registration.event.subtitle && (
                              <p className="text-gray-600 text-sm font-medium mb-4 line-clamp-2">
                                {registration.event.subtitle}
                              </p>
                            )}

                            {/* Unregistered Notice */}
                            <div className="mb-4 p-3 bg-gray-50 border-l-4 border-gray-400 rounded-r-lg">
                              <div className="flex items-start gap-2">
                                <svg
                                  className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-800 mb-1">
                                    Unregistered
                                  </p>
                                  <p className="text-xs text-gray-700">
                                    You unregistered from this event.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                              <svg
                                className="w-4 h-4 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {new Date(
                                registration.createdAt
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Rejected Payments Section */}
            {registrations.filter((r) => r.paymentStatus === "REJECTED")
              .length > 0 && (
              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-8 border border-red-200">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-red-900">
                    Rejected Payments
                  </h2>
                  <div className="px-3 py-1 bg-red-100 rounded-full text-xs font-bold text-red-600">
                    {
                      registrations.filter(
                        (r) => r.paymentStatus === "REJECTED"
                      ).length
                    }
                  </div>
                </div>
                <p className="text-sm text-red-600 mb-6">
                  Events where your payment verification was rejected. You can
                  re-register for these events.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {registrations
                    .filter((r) => r.paymentStatus === "REJECTED")
                    .map((registration) => (
                      <div
                        key={`rejected-${registration.id}`}
                        className="group relative opacity-90"
                      >
                        {/* Card Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-300 via-red-400 to-red-300 rounded-2xl blur opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>

                        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={registration.event.image}
                              alt={registration.event.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-900/40 to-transparent"></div>

                            {/* Event Title */}
                            <h3 className="absolute bottom-4 left-4 right-4 text-xl font-black text-white drop-shadow-2xl">
                              {registration.event.title}
                            </h3>

                            {/* Rejected Badge */}
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Payment Rejected
                            </div>
                          </div>

                          <div className="p-5">
                            {registration.event.subtitle && (
                              <p className="text-gray-600 text-sm font-medium mb-4 line-clamp-2">
                                {registration.event.subtitle}
                              </p>
                            )}

                            {/* Rejection Notice */}
                            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                              <div className="flex items-start gap-2">
                                <svg
                                  className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-red-800 mb-1">
                                    Payment Rejected
                                  </p>
                                  <p className="text-xs text-red-700">
                                    {registration.rejectionReason ||
                                      "Your payment verification was rejected."}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                <svg
                                  className="w-4 h-4 text-gray-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {new Date(
                                  registration.createdAt
                                ).toLocaleDateString()}
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => router.push(`/events`)}
                                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 shadow-md shadow-green-500/40 hover:shadow-lg hover:shadow-green-600/50"
                                >
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                  </svg>
                                  Re-register
                                </button>

                                <button
                                  onClick={() =>
                                    handleUnregister(registration.eventId)
                                  }
                                  disabled={
                                    unregisteringEventId ===
                                    registration.eventId
                                  }
                                  className={`px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 shadow-md shadow-red-500/40 hover:shadow-lg hover:shadow-red-600/50 ${
                                    unregisteringEventId ===
                                    registration.eventId
                                      ? "opacity-70 cursor-not-allowed"
                                      : ""
                                  }`}
                                >
                                  {unregisteringEventId ===
                                  registration.eventId ? (
                                    <PremiumSpinner
                                      size="sm"
                                      variant="inline"
                                    />
                                  ) : (
                                    <>
                                      <svg
                                        className="w-3.5 h-3.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Remove
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
