"use client";

import React, { useEffect, useState } from "react";
import ChromaCard from "../../components/ChromaCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import apiClient from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import BackgroundElements from "@/components/ui/BackgroundElements";

interface Event {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  image: string;
  rules: string[];
}

interface Registration {
  eventId: string;
}

function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [registeredEventIds, setRegisteredEventIds] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchEvents = async () => {
    try {
      const response = await apiClient.get("/events");
      setEvents(response.data);
    } catch (err: any) {
      console.error("Error fetching events:", err);
      throw err;
    }
  };

  const fetchUserRegistrations = async () => {
    try {
      const response = await apiClient.get("/registrations/my-registrations");
      const registrations: Registration[] = response.data;
      const eventIds = new Set(registrations.map((reg) => reg.eventId));
      setRegisteredEventIds(eventIds);
    } catch (err: any) {
      console.error("Error fetching registrations:", err);
      // Don't throw - user might not be authenticated
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchEvents();
        if (isAuthenticated) {
          await fetchUserRegistrations();
        }
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated]);

  const handleRegister = async (eventId: string) => {
    try {
      setLoadingEventId(eventId);
      await apiClient.post("/registrations", { eventId });
      setRegisteredEventIds((prev) => new Set([...prev, eventId]));
    } catch (err: any) {
      alert(err.response?.data?.error || "Registration failed");
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
      <BackgroundElements/>
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Animated gradient background */}
        

        {/* Content */}
        <div className="relative z-10 py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Our Events
              </h1>
              <div className="h-2 w-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Experience the convergence of art and literature through our
                diverse events
              </p>
            </div>

            {/* Events Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-6 max-w-md mx-auto">
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
                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <ChromaCard
                    key={event.id}
                    eventId={event.id}
                    image={event.image}
                    title={event.title}
                    subtitle={event.subtitle || ""}
                    description={event.description}
                    rules={event.rules}
                    isRegistered={registeredEventIds.has(event.id)}
                    onRegister={handleRegister}
                    onUnregister={handleUnregister}
                    isAuthenticated={isAuthenticated}
                    isLoading={loadingEventId === event.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Decorative pattern overlay removed per request */}
      </div>
      <Footer />
    </>
  );
}

export default Events;
