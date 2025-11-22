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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-orange-100">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.name}
                </h1>
                <p className="text-gray-600">@{user?.username}</p>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Registrations Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
              My Registered Events
            </h2>

            {loadingRegistrations ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
              </div>
            ) : registrations.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 mb-4"
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
                <p className="text-gray-600 text-lg mb-4">
                  No events registered yet
                </p>
                <button
                  onClick={() => router.push("/events")}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
                >
                  Browse Events
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {registrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={registration.event.image}
                        alt={registration.event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white drop-shadow-lg">
                        {registration.event.title}
                      </h3>
                    </div>
                    <div className="p-4">
                      {registration.event.subtitle && (
                        <p className="text-gray-600 text-sm mb-3">
                          {registration.event.subtitle}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Registered on{" "}
                          {new Date(
                            registration.createdAt
                          ).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleUnregister(registration.eventId)}
                          disabled={
                            unregisteringEventId === registration.eventId
                          }
                          className={`px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                            unregisteringEventId === registration.eventId
                              ? "opacity-70 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {unregisteringEventId === registration.eventId ? (
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
                            "Unregister"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
