/** Clearly labeled demo dataset for Demo Mode. */

export const DEMO_BADGE = "Demo data";

export type DemoOpportunity = {
  id: string;
  score: number;
  company: string;
  website: string;
  industry: string;
  location: string;
  companySize: string;
  description: string;
  detectedProblems: string[];
  serviceMatch: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  status: string;
  recommendation: string;
  whyMatch: string;
  outreachAngle: string;
  scoreBreakdown: {
    serviceMatch: number;
    problemSeverity: number;
    businessFit: number;
    evidenceConfidence: number;
    contactability: number;
    potentialValue: number;
  };
  websiteSignals: Record<string, string>;
  observations: string[];
  emailSubject: string;
  emailBody: string;
};

export const demoWorkspace = {
  id: "ws_demo",
  name: "Demo Workspace",
  service:
    "I build modern websites for restaurants and local hospitality businesses, including booking flows and mobile-first redesigns.",
  mission: "Find UK restaurants that need website redesigns and online booking.",
  mode: "approval" as const,
  paused: false,
};

export const demoOpportunities: DemoOpportunity[] = [
  {
    id: "opp_demo_1",
    score: 94,
    company: "Harbor Table Bistro",
    website: "https://example-harbor-table.demo",
    industry: "Restaurant",
    location: "London, UK",
    companySize: "1–10",
    description:
      "Neighborhood bistro focused on seasonal menus. (Fictional company for Demo Mode.)",
    detectedProblems: [
      "outdated website",
      "poor mobile experience",
      "no online booking",
      "weak CTA",
    ],
    serviceMatch: "Website redesign + booking integration",
    contactName: "Sarah Chen",
    contactTitle: "Owner",
    contactEmail: "sarah@harbor-table.demo.invalid",
    status: "awaiting_approval",
    recommendation: "High priority — strong service fit with clear booking gap.",
    whyMatch:
      "Your service builds restaurant websites with booking. Harbor Table’s public site shows no booking path and a weak mobile CTA — a direct match.",
    outreachAngle:
      "Lead with the mobile booking friction observed on their public site; offer a short teardown, not a hard sell.",
    scoreBreakdown: {
      serviceMatch: 96,
      problemSeverity: 91,
      businessFit: 94,
      evidenceConfidence: 93,
      contactability: 88,
      potentialValue: 90,
    },
    websiteSignals: {
      https: "true",
      mobile_responsive: "false",
      online_booking: "false",
      clear_cta: "false",
      performance_indicator: "not_verified",
      accessibility: "not_verified",
      broken_links: "not_verified",
    },
    observations: [
      "Reservation CTA is below the fold on mobile viewport simulation.",
      "No booking widget or third-party reservation link found on public pages.",
      "Navigation labels are dense on small screens.",
    ],
    emailSubject: "Quick thought on Harbor Table’s mobile booking path",
    emailBody: `Hi Sarah,

I came across Harbor Table while looking at London restaurants that may be losing bookings on mobile. On the public site, the reservation path is hard to reach on a phone, and I didn’t see an online booking flow.

I help restaurants tighten that journey — clearer CTA, mobile-first layout, and simple booking. If useful, I can share a short teardown of what I’d change first (no pitch deck).

Would a 15-minute call next week work?

Best,
Alex`,
  },
  {
    id: "opp_demo_2",
    score: 87,
    company: "Lime & Thyme Kitchen",
    website: "https://example-lime-thyme.demo",
    industry: "Restaurant",
    location: "Manchester, UK",
    companySize: "1–10",
    description: "Casual dining kitchen. (Fictional — Demo Mode.)",
    detectedProblems: ["slow-feeling pages", "unclear menu CTA", "no online booking"],
    serviceMatch: "Mobile-first website + booking",
    contactName: "James Okonkwo",
    contactTitle: "General Manager",
    contactEmail: "james@lime-thyme.demo.invalid",
    status: "new",
    recommendation: "Solid fit; confirm contact before outreach.",
    whyMatch:
      "Matches hospitality ICP and shows booking/UX gaps your website service addresses.",
    outreachAngle: "Focus on menu → booking conversion on mobile.",
    scoreBreakdown: {
      serviceMatch: 90,
      problemSeverity: 84,
      businessFit: 88,
      evidenceConfidence: 80,
      contactability: 82,
      potentialValue: 85,
    },
    websiteSignals: {
      https: "true",
      mobile_responsive: "not_verified",
      online_booking: "false",
      clear_cta: "false",
      performance_indicator: "not_verified",
      accessibility: "not_verified",
    },
    observations: [
      "Menu PDF linked; no structured booking CTA observed.",
      "Contact form present; booking not verified.",
    ],
    emailSubject: "Lime & Thyme — mobile menu to booking",
    emailBody: `Hi James,

While reviewing hospitality sites in Manchester, I noticed Lime & Thyme’s menu is easy to find, but booking still seems to rely on a general contact path.

I build restaurant sites that make “reserve a table” obvious on mobile. Happy to send two specific ideas based on your public pages if that’s welcome.

Best,
Alex`,
  },
  {
    id: "opp_demo_3",
    score: 78,
    company: "Cedar Room Cafe",
    website: "https://example-cedar-room.demo",
    industry: "Cafe",
    location: "Bristol, UK",
    companySize: "solo",
    description: "Independent cafe. (Fictional — Demo Mode.)",
    detectedProblems: ["dated visual design", "weak contact path"],
    serviceMatch: "Website refresh",
    contactName: "Priya Nair",
    contactTitle: "Founder",
    contactEmail: "priya@cedar-room.demo.invalid",
    status: "qualified",
    recommendation: "Medium priority — smaller venue, simpler scope.",
    whyMatch: "Local hospitality business with a site that may benefit from a refresh.",
    outreachAngle: "Light-touch redesign offer; keep scope small.",
    scoreBreakdown: {
      serviceMatch: 82,
      problemSeverity: 70,
      businessFit: 80,
      evidenceConfidence: 75,
      contactability: 78,
      potentialValue: 72,
    },
    websiteSignals: {
      https: "true",
      mobile_responsive: "true",
      online_booking: "false",
      clear_cta: "false",
      performance_indicator: "not_verified",
    },
    observations: ["Hours and location clear; primary action for catering inquiries is buried."],
    emailSubject: "Cedar Room site — one conversion idea",
    emailBody: `Hi Priya,

I looked at Cedar Room’s public site and the catering/contact path feels easy to miss. I help cafes make that path obvious without a huge rebuild.

Open to a quick look together?

Best,
Alex`,
  },
];

