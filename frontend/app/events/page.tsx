import React from "react";
import ChromaCard from "../../components/ChromaCard";
import Navbar from "@/components/Navbar";

function Events() {
  const events = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      title: "Musical Night",
      subtitle: "Live performances and melodies",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=800&h=600&fit=crop",
      title: "Poetry Recital",
      subtitle: "Words that touch the soul",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
      title: "Art Exhibition",
      subtitle: "Visual storytelling",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop",
      title: "Dance Performance",
      subtitle: "Rhythm and expression",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=800&h=600&fit=crop",
      title: "Theater Play",
      subtitle: "Drama and emotions",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",
      title: "Literary Discussion",
      subtitle: "Books and conversations",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 animate-gradient-shift">
          {/* Animated circles */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <ChromaCard
                  key={event.id}
                  image={event.image}
                  title={event.title}
                  subtitle={event.subtitle}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Decorative pattern overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
    </>
  );
}

export default Events;
