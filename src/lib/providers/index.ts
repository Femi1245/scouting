import {
  demoAIProvider,
  demoContactProvider,
  demoEmailProvider,
  demoSearchProvider,
  demoWebsiteAnalyzer,
} from "./demo";
import { groqAIProvider } from "./groq";
import type {
  AIProvider,
  ContactProvider,
  EmailProvider,
  SearchProvider,
  WebsiteAnalyzer,
} from "./types";

export function getSearchProvider(): SearchProvider {
  return demoSearchProvider;
}

export function getWebsiteAnalyzer(): WebsiteAnalyzer {
  return demoWebsiteAnalyzer;
}

export function getContactProvider(): ContactProvider {
  return demoContactProvider;
}

export function getAIProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER || "demo").toLowerCase();
  const hasGroq = Boolean(process.env.GROQ_API_KEY?.trim());

  if ((provider === "groq" || provider === "auto") && hasGroq) {
    return groqAIProvider;
  }

  if (provider === "groq" && !hasGroq) {
    console.warn("AI_PROVIDER=groq but GROQ_API_KEY is missing; using demo AI");
  }

  return demoAIProvider;
}

export function getEmailProvider(
  provider: "gmail" | "microsoft" | "demo" = "demo",
): EmailProvider {
  void provider;
  return demoEmailProvider;
}