export const demoScouts = [
  {
    id: "scout_demo_1",
    name: "Website Redesign Scout",
    mission: "Find small UK businesses with outdated websites.",
    status: "running",
    sources: ["Public web sources", "Demo directory"],
    target: "UK",
    minScore: 75,
    dailyResearchLimit: 100,
  },
  {
    id: "scout_demo_2",
    name: "Restaurant Booking Scout",
    mission:
      "Find restaurants in London whose websites look outdated and who don't appear to have online booking.",
    status: "paused",
    sources: ["Public listings", "Demo directory"],
    target: "London",
    minScore: 80,
    dailyResearchLimit: 50,
  },
];

export const demoActivity = [
  { time: "12:46", message: "AI classified reply as Interested.", type: "inbox" },
  { time: "12:45", message: "Reply received from Sarah Chen (Harbor Table).", type: "inbox" },
  { time: "12:37", message: "Email sent to Sarah Chen.", type: "outreach" },
  { time: "12:36", message: "User approved outreach message.", type: "approval" },
  { time: "12:35", message: "Outreach generated for Harbor Table Bistro.", type: "outreach" },
  { time: "12:34", message: "Contact identified: Sarah Chen, Owner.", type: "research" },
  { time: "12:33", message: "AI detected high-value opportunity (score 94).", type: "score" },
  { time: "12:32", message: "Website analyzed: example-harbor-table.demo", type: "analyze" },
  { time: "12:31", message: "Scout found company: Harbor Table Bistro.", type: "scout" },
  { time: "11:58", message: "Found 14 restaurants matching your criteria.", type: "scout" },
  { time: "11:40", message: "Analyzed 8 websites.", type: "analyze" },
  { time: "11:22", message: "Prepared 3 personalized outreach messages.", type: "outreach" },
  { time: "11:05", message: "Waiting for approval on 2 messages.", type: "approval" },
];

export const demoInbox = [
  {
    id: "thr_1",
    contact: "Sarah Chen",
    company: "Harbor Table Bistro",
    score: 94,
    classification: "Interested",
    confidence: 92,
    recommendation: "Suggest a 15-minute call.",
    snippet: "Yes — I'd be happy to talk next Tuesday afternoon if you're free.",
    tab: "Interested",
  },
  {
    id: "thr_2",
    contact: "James Okonkwo",
    company: "Lime & Thyme Kitchen",
    score: 87,
    classification: "Question",
    confidence: 81,
    recommendation: "Answer pricing scope briefly; offer a teardown.",
    snippet: "Do you only rebuild full sites, or can you improve what we have?",
    tab: "Questions",
  },
  {
    id: "thr_3",
    contact: "Ops Desk",
    company: "Cedar Room Cafe",
    score: 78,
    classification: "Out of office",
    confidence: 96,
    recommendation: "Wait for return date; pause follow-ups.",
    snippet: "I'm away until Monday. I'll respond when I'm back.",
    tab: "Out of Office",
  },
];

export const demoMeetings = [
  {
    id: "mtg_1",
    title: "Intro call — Harbor Table",
    contact: "Sarah Chen",
    company: "Harbor Table Bistro",
    status: "requested",
    startsAt: "Next Tuesday · 14:00",
  },
];

export const demoMetrics = {
  opportunitiesFound: 17,
  websitesAnalyzed: 24,
  qualifiedLeads: 9,
  contactsFound: 11,
  emailsSent: 6,
  replies: 2,
  interestedProspects: 1,
  meetingsBooked: 1,
};
