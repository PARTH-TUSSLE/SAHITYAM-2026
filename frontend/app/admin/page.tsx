"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import apiClient from "@/lib/api";
import BackgroundElements from "@/components/ui/BackgroundElements";
import PendingPaymentsModal from "@/components/PendingPaymentsModal";
import PremiumSpinner from "@/components/PremiumSpinner";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  mobileNumber?: string;
  createdAt: string;
}

interface Registration {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string;
  user: User;
  transactionId?: string | null;
  paymentScreenshotUrl?: string | null;
  registrantName?: string | null;
  registrantEmail?: string | null;
  registrantMobile?: string | null;
  paymentVerified?: boolean;
  paymentStatus?: "PENDING" | "VERIFIED" | "REJECTED";
}

interface Event {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  image: string;
  registrations: Registration[];
  registrationCount: number;
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
  rejectionReason: string | null;
  createdAt: string;
  user: User;
  event: {
    id: string;
    title: string;
    subtitle: string | null;
  };
}

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingEventDetails, setLoadingEventDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<"events" | "users">("events");
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([]);
  const [verifiedPayments, setVerifiedPayments] = useState<PendingPayment[]>(
    []
  );
  const [rejectedPayments, setRejectedPayments] = useState<PendingPayment[]>(
    []
  );
  const [inactiveRegistrations, setInactiveRegistrations] = useState<
    PendingPayment[]
  >([]);
  const [pendingPaymentsModalOpen, setPendingPaymentsModalOpen] =
    useState(false);
  const [paymentStatusTab, setPaymentStatusTab] = useState<
    "pending" | "verified" | "rejected"
  >("pending");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!loading && user?.role !== "ADMIN") {
      router.push("/");
      return;
    }
  }, [isAuthenticated, loading, user, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const [
          eventsResponse,
          pendingResponse,
          verifiedResponse,
          rejectedResponse,
          inactiveResponse,
        ] = await Promise.all([
          apiClient.get("/admin/events"),
          apiClient.get("/admin/pending-payments"),
          apiClient.get("/admin/verified-payments"),
          apiClient.get("/admin/rejected-payments"),
          apiClient.get("/admin/inactive-registrations"),
        ]);

        // Validate response data
        if (Array.isArray(eventsResponse.data)) {
          setEvents(eventsResponse.data);
        } else {
          console.warn("Invalid events response format");
          setEvents([]);
        }

        if (Array.isArray(pendingResponse.data)) {
          setPendingPayments(pendingResponse.data);
        } else {
          console.warn("Invalid pending payments response format");
          setPendingPayments([]);
        }

        if (Array.isArray(verifiedResponse.data)) {
          setVerifiedPayments(verifiedResponse.data);
        } else {
          console.warn("Invalid verified payments response format");
          setVerifiedPayments([]);
        }

        if (Array.isArray(rejectedResponse.data)) {
          setRejectedPayments(rejectedResponse.data);
        } else {
          console.warn("Invalid rejected payments response format");
          setRejectedPayments([]);
        }

        if (Array.isArray(inactiveResponse.data)) {
          setInactiveRegistrations(inactiveResponse.data);
        } else {
          console.warn("Invalid inactive registrations response format");
          setInactiveRegistrations([]);
        }
      } catch (err: any) {
        console.error("Error fetching admin data:", err);
        // Set empty arrays to prevent UI crashes
        setEvents([]);
        setPendingPayments([]);
        setVerifiedPayments([]);
        setRejectedPayments([]);
        setInactiveRegistrations([]);
      } finally {
        setLoadingData(false);
      }
    };

    if (isAuthenticated && user?.role === "ADMIN") {
      fetchData();
    }
  }, [isAuthenticated, user]);

  const refreshPendingPayments = async () => {
    try {
      const [
        pendingResponse,
        verifiedResponse,
        rejectedResponse,
        inactiveResponse,
      ] = await Promise.all([
        apiClient.get("/admin/pending-payments"),
        apiClient.get("/admin/verified-payments"),
        apiClient.get("/admin/rejected-payments"),
        apiClient.get("/admin/inactive-registrations"),
      ]);

      if (Array.isArray(pendingResponse.data)) {
        setPendingPayments(pendingResponse.data);
      } else {
        console.warn("Invalid pending payments response format");
      }

      if (Array.isArray(verifiedResponse.data)) {
        setVerifiedPayments(verifiedResponse.data);
      } else {
        console.warn("Invalid verified payments response format");
      }

      if (Array.isArray(rejectedResponse.data)) {
        setRejectedPayments(rejectedResponse.data);
      } else {
        console.warn("Invalid rejected payments response format");
      }

      if (Array.isArray(inactiveResponse.data)) {
        setInactiveRegistrations(inactiveResponse.data);
      } else {
        console.warn("Invalid inactive registrations response format");
      }
    } catch (err: any) {
      console.error("Error refreshing payment data:", err);
    }
  };

  const viewEventDetails = async (eventId: string) => {
    try {
      setLoadingEventDetails(true);
      setSearchQuery(""); // Reset search when opening new event details
      const response = await apiClient.get(`/admin/events/${eventId}`);
      setSelectedEvent(response.data);
    } catch (err) {
      console.error("Error fetching event details:", err);
    } finally {
      setLoadingEventDetails(false);
    }
  };

  // Filter registrations based on search query
  const filteredRegistrations =
    selectedEvent?.registrations.filter((registration) => {
      const query = searchQuery.toLowerCase();
      const nameMatch = registration.user.name.toLowerCase().includes(query);
      const mobileMatch = registration.user.mobileNumber
        ?.toLowerCase()
        .includes(query);
      return nameMatch || mobileMatch;
    }) || [];

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PremiumSpinner size="xl" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return null;
  }

  return (
    <>
      <Navbar />
      <BackgroundElements />
      <div className="min-h-screen relative overflow-hidden pt-20 pb-12">
        {/* Animated Background */}

        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 ring-2 ring-purple-200/50">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  Manage events and view registrations
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-white/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm font-medium">
                    Total Events
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                    {events.length}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-white/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm font-medium">
                    Total Registrations
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                    {events.reduce(
                      (sum, event) => sum + event.registrationCount,
                      0
                    )}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-white/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm font-medium">
                    Average per Event
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                    {events.length > 0
                      ? Math.round(
                          events.reduce(
                            (sum, event) => sum + event.registrationCount,
                            0
                          ) / events.length
                        )
                      : 0}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6 lg:mb-8">
            {/* Pending Payments Notification Button */}
            <button
              onClick={() => setPendingPaymentsModalOpen(true)}
              className="relative flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/40 transition-all transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 group ring-1 ring-white/20"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="text-sm sm:text-base">
                Payment Status
                {pendingPayments.length > 0 && (
                  <span className="ml-2 px-2 sm:px-2.5 py-0.5 bg-white text-purple-600 text-xs sm:text-sm font-black rounded-full">
                    {pendingPayments.length}
                  </span>
                )}
              </span>
              {pendingPayments.length > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 rounded-full animate-ping"></span>
                  <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 rounded-full"></span>
                </>
              )}
            </button>
          </div>

          {/* Events List */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-white/50 overflow-hidden">
            <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                Event Registrations
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base mt-1">
                View all events and their registered users
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-3 sm:p-4 lg:p-6 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 lg:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                        {event.title}
                      </h3>
                      {event.subtitle && (
                        <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
                          {event.subtitle}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 sm:mt-3">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span className="text-xs sm:text-sm font-medium text-gray-700">
                            {event.registrationCount} registered
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => viewEventDetails(event.id)}
                      className="px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-sm sm:text-base font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-200 hover:scale-105 whitespace-nowrap w-full sm:w-auto ring-1 ring-white/20"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading Modal for Event Details */}
      {loadingEventDetails && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex flex-col items-center space-y-6">
              {/* Premium Spinner */}
              <div className="relative">
                <div className="w-20 h-20 relative">
                  {/* Middle rotating ring */}
                  <div
                    className="absolute inset-2 rounded-full border-4 border-transparent border-b-indigo-500 border-l-purple-400 animate-spin"
                    style={{
                      animationDirection: "reverse",
                      animationDuration: "1.5s",
                    }}
                  ></div>
                  {/* Inner pulsing circle */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-indigo-500 animate-pulse"></div>
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 opacity-20 blur-xl animate-pulse"></div>
              </div>

              {/* Text content */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-gray-900 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Loading Registration Details
                </h3>
                <p className="text-gray-600 text-sm">
                  Please wait while we fetch the registrations...
                </p>
              </div>

              {/* Animated dots */}
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce shadow-lg shadow-purple-300/50"
                    style={{ animationDelay: `${i * 150}ms` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-3 lg:p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 truncate">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">
                  {selectedEvent.registrations.length} registered users
                </p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
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

            <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-120px)]">
              {selectedEvent.registrations.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-gray-600 font-medium">
                    No registrations yet
                  </p>
                </div>
              ) : (
                <>
                  {/* Search Box */}
                  <div className="mb-3 sm:mb-4 lg:mb-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
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
                      </div>
                      <input
                        type="text"
                        placeholder="Search by name or mobile..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 lg:py-3 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-purple-400 focus:bg-white transition-all outline-none font-medium text-sm sm:text-base text-gray-900 placeholder-gray-500 ring-1 ring-transparent focus:ring-purple-200/50"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
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
                    {searchQuery && (
                      <p className="mt-2 text-sm text-gray-600">
                        Found {filteredRegistrations.length} result
                        {filteredRegistrations.length !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>

                  {/* Registration List */}
                  {filteredRegistrations.length === 0 ? (
                    <div className="text-center py-12">
                      <svg
                        className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
                      <p className="text-gray-600 font-medium mb-2">
                        No results found
                      </p>
                      <p className="text-gray-500 text-sm">
                        Try a different search term
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {filteredRegistrations.map((registration) => (
                        <div
                          key={registration.id}
                          className="bg-gray-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                            <div className="flex items-start sm:items-center gap-2 sm:gap-3 lg:gap-4">
                              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg flex-shrink-0 ring-2 ring-purple-200/50">
                                {registration.user.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-bold text-sm sm:text-base text-gray-900 truncate">
                                  {registration.user.name}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  @{registration.user.username}
                                </p>
                                {registration.user.mobileNumber && (
                                  <p className="text-xs sm:text-sm text-gray-700 mt-1">
                                    <span className="font-semibold mr-1">
                                      Mobile:
                                    </span>
                                    {registration.user.mobileNumber}
                                  </p>
                                )}
                                <p className="text-xs sm:text-sm text-gray-500 truncate">
                                  {registration.user.email}
                                </p>
                              </div>
                            </div>
                            <div className="text-left sm:text-right space-y-2">
                              {/* Payment Status Badge */}
                              {registration.paymentStatus && (
                                <div className="flex sm:justify-end">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                      registration.paymentStatus === "VERIFIED"
                                        ? "bg-green-100 text-green-700 ring-1 ring-green-600/20"
                                        : registration.paymentStatus ===
                                          "PENDING"
                                        ? "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-600/20"
                                        : "bg-gray-100 text-gray-700 ring-1 ring-gray-600/20"
                                    }`}
                                  >
                                    {registration.paymentStatus ===
                                      "VERIFIED" && (
                                      <svg
                                        className="w-3 h-3 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    )}
                                    {registration.paymentStatus ===
                                      "PENDING" && (
                                      <svg
                                        className="w-3 h-3 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    )}
                                    {registration.paymentStatus}
                                  </span>
                                </div>
                              )}
                              <div>
                                <p className="text-xs text-gray-500">
                                  Registered on
                                </p>
                                <p className="text-xs sm:text-sm font-medium text-gray-700">
                                  {new Date(
                                    registration.createdAt
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pending Payments Modal */}
      <PendingPaymentsModal
        isOpen={pendingPaymentsModalOpen}
        onClose={() => setPendingPaymentsModalOpen(false)}
        pendingPayments={pendingPayments}
        verifiedPayments={verifiedPayments}
        rejectedPayments={rejectedPayments}
        inactiveRegistrations={inactiveRegistrations}
        onPaymentVerified={refreshPendingPayments}
      />

      <Footer />
    </>
  );
}
