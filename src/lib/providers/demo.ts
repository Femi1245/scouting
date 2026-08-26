import type {
  AIProvider,
  ChatMessage,
  ContactProvider,
  DiscoveredBusiness,
  EmailProvider,
  SearchBusinessQuery,
  SearchProvider,
  WebsiteAnalysisResult,
  WebsiteAnalyzer,
} from "./types";

/** Demo providers — clearly fictional. Never present as live production data. */

export const demoSearchProvider: SearchProvider = {
  name: "demo-search",
  async searchBusinesses(query: SearchBusinessQuery): Promise<DiscoveredBusiness[]> {
    const loc = query.location ?? "London";
    return [
      {
        name: "Harbor Table Bistro",
        website: "https://example-harbor-table.demo",
        industry: "Restaurant",
        location: loc,
        source: "demo",
        sourceUrl: "demo://directory/harbor-table",
      },
      {
        name: "Northbank Dental",
        website: "https://example-northbank-dental.demo",
        industry: "Dental",
        location: loc,
        source: "demo",
      },
    ].slice(0, query.limit ?? 10);
  },
};

export const demoWebsiteAnalyzer: WebsiteAnalyzer = {
  name: "demo-analyzer",
  async analyze(url: string): Promise<WebsiteAnalysisResult> {
    return {
      url,
      signals: {
        https: "true",
        mobile_responsive: "false",
        online_booking: "false",
        clear_cta: "false",
        performance_indicator: "not_verified",
        accessibility: "not_verified",
        broken_links: "not_verified",
      },
      observations: [
        "Primary CTA is hard to find above the fold (demo observation).",
        "No online booking flow detected on public pages (demo).",
        "Mobile navigation appears cramped in viewport simulation (demo).",
      ],
      confidence: 0.72,
      provider: "demo-analyzer",
    };
  },
};

export const demoContactProvider: ContactProvider = {
  name: "demo-contacts",
  async findProfessionalContact() {
    return {
      fullName: "Alex Rivera",
      title: "Owner",
      email: "alex@example-demo.invalid",
      provenance: "Demo Mode — fictional contact",
    };
  },
};

export const demoAIProvider: AIProvider = {
  name: "demo-ai",
  async complete(messages: ChatMessage[]) {
    const last = messages[messages.length - 1]?.content ?? "";
    if (last.toLowerCase().includes("json")) {
      return JSON.stringify({
        summary: "Website development and redesign for local businesses",
        industries: ["restaurants", "clinics", "retail"],
        problems: ["outdated website", "poor mobile UX", "no online booking"],
      });
    }
    return "Demo AI response — configure OPENAI_API_KEY or ANTHROPIC_API_KEY for live generation.";
  },
};

export const demoEmailProvider: EmailProvider = {
  name: "demo-email",
  getAuthUrl() {
    return "/app/integrations?demo_oauth=1";
  },
  async send() {
    return { id: `demo_msg_${Date.now()}` };
  },
};
