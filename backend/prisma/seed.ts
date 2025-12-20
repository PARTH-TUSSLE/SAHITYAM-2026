import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const events = [
  {
    title: "Poster Making",
    subtitle: "Create Visual Impact",
    description:
      "Express your creativity through visual art. Design and create posters on cultural and literary themes. Showcase your artistic skills and make a statement through your artwork.",
    image: "/PosterMaking.jpg",
    registrationFee: 200,
    prizeAmount: "10,000",
    rules: [
      "The poster making competition is open to all registered participants of SAHITYAM.",
      "This is an individual event - only one participant per poster.",
      "Prize Distribution: 1st Place - ₹3,100, 2nd Place - ₹2,100, 3rd Place - ₹1,100. Winners will receive cash prizes along with trophies and certificates.",
      "The theme will be announced on the spot at the event.",
      "Duration: 2-3 hours will be provided to complete the poster.",
      "Size: Posters should be made on A2 size sheet (to be provided by the organizers).",
      "Materials: Basic materials like chart paper and some colors will be provided. Participants may bring their own materials if required.",
      "The poster must be original work created during the competition time.",
      "Content must be decent, creative, and relevant to the theme. Obscene or offensive content will lead to disqualification.",
      "Posters will be judged on creativity, relevance to theme, visual impact, and overall presentation.",
      "The decision of the judges will be final and binding.",
      "Any form of misbehavior or violation of rules will lead to immediate disqualification.",
      "Accommodation Benefits: Participants who have opted for accommodation will receive breakfast, lunch, dinner, a stay, and access to all cultural events of SAHITYAM 2026.",
      "The organizing committee reserves the right to modify the rules and prize pool of all the events if required.",
      "For more queries: Ms. Suhani - +91-8168360485, Mr. Ashish - +91-9350843234",
    ],
  },
  {
    title: "Face Painting",
    subtitle: "Art on Canvas of Life",
    description:
      "Transform faces into works of art. Create stunning face paint designs on cultural, traditional, or creative themes. Showcase your artistic talent on the most unique canvas - the human face.",
    image: "/FacePainting.jpg",
    registrationFee: 200,
    prizeAmount: "10,000",
    rules: [
      "The face painting competition is open to all registered participants of SAHITYAM.",
      "Participants can work in pairs (one artist and one model) or solo.",
      "Prize Distribution: 1st Place - ₹3,100, 2nd Place - ₹2,100, 3rd Place - ₹1,100. Winners will receive cash prizes along with trophies and certificates.",
      "The theme will be announced on the spot at the event.",
      "Duration: 1-2 hours will be provided to complete the face painting.",
      "Materials: Face painting materials will not be provided. Participants may bring their own professional materials.",
      "All materials used must be skin-safe and non-toxic.",
      "The design must be original and created during the competition time.",
      "Content must be decent, creative, and culturally appropriate. Obscene or offensive designs will lead to disqualification.",
      "Designs will be judged on creativity, technique, relevance to theme, and overall visual impact.",
      "The decision of the judges will be final and binding.",
      "Any form of misbehavior or violation of rules will lead to immediate disqualification.",
      "The organizing committee reserves the right to modify the rules and prize pool of all the events if required.",
      "Accommodation Benefits: Participants who have opted for accommodation will receive breakfast, lunch, dinner, a stay, and access to all cultural events of SAHITYAM 2026.",
      "For more queries: Ms. Suhani - +91-8168360485, Mr. Ashish - +91-9350843234",
    ],
  },
  {
    title: "Open Mic",
    subtitle: "Express Yourself",
    description:
      "A platform for free expression through poetry, storytelling, stand-up comedy, or any form of spoken word art. Share your voice, your stories, and your creativity with an enthusiastic audience.",
    image: "/OpenMic.jpg",
    registrationFee: 500,
    prizeAmount: "15,000",
    rules: [
      "The Open Mic is open to all registered participants of SAHITYAM.",
      "Each participant will be allotted a maximum of 3–5 minutes of stage time.",
      "Prize Distribution: 1st Place - ₹5,100, 2nd Place - ₹3,100, 3rd Place - ₹2,100. Winners will receive cash prizes along with trophies and certificates.",
      "Performance can include anything, such as poetry, storytelling, stand-up comedy, singing, rap, shayari, dance, instrumental, or any other creative act.",
      "Content must be original or properly credited. Plagiarism will lead to direct disqualification.",
      "Performances containing obscene, abusive, political, or hate content are strictly prohibited.",
      "Basic sound system and microphone will be provided; any additional requirements must be informed in advance.",
      "Judges' and organizers' decisions will be final and binding.",
      "Any form of indiscipline or misbehavior will result in immediate disqualification.",
      "Accommodation Benefits: Participants who have opted for accommodation will receive breakfast, lunch, dinner, a stay, and access to all cultural events of SAHITYAM 2026.",
      "The organizing committee reserves the right to modify the rules and prize pool of all the events if required.",
      "For more queries: Ms. Suhani - +91-8168360485, Mr. Ashish - +91-9350843234",
    ],
  },
  {
    title: "Poetry",
    subtitle: "Words that Touch the Soul",
    description:
      "A celebration of poetic expression where participants recite self-written or published poems. Share your verses, emotions, and creativity through the art of poetry in any language.",
    image: "/Poetry.jpg",
    registrationFee: 200,
    prizeAmount: "10,000",
    rules: [
      "The poetry event is open to all registered participants of SAHITYAM.",
      "Each participant will be given a maximum of 5–6 minutes to recite their poem.",
      "Prize Distribution: 1st Place - ₹3,100, 2nd Place - ₹2,100, 3rd Place - ₹1,100. Winners will receive cash prizes along with trophies and certificates.",
      "Both self-written and published poems are allowed; however, proper credit must be given for non-original work.",
      "Poems may be recited in any language.",
      "Content must be decent, respectful, and non-offensive. Obscene, abusive, political, or hate content is strictly prohibited.",
      "Use of mobile phones for reading is allowed.",
      "Background music or sound effects are not permitted unless pre-approved by the organizers.",
      "The decision of the judges will be final and binding.",
      "Any form of misconduct or violation of rules will lead to immediate disqualification.",
      "Accommodation Benefits: Participants who have opted for accommodation will receive breakfast, lunch, dinner, a stay, and access to all cultural events of SAHITYAM 2026.",
      "The organizing committee reserves the right to modify the rules and prize pool of all the events if required.",
      "For more queries: Ms. Suhani - +91-8168360485, Mr. Ashish - +91-9350843234",
    ],
  },
  {
    title: "Solo Dance",
    subtitle: "Traditional & Heritage",
    description:
      "Showcase your individual dancing prowess in traditional and heritage dance forms. Celebrate India's rich cultural diversity through folk, classical, and regional dance styles.",
    image: "/SoloDance.jpeg",
    registrationFee: 1000,
    prizeAmount: "15,000",
    rules: [
      "The solo dance competition is open to all registered participants of SAHITYAM.",
      "Each participant will be given a maximum of 5–6 minutes for their performance.",
      "Prize Distribution: 1st Place - ₹5,100, 2nd Place - ₹3,100, 3rd Place - ₹2,100. Winners will receive cash prizes along with trophies and certificates.",
      "The performance must strictly follow the Traditional/Heritage theme (folk, classical, regional, or cultural dance forms).",
      "Use of film or fusion songs is allowed only if they are based on traditional or cultural styles.",
      "Participants must bring their own costume, makeup, and necessary props (if any).",
      "Only one participant is allowed on stage during the performance.",
      "Audio track must be submitted on the official Mind Benders mail ID: mindbenders@cgcuniversity.org at least 48 hours before the event.",
      "Content must be decent and culturally appropriate. Obscene or inappropriate moves will lead to disqualification.",
      "The decision of the judges will be final and binding.",
      "Accommodation Benefits: Participants who have opted for accommodation will receive breakfast, lunch, dinner, a stay, and access to all cultural events of SAHITYAM 2026.",
      "Any form of misbehavior, damage to stage/property, or violation of rules will result in immediate disqualification.",
      "The organizing committee reserves the right to modify the rules and prize pool of all the events if required.",
      "For more queries: Ms. Suhani - +91-8168360485, Mr. Ashish - +91-9350843234",
    ],
  },
  {
    title: "Crew Dance",
    subtitle: "Traditional & Heritage",
    description:
      "Team dance performance celebrating India's traditional and heritage dance forms. Groups showcase coordination, creativity, and cultural richness through folk, classical, and regional dance styles.",
    image: "/CrewDance.jpeg",
    registrationFee: 4000,
    prizeAmount: "75,000",
    rules: [
      "The crew/group dance competition is open to all registered teams of SAHITYAM.",
      "A team must consist of a minimum of 4 and a maximum of 16 members.",
      "Each team will be given a maximum of 8–10 minutes for their performance (including stage setup).",
      "Prize Distribution: 1st Place - ₹31,000, 2nd Place - ₹21,000, 3rd Place - ₹11,000. Winners will receive cash prizes along with trophies and certificates.",
      "The performance must strictly follow the Traditional/Heritage theme (folk, classical, regional, or cultural dance forms).",
      "Use of film or fusion songs is allowed only if they are based on traditional or cultural styles.",
      "All participants must arrange their own costumes, makeup, and props.",
      "Audio track must be submitted on the official Mind Benders mail ID: mindbenders@cgcuniversity.org at least 48 hours before the event.",
      "The performance must be decent, culturally appropriate, and non-offensive. Any inappropriate content will lead to disqualification.",
      "Accommodation Benefits: Participants who have opted for accommodation will receive breakfast, lunch, dinner, a stay, and access to all cultural events of SAHITYAM 2026.",
      "The decision of the judges will be final and binding.",
      "The organizing committee reserves the right to modify the rules and prize pool of all the events if required.",
      "For more queries: Ms. Suhani - +91-8168360485, Mr. Ashish - +91-9350843234",
    ],
  },
  {
    title: "Literature Quiz",
    subtitle: "Battle of Bookworms",
    description:
      "A comprehensive quiz testing knowledge of English and regional literature. Teams compete through multiple rounds showcasing their literary expertise on authors, poets, books, and literary movements.",
    image: "/LiteratureQuiz.jpg",
    registrationFee: 800,
    prizeAmount: "15,000",
    rules: [
      "The Literature Quiz is open to all registered participants of SAHITYAM.",
      "The quiz will be conducted in team format. Each team must consist of 4 members only.",
      "Prize Distribution: 1st Place - ₹5,100, 2nd Place - ₹3,100, 3rd Place - ₹2,100. Winners will receive cash prizes along with trophies and certificates.",
      "The quiz will be conducted in multiple rounds, including preliminary and final rounds.",
      "Questions will be based on English & regional literature, authors, poets, books, literary movements, and general literary awareness.",
      "The quiz will be time-bound, and teams must answer within the given time limit.",
      "Use of mobile phones, smart watches, or any electronic gadgets is strictly prohibited during the quiz.",
      "Accommodation Benefits: Participants who have opted for accommodation will receive breakfast, lunch, dinner, a stay, and access to all cultural events of SAHITYAM 2026.",
      "Any form of unfair means or indiscipline will lead to immediate disqualification.",
      "The decision of the quiz master and judges will be final and binding.",
      "The organizing committee reserves the right to modify the rules and prize pool of all the events if required.",
      "For more queries: Ms. Suhani - +91-8168360485, Mr. Ashish - +91-9350843234",
    ],
  },
  {
    title: "Fashion Show",
    subtitle: "State Representation / Cultural Folk",
    description:
      "Walk the ramp showcasing India's diverse cultural heritage through traditional attire. Solo participants present state-specific or folk costumes with confidence, creativity, and cultural authenticity.",
    image: "/FashionShow.jpeg",
    registrationFee: 1000,
    prizeAmount: "40,000",
    rules: [
      "The fashion show is open to all registered participants of SAHITYAM.",
      "Participation is allowed only in Solo format.",
      "Prize Distribution: Four prestigious titles will be awarded - Mr. Sahityam (₹11,000), Ms. Sahityam (₹11,000), Mr. State Style Star (₹5,100), and Ms. State Style Star (₹5,100). All winners will receive cash prizes along with trophies and certificates.",
      "The theme must strictly follow State Representation or Cultural Folk (attire should reflect a specific Indian state or folk culture).",
      "Outfits should be traditional, innovative, and culturally appropriate. Vulgar or inappropriate styling will lead to direct disqualification.",
      "Participants must arrange their own costumes, makeup, props, and accessories.",
      "Accommodation Benefits: Participants who have opted for accommodation will receive breakfast, lunch, dinner, a stay, and access to all cultural events of SAHITYAM 2026.",
      "Use of fire, water, sharp objects, smoke, or hazardous materials is strictly prohibited on stage.",
      "Any form of misbehavior, indiscipline, or damage to stage/property will lead to immediate disqualification.",
      "The decision of the judges will be final and binding.",
      "The organizing committee reserves the right to modify the rules and prize pool of all the events if required.",
      "For more queries: Ms. Suhani - +91-8168360485, Mr. Ashish - +91-9350843234",
    ],
  },
  {
    title: "Debate Competition",
    subtitle: "Hindi Debate",
    description:
      "A team debate competition conducted in Hindi where participants argue for and against thought-provoking motions. Teams showcase persuasive abilities, critical thinking, and eloquence in Hindi language.",
    image: "/DebateCompetition.jpg",
    registrationFee: 500,
    prizeAmount: "15,000",
    rules: [
      "The debate competition is open to all registered participants of SAHITYAM.",
      "This is a team event.",
      "Each team shall consist of 2 members (one speaking for the motion and one against the motion).",
      "Prize Distribution: 1st Place - ₹5,100, 2nd Place - ₹3,100, 3rd Place - ₹2,100. Winners will receive cash prizes along with trophies and certificates.",
      "The topic/motion will be revealed on 10th January 2026.",
      "The language of the debate will be Hindi only.",
      "Each speaker will be given a maximum of 4–5 minutes to present their arguments.",
      "Use of mobile phones, notes, or any electronic gadgets during the speech is not allowed.",
      "The content must be respectful, factual, and relevant to the topic. Personal attacks, abusive language, or offensive remarks are strictly prohibited.",
      "The decision of the judges will be final and binding.",
      "Any form of misconduct, indiscipline, or violation of rules will lead to immediate disqualification.",
      "Accommodation Benefits: Participants who have opted for accommodation will receive breakfast, lunch, dinner, a stay, and access to all cultural events of SAHITYAM 2026.",
      "The organizing committee reserves the right to modify the rules and prize pool of all the events if required.",
      "For more queries: Ms. Suhani - +91-8168360485, Mr. Ashish - +91-9350843234",
    ],
  },
  {
    title: "Inter-College Youth Parliament",
    subtitle: "Parliamentary Debate",
    description:
      "A prestigious inter-college parliamentary debate simulating real parliamentary sessions. Students represent portfolios, engage in structured debates, and experience parliamentary procedures with proper decorum and discipline.",
    image: "/YouthParliament.jpg",
    registrationFee: 2000,
    prizeAmount: "50,000",
    rules: [
      "Eligibility: Open to students from all participating colleges and universities. A valid college ID is mandatory on the event day.",
      "Registration: Prior registration is compulsory. No on-spot registrations will be accepted.",
      "Prize Distribution: Best Delegate - ₹31,000, Special Mention - ₹11,000. Winners will receive cash prizes along with trophies and certificates of excellence.",
      "Awards: Winners will receive trophies and certificates of excellence along with recognition.",
      "Dress Code - Day 1: Western Formals, Day 2: Traditional/Formal Indian Attire. Proper decorum must be maintained at all times.",
      "Portfolio Allotment: For portfolio allotment, kindly call the undersigned and get your portfolio locked. Once allotted, no changes will be allowed.",
      "Punctuality: Participants must report at least 30 minutes before the scheduled time. Late arrival may lead to disqualification.",
      "Code of Conduct: Parliamentary language, discipline, and respectful behavior are mandatory. Use of unparliamentary words or misconduct will lead to immediate disqualification.",
      "Time Limit: Each speaker must strictly adhere to the time limit allotted by the Speaker/Chair.",
      "Use of Electronic Devices: Mobile phones must be on silent mode. Usage during the session is strictly prohibited unless permitted by the Chair.",
      "Research & Content: Participants are expected to be well-researched with authentic facts and data. Any form of plagiarism is strictly discouraged.",
      "Decision of the Jury: The decision of the judges, Speaker, and organizing committee shall be final and binding.",
      "Disqualification Criteria: The organizing committee reserves the right to disqualify any participant on grounds of misconduct, indiscipline, violation of rules, or providing false information.",
      "Organizing Authority Rights: The organizing committee holds the right to modify the rules, prize pool, schedule, or format of the event if necessary.",
      "Accommodation Benefits: Participants who have opted for accommodation will receive breakfast, lunch, dinner, a stay, and access to all cultural events of SAHITYAM 2026.",
      "For more queries: Ms. Suhani - +91-8168360485, Mr. Ashish - +91-9350843234",
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
