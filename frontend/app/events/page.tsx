import React from "react";
import ChromaCard from "../../components/ChromaCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Events() {
  const events = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=600&fit=crop",
      title: "Youth Parliament",
      subtitle: "Debate and parliamentary proceedings",
      description:
        "Engage in structured parliamentary debates and experience the workings of a democratic institution. Develop public speaking and critical thinking skills.",
      rules: [
        "Teams must consist of 5-7 members",
        "Debates will follow parliamentary procedure",
        "Time limits will be strictly enforced",
        "All participants must maintain decorum",
        "Topics will be announced one week prior",
      ],
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=600&fit=crop",
      title: "Debate Competition",
      subtitle: "Articulate your arguments",
      description:
        "Test your oratory and argumentation skills in this competitive debate format. Present compelling arguments on contemporary topics.",
      rules: [
        "Individual or pair format available",
        "Each speaker gets 5 minutes",
        "Rebuttal time: 2 minutes",
        "Topics announced 2 days before",
        "Judging based on content, delivery, and rebuttal",
      ],
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
      title: "Treasure Hunt (3 Days)",
      subtitle: "Adventure across campus",
      description:
        "A thrilling three-day treasure hunt with clues, puzzles, and challenges spread across the campus. Test your problem-solving and teamwork skills.",
      rules: [
        "Teams of 3-5 members required",
        "Event spans across 3 days",
        "Follow all campus safety guidelines",
        "No use of external help or internet",
        "Final treasure location revealed on Day 3",
      ],
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=600&fit=crop",
      title: "Literature Quiz",
      subtitle: "Test your literary knowledge",
      description:
        "Challenge yourself with questions spanning classic to contemporary literature, poetry, authors, and literary movements from around the world.",
      rules: [
        "Teams of 2-3 members",
        "Multiple rounds: prelims, semi-finals, and finals",
        "Questions cover global literature",
        "Rapid-fire and buzzer rounds included",
        "Use of mobile phones strictly prohibited",
      ],
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
      title: "Turncoat Competition",
      subtitle: "Master both sides of the argument",
      description:
        "A unique debate format where participants must argue for and against the same topic. Showcases adaptability and comprehensive understanding.",
      rules: [
        "Individual competition",
        "Must argue both FOR and AGAINST",
        "2 minutes per side",
        "No repetition of points allowed",
        "Switch happens at judges' signal",
      ],
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop",
      title: "Poster Making",
      subtitle: "Visual storytelling and design",
      description:
        "Create impactful posters on literary themes or social issues. Combine artistic skills with meaningful messaging.",
      rules: [
        "Individual competition",
        "Theme announced on the day",
        "2 hours time limit",
        "Materials provided by organizers",
        "Digital or hand-drawn submissions accepted",
      ],
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
      title: "Open Mic",
      subtitle: "Express yourself freely",
      description:
        "An open platform for poetry, storytelling, stand-up comedy, or any form of verbal expression. Share your voice with the audience.",
      rules: [
        "Individual performers",
        "5 minutes per performance",
        "Any language permitted",
        "Original content encouraged",
        "Sign up on first-come basis",
      ],
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&h=600&fit=crop",
      title: "Solo Dance",
      subtitle: "Individual expression through movement",
      description:
        "Showcase your dancing prowess in this solo performance competition. Any dance style welcome - classical, contemporary, hip-hop, or folk.",
      rules: [
        "Solo performance only",
        "Performance duration: 3-5 minutes",
        "Any dance form permitted",
        "Own music arrangement required",
        "Props allowed with prior approval",
      ],
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=600&fit=crop",
      title: "Crew Dance (Western/Traditional)",
      subtitle: "Team choreography showcase",
      description:
        "Group dance competition featuring Western or Traditional styles. Demonstrate coordination, creativity, and synchronization.",
      rules: [
        "Team size: 6-15 members",
        "Duration: 5-8 minutes",
        "Choose Western or Traditional category",
        "Costumes and props permitted",
        "Judged on synchronization, creativity, and energy",
      ],
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop",
      title: "Fashion Show",
      subtitle: "Style meets creativity",
      description:
        "Walk the ramp and showcase creative fashion concepts. From traditional to avant-garde, express your style statement.",
      rules: [
        "Teams of 8-12 models",
        "Theme-based presentation required",
        "Duration: 8-10 minutes",
        "Own costume arrangements",
        "Background music and props allowed",
      ],
    },
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1588466585717-f8041aec7875?w=800&h=600&fit=crop",
      title: "Skit/Mime",
      subtitle: "Silent storytelling",
      description:
        "Perform a skit or mime act conveying powerful messages through expressions and actions. Master the art of non-verbal communication.",
      rules: [
        "Teams of 4-8 members",
        "Duration: 5-7 minutes",
        "Minimal or no dialogue for mime",
        "Props and costumes allowed",
        "Theme should have social relevance",
      ],
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-yellow-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
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
      <Footer />
    </>
  );
}

export default Events;
