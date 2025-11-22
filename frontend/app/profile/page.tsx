"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import apiClient from "@/lib/api";

interface Registration {
  id: string;
  eventId: string;
  createdAt: string;
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
        setRegistrations(response.data);
      } catch (err) {
        console.error("Error fetching registrations:", err);
      } finally {
        setLoadingRegistrations(false);
      }
    };

    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  const handleUnregister = async (eventId: string) => {
    try {
      setUnregisteringEventId(eventId);
      await apiClient.delete(`/registrations/${eventId}`);
      setRegistrations((prev) => prev.filter((reg) => reg.eventId !== eventId));
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to unregister");
    } finally {
      setUnregisteringEventId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative overflow-hidden pt-20 pb-12">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 animate-gradient-shift -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-yellow-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Decorative Pattern */}
        <div
          className="fixed inset-0 opacity-5 pointer-events-none -z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
          {/* Profile Header */}
          <div className="relative mb-8">
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
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
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
                    <div className="bg-orange-50 rounded-lg px-4 py-2 border border-orange-200">
                      <div className="text-lg font-bold text-orange-600">
                        {registrations.length}
                      </div>
                      <div className="text-xs text-gray-600">Events</div>
                    </div>
                    <div className="bg-green-50 rounded-lg px-4 py-2 border border-green-200">
                      <div className="text-lg font-bold text-green-600">
                        Active
                      </div>
                      <div className="text-xs text-gray-600">Status</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registrations Section */}
          <div className="relative">
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                My Registered Events
              </h2>

              {loadingRegistrations ? (
                <div className="flex justify-center py-12">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-500 blur-lg opacity-50 animate-pulse"></div>
                    <div className="relative animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
                  </div>
                </div>
              ) : registrations.length === 0 ? (
                <div className="text-center py-16 relative">
                  <div className="inline-block mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                    <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-orange-600"
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
                    className="relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg shadow-orange-300/50 hover:shadow-xl hover:shadow-orange-400/60 transition-all transform hover:scale-105 overflow-hidden group"
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
                  {registrations.map((registration) => (
                    <div key={registration.id} className="group relative">
                      {/* Card Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

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

                          {/* Registered Badge */}
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
                            Registered
                          </div>
                        </div>

                        <div className="p-5">
                          {registration.event.subtitle && (
                            <p className="text-gray-600 text-sm font-medium mb-4 line-clamp-2">
                              {registration.event.subtitle}
                            </p>
                          )}

                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                              <svg
                                className="w-4 h-4 text-orange-500"
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

                            <button
                              onClick={() =>
                                handleUnregister(registration.eventId)
                              }
                              disabled={
                                unregisteringEventId === registration.eventId
                              }
                              className={`relative px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-bold rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg overflow-hidden group ${
                                unregisteringEventId === registration.eventId
                                  ? "opacity-70 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                {unregisteringEventId ===
                                registration.eventId ? (
                                  <>
                                    <svg
                                      className="animate-spin h-4 w-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Loading...
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
                              {!unregisteringEventId && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500 skew-x-12"></div>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
