/** Provider interfaces — swap implementations without rewriting product logic. */

export type SearchBusinessQuery = {
  industry?: string;
  location?: string;
  keywords?: string[];
  limit?: number;
};

export type DiscoveredBusiness = {
  name: string;
  website?: string;
  industry?: string;
  location?: string;
  source: string;
  sourceUrl?: string;
};

export interface SearchProvider {
  readonly name: string;
  searchBusinesses(query: SearchBusinessQuery): Promise<DiscoveredBusiness[]>;
}

export type WebsiteSignalStatus = "true" | "false" | "not_verified";

export type WebsiteAnalysisResult = {
  url: string;
  signals: Record<string, WebsiteSignalStatus | string | number | null>;
  observations: string[];
  confidence: number;
  provider: string;
};

export interface WebsiteAnalyzer {
  readonly name: string;
  analyze(url: string): Promise<WebsiteAnalysisResult>;
}

export type ContactLookupResult = {
  fullName?: string;
  title?: string;
  email?: string;
  linkedinUrl?: string;
  provenance: string;
};

export interface ContactProvider {
  readonly name: string;
  findProfessionalContact(input: {
    companyName: string;
    website?: string;
    preferredTitles?: string[];
  }): Promise<ContactLookupResult | null>;
}

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export interface AIProvider {
  readonly name: string;
  complete(messages: ChatMessage[], options?: { json?: boolean }): Promise<string>;
}

export type SendEmailInput = {
  to: string;
  subject: string;
  body: string;
  fromAccountId: string;
};

export interface EmailProvider {
  readonly name: string;
  send(input: SendEmailInput): Promise<{ id: string }>;
  getAuthUrl(redirectUri: string): string;
}

export interface CalendarProvider {
  readonly name: string;
  createEvent(input: {
    title: string;
    startsAt: string;
    endsAt: string;
    attendeeEmail?: string;
  }): Promise<{ id: string }>;
}
