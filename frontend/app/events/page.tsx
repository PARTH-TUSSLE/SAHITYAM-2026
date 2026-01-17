"use client";

import React, { useEffect, useState } from "react";
import ChromaCard from "../../components/ChromaCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import apiClient from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import BackgroundElements from "@/components/ui/BackgroundElements";
import PaymentModal, { PaymentData } from "@/components/PaymentModal";
import SuccessModal from "@/components/SuccessModal";
import PremiumSpinner from "@/components/PremiumSpinner";
import { ShareButtons } from "@/components/ShareButtons";
import { getEventShareUrl, getShareDescription } from "@/lib/config";

interface Event {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  image: string;
  rules: string[];
  registrationFee: number;
  prizeAmount?: string;
}

interface Registration {
  eventId: string;
  isActive: boolean;
  paymentStatus: "PENDING" | "VERIFIED" | "REJECTED";
  rejectionReason?: string | null;
}

function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [registeredEventIds, setRegisteredEventIds] = useState<Set<string>>(
    new Set()
  );
  const [registrationsMap, setRegistrationsMap] = useState<
    Map<string, Registration>
  >(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedEventForPayment, setSelectedEventForPayment] =
    useState<Event | null>(null);
  const { isAuthenticated, user } = useAuth();
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

  const fetchEvents = async () => {
    try {
      const response = await apiClient.get("/events");
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response format");
      }
      setEvents(response.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching events:", err);
      const errorMessage =
        err.response?.data?.error || "Failed to load events. Please try again.";
      setError(errorMessage);
      throw err;
    }
  };

  const fetchUserRegistrations = async () => {
    try {
      const response = await apiClient.get("/registrations/my-registrations");
      if (!response.data || !Array.isArray(response.data)) {
        console.warn("Invalid registrations response format");
        return;
      }
      const registrations: Registration[] = response.data;

      // Create a map of all registrations for detailed status checking
      const regMap = new Map<string, Registration>();
      registrations.forEach((reg) => {
        regMap.set(reg.eventId, reg);
      });
      setRegistrationsMap(regMap);

      // Only include active registrations with non-rejected payment status
      const eventIds = new Set(
        registrations
          .filter((reg) => reg.isActive && reg.paymentStatus !== "REJECTED")
          .map((reg) => reg.eventId)
      );
      setRegisteredEventIds(eventIds);
    } catch (err: any) {
      console.error("Error fetching registrations:", err);
      // Don't throw - user might not be authenticated or have no registrations
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        await fetchEvents();
        if (isAuthenticated) {
          await fetchUserRegistrations();
        }
      } catch (err: any) {
        console.error("Error loading data:", err);
        const errorMessage =
          err.response?.data?.error ||
          err.message ||
          "Failed to load events. Please refresh the page.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated]);

  const handleRegister = async (eventId: string) => {
    // Find the event
    const event = events.find((e) => e.id === eventId);
    if (event) {
      setSelectedEventForPayment(event);
      setPaymentModalOpen(true);
    }
  };

  const handlePaymentSubmit = async (paymentData: PaymentData) => {
    if (!selectedEventForPayment) return;

    try {
      setLoadingEventId(selectedEventForPayment.id);

      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append("eventId", selectedEventForPayment.id);
      formData.append("name", paymentData.name);
      formData.append("email", paymentData.email);
      formData.append("mobileNumber", paymentData.mobileNumber);
      formData.append("college", paymentData.college);
      formData.append("state", paymentData.state);
      formData.append("transactionId", paymentData.transactionId);
      if (paymentData.paymentScreenshot) {
        formData.append("paymentScreenshot", paymentData.paymentScreenshot);
      }

      // Send to backend
      await apiClient.post("/registrations/with-payment", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setRegisteredEventIds(
        (prev) => new Set([...prev, selectedEventForPayment.id])
      );
      setPaymentModalOpen(false);
      setSelectedEventForPayment(null);

      // Show success message
      setSuccessModal({
        isOpen: true,
        title: "Registration Successful!",
        message: `Your registration for ${selectedEventForPayment.title} has been submitted. Your payment will be verified shortly and you'll be notified once approved. Share this event with your friends!`,
        type: "success",
      });
    } catch (err: any) {
      setSuccessModal({
        isOpen: true,
        title: "Registration Failed",
        message:
          err.response?.data?.error ||
          "Failed to submit registration. Please try again.",
        type: "error",
      });
    } finally {
      setLoadingEventId(null);
    }
  };

  const handleUnregister = async (eventId: string) => {
    try {
      setLoadingEventId(eventId);
      await apiClient.delete(`/registrations/${eventId}`);
      setRegisteredEventIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });
    } catch (err: any) {
      alert(err.response?.data?.error || "Unregistration failed");
    } finally {
      setLoadingEventId(null);
    }
  };

  return (
    <>
      <Navbar />
      <BackgroundElements />
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Animated gradient background */}

        {/* Content */}
        <div className="relative z-10 py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* MINDBLOWING PRIZE POOL BANNER */}
            <div className="mb-12 sm:mb-16 lg:mb-20 px-2 sm:px-4">
              <div className="relative group">
                {/* Multi-layered animated glows with enhanced colors */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 rounded-[2.5rem] blur-3xl opacity-25 animate-pulse"></div>
                <div
                  className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 rounded-[2.5rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="absolute -inset-2 bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-400 rounded-[2.5rem] blur-xl opacity-35 group-hover:opacity-55 transition-opacity duration-500 animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                ></div>

                {/* Orbiting sparkle particles with enhanced motion */}
                <div className="absolute -top-6 left-[15%] w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                <div
                  className="absolute -top-4 left-[30%] w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-75"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute -top-5 right-[25%] w-2.5 h-2.5 bg-orange-400 rounded-full animate-ping opacity-75"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute -top-6 right-[10%] w-3 h-3 bg-yellow-500 rounded-full animate-ping opacity-75"
                  style={{ animationDelay: "1.5s" }}
                ></div>
                <div
                  className="absolute top-[20%] -left-5 w-2 h-2 bg-amber-500 rounded-full animate-ping opacity-75"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div
                  className="absolute top-[40%] -left-6 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping opacity-75"
                  style={{ animationDelay: "2.5s" }}
                ></div>
                <div
                  className="absolute top-[20%] -right-5 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-75"
                  style={{ animationDelay: "3s" }}
                ></div>
                <div
                  className="absolute top-[40%] -right-6 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping opacity-75"
                  style={{ animationDelay: "3.5s" }}
                ></div>
                <div
                  className="absolute -bottom-6 left-[20%] w-3 h-3 bg-yellow-500 rounded-full animate-ping opacity-75"
                  style={{ animationDelay: "0.8s" }}
                ></div>
                <div
                  className="absolute -bottom-5 right-[20%] w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping opacity-75"
                  style={{ animationDelay: "1.3s" }}
                ></div>

                {/* Main Prize Pool Card with enhanced 3D effect */}
                <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50 via-30% via-amber-100 via-60% to-orange-50 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 lg:p-10 border-4 sm:border-[6px] border-amber-400/60 shadow-[0_15px_60px_rgba(251,191,36,0.4)] hover:shadow-[0_20px_90px_rgba(251,191,36,0.55)] transition-all duration-500 hover:scale-[1.02] ring-2 sm:ring-4 ring-amber-300/40 overflow-hidden">
                  {/* Sweeping gradient overlay animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Rotating gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-300/20 via-transparent to-yellow-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Enhanced corner decorations with animation */}
                  <div className="absolute top-0 left-0 w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 border-t-[3px] sm:border-t-4 border-l-[3px] sm:border-l-4 border-amber-500/50 rounded-tl-[1.5rem] sm:rounded-tl-[2rem] transition-all duration-500 group-hover:border-amber-500/80 group-hover:scale-110"></div>
                  <div className="absolute top-0 right-0 w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 border-t-[3px] sm:border-t-4 border-r-[3px] sm:border-r-4 border-yellow-500/50 rounded-tr-[1.5rem] sm:rounded-tr-[2rem] transition-all duration-500 group-hover:border-yellow-500/80 group-hover:scale-110"></div>
                  <div className="absolute bottom-0 left-0 w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 border-b-[3px] sm:border-b-4 border-l-[3px] sm:border-l-4 border-orange-500/50 rounded-bl-[1.5rem] sm:rounded-bl-[2rem] transition-all duration-500 group-hover:border-orange-500/80 group-hover:scale-110"></div>
                  <div className="absolute bottom-0 right-0 w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 border-b-[3px] sm:border-b-4 border-r-[3px] sm:border-r-4 border-amber-500/50 rounded-br-[1.5rem] sm:rounded-br-[2rem] transition-all duration-500 group-hover:border-amber-500/80 group-hover:scale-110"></div>

                  <div className="relative text-center space-y-3 sm:space-y-4 md:space-y-6">
                    {/* Mega Trophy Icon with enhanced animations */}
                    <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
                      <div className="relative">
                        {/* Triple pulsing glow layers */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-full blur-3xl opacity-70 animate-pulse"></div>
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 rounded-full blur-2xl opacity-60 animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 rounded-full blur-xl opacity-50 animate-pulse"
                          style={{ animationDelay: "1s" }}
                        ></div>

                        {/* Rotating ring around trophy */}
                        <div
                          className="absolute -inset-4 border-4 border-amber-400/30 rounded-full animate-spin"
                          style={{ animationDuration: "8s" }}
                        ></div>
                        <div
                          className="absolute -inset-6 border-2 border-yellow-400/20 rounded-full animate-spin"
                          style={{
                            animationDuration: "12s",
                            animationDirection: "reverse",
                          }}
                        ></div>

                        <div
                          className="relative text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-7xl animate-bounce filter drop-shadow-[0_10px_25px_rgba(251,191,36,0.6)] hover:scale-110 transition-transform duration-300"
                          style={{ animationDuration: "2s" }}
                        >
                          🏆
                        </div>
                      </div>
                    </div>

                    {/* Title with enhanced styling */}
                    <div>
                      <h2
                        className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-black text-amber-900 mb-2 sm:mb-3 md:mb-4 tracking-tight drop-shadow-md animate-pulse"
                        style={{ animationDuration: "4s" }}
                      >
                        GRAND PRIZE POOL
                      </h2>

                      {/* Mega Prize Amount with enhanced visual effects */}
                      <div className="relative inline-block my-2 sm:my-3">
                        {/* Layered glows for prize amount */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 via-orange-500 to-amber-600 blur-3xl opacity-60 animate-pulse"></div>
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-500 blur-2xl opacity-50 animate-pulse"
                          style={{ animationDelay: "0.7s" }}
                        ></div>

                        {/* Animated background shine */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative">
                          <p
                            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-black bg-gradient-to-r from-amber-600 via-orange-600 via-40% via-yellow-600 via-60% to-amber-700 bg-clip-text text-transparent drop-shadow-[0_4px_15px_rgba(251,146,60,0.6)] animate-pulse leading-tight"
                            style={{ animationDuration: "3s" }}
                          >
                            Upto ₹5,00,000
                          </p>
                          {/* Shimmer effect overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500"></div>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-bold text-amber-800 mt-2 sm:mt-3 md:mt-4 lg:mt-4 tracking-wide drop-shadow-md px-2">
                        Total Prize Money Across All Events!
                      </p>
                    </div>

                    {/* Enhanced decorative separator with pulsing effect */}
                    <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2 sm:pt-3 md:pt-4">
                      <div className="h-1 sm:h-1.5 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full animate-pulse"></div>
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-60 animate-pulse"></div>
                        <span
                          className="relative text-2xl sm:text-3xl md:text-4xl filter drop-shadow-[0_2px_6px_rgba(251,191,36,0.6)] animate-bounce"
                          style={{ animationDuration: "2.5s" }}
                        >
                          💰
                        </span>
                      </div>
                      <div
                        className="h-1 sm:h-1.5 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>

                    {/* Enhanced flair text with animation */}
                    <p
                      className="text-sm sm:text-base md:text-base lg:text-base font-semibold text-amber-700 italic animate-pulse px-2"
                      style={{ animationDuration: "3.5s" }}
                    >
                      Compete • Win • Celebrate 🎉
                    </p>

                    {/* Additional sparkle accents */}
                    <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 pt-2 opacity-70">
                      <span className="text-xl sm:text-2xl md:text-3xl animate-pulse">
                        ✨
                      </span>
                      <span
                        className="text-lg sm:text-xl md:text-2xl animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      >
                        ⭐
                      </span>
                      <span
                        className="text-xl sm:text-2xl md:text-3xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                      >
                        🌟
                      </span>
                      <span
                        className="text-lg sm:text-xl md:text-2xl animate-pulse"
                        style={{ animationDelay: "1.5s" }}
                      >
                        💫
                      </span>
                      <span
                        className="text-xl sm:text-2xl md:text-3xl animate-pulse"
                        style={{ animationDelay: "2s" }}
                      >
                        ✨
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Our Events
              </h1>
              <div className="h-2 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mx-auto mb-6 shadow-md shadow-purple-300/50"></div>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Experience the convergence of art and literature through our
                diverse events
              </p>
            </div>

            {/* Events Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <PremiumSpinner size="xl" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 text-purple-600 rounded-lg p-6 max-w-md mx-auto ring-1 ring-purple-100/50">
                  <svg
                    className="w-12 h-12 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="font-semibold text-lg mb-2">
                    Failed to Load Events
                  </p>
                  <p className="text-sm">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all hover:scale-105"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">
                  No events available at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 sm:px-0">
                {events.map((event) => {
                  const registration = registrationsMap.get(event.id);
                  return (
                    <ChromaCard
                      key={event.id}
                      eventId={event.id}
                      image={event.image}
                      title={event.title}
                      subtitle={event.subtitle || ""}
                      description={event.description}
                      rules={event.rules}
                      registrationFee={event.registrationFee}
                      prizeAmount={event.prizeAmount}
                      isRegistered={registeredEventIds.has(event.id)}
                      registrationStatus={registration}
                      onRegister={handleRegister}
                      onUnregister={handleUnregister}
                      isAuthenticated={isAuthenticated}
                      isLoading={loadingEventId === event.id}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Decorative pattern overlay removed per request */}
      </div>

      {/* Payment Modal */}
      {selectedEventForPayment && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => {
            setPaymentModalOpen(false);
            setSelectedEventForPayment(null);
          }}
          eventTitle={selectedEventForPayment.title}
          eventFee={selectedEventForPayment.registrationFee}
          onSubmit={handlePaymentSubmit}
          isLoading={loadingEventId === selectedEventForPayment.id}
          userEmail={user?.email || ""}
          userMobile={user?.mobileNumber || ""}
        />
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ ...successModal, isOpen: false })}
        title={successModal.title}
        message={successModal.message}
        type={successModal.type}
      />

      <Footer />
    </>
  );
}

export default Events;
