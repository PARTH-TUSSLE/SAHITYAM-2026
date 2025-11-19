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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 py-24 px-6 md:px-12 lg:px-20">
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
    </>
  );
}

export default Events;
