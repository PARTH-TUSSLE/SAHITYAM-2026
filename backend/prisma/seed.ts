import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const events = [
  {
    title: "Youth Parliament",
    subtitle: "Mock Parliament Session",
    description:
      "A dynamic youth parliament where participants engage in heated debates, voice their opinions, and refine their oratory and critical thinking skills. This event simulates a real parliamentary session, with participants taking on roles of various political figures.",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1200",
    rules: [
      "Teams of 4-6 members",
      "Time limit: 30 minutes per session",
      "Topics will be announced on spot",
      "Parliamentary decorum must be maintained",
      "Mobile phones not allowed during session",
    ],
  },
  {
    title: "Debate Competition",
    subtitle: "Art of Argumentation",
    description:
      "A battle of wits where participants debate on thought-provoking topics, showcasing their persuasive abilities and quick thinking. Participants will be judged on content, delivery, and rebuttal skills.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200",
    rules: [
      "Individual or pair participation",
      "Time limit: 7 minutes per speaker",
      "Topics announced 15 minutes before",
      "Cross-examination allowed",
      "Use of offensive language prohibited",
    ],
  },
  {
    title: "Treasure Hunt",
    subtitle: "The Ultimate Quest",
    description:
      "An adventurous treasure hunt filled with cryptic clues, challenging riddles, and exciting tasks. Teams will navigate through various locations to find the ultimate treasure, testing their problem-solving and teamwork abilities.",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1200",
    rules: [
      "Teams of 3-5 members",
      "Time limit: 2 hours",
      "No internet usage for clues",
      "All team members must stay together",
      "First team to find treasure wins",
    ],
  },
  {
    title: "Literature Quiz",
    subtitle: "Battle of Bookworms",
    description:
      "A comprehensive quiz testing knowledge of literature across genres, periods, and languages. From classics to contemporary works, participants will showcase their literary expertise through multiple rounds of challenging questions.",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200",
    rules: [
      "Teams of 2-3 members",
      "Multiple rounds: Prelims and Finals",
      "Questions from Indian and World literature",
      "No electronic devices allowed",
      "Quiz master's decision is final",
    ],
  },
  {
    title: "Turncoat Competition",
    subtitle: "Master of Both Sides",
    description:
      "A unique debate format where participants must argue for and against the same topic. This event challenges speakers to think from multiple perspectives and demonstrate versatility in argumentation.",
    image:
      "https://images.unsplash.com/photo-1541890289-ec99c2b2e9ec?q=80&w=1200",
    rules: [
      "Individual participation only",
      "Time limit: 3 minutes per side",
      "Buzzer will indicate side switch",
      "No repetition of arguments",
      "Equal weightage to both sides",
    ],
  },
  {
    title: "Poster Making",
    subtitle: "Visual Storytelling",
    description:
      "Express creativity and artistic skills through poster making on social and literary themes. Participants will create visually compelling posters that communicate powerful messages and showcase their design abilities.",
    image:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200",
    rules: [
      "Individual participation",
      "Time limit: 90 minutes",
      "Theme announced on spot",
      "Materials provided by organizers",
      "Original work only, plagiarism leads to disqualification",
    ],
  },
  {
    title: "Open Mic",
    subtitle: "Express Yourself",
    description:
      "A platform for free expression through poetry, storytelling, stand-up comedy, or any form of spoken word art. Share your voice, your stories, and your creativity with an enthusiastic audience.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200",
    rules: [
      "Individual performances only",
      "Time limit: 5 minutes per performer",
      "Original content preferred",
      "Any language allowed",
      "Respectful content only",
    ],
  },
  {
    title: "Solo Dance",
    subtitle: "Dance Like Nobody's Watching",
    description:
      "Showcase individual dancing prowess in various styles - classical, contemporary, hip-hop, or fusion. Performers will be judged on technique, expression, choreography, and stage presence.",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200",
    rules: [
      "Individual participation",
      "Time limit: 3-5 minutes",
      "Any dance style allowed",
      "Props allowed but not mandatory",
      "Music to be submitted 1 day prior",
    ],
  },
  {
    title: "Crew Dance",
    subtitle: "Synchronize and Mesmerize",
    description:
      "Team dance performance showcasing coordination, creativity, and energy. Groups will present choreographed routines that blend various dance styles and demonstrate perfect synchronization.",
    image:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1200",
    rules: [
      "Teams of 6-15 members",
      "Time limit: 5-8 minutes",
      "Any theme and style allowed",
      "Props and costumes encouraged",
      "Music to be submitted 1 day prior",
    ],
  },
  {
    title: "Fashion Show",
    subtitle: "Walk the Ramp",
    description:
      "A glamorous fashion show where participants showcase creative costumes and confident ramp walk. Themes may include traditional, western, fusion, or eco-friendly fashion, judged on creativity, presentation, and confidence.",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea1f1c77?q=80&w=1200",
    rules: [
      "Teams of 8-20 members",
      "Time limit: 10-15 minutes",
      "Theme-based presentation",
      "Own costumes and props required",
      "Background music allowed",
    ],
  },
  {
    title: "Skit/Mime",
    subtitle: "Silent Stories, Loud Impact",
    description:
      "Tell powerful stories through dramatic skits or expressive mime performances. Teams will present thought-provoking narratives that entertain, engage, and leave a lasting impact on the audience.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200",
    rules: [
      "Teams of 4-10 members",
      "Time limit: 7-10 minutes",
      "Props and costumes allowed",
      "Mime performances must be without dialogue",
      "Content should be appropriate for all audiences",
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing events
  await prisma.registration.deleteMany();
  await prisma.event.deleteMany();

  // Create events
  for (const event of events) {
    await prisma.event.create({
      data: event,
    });
    console.log(`Created event: ${event.title}`);
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
