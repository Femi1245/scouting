import { getAIProvider } from "@/lib/providers";

export type ServiceUnderstanding = {
  summary: string;
  industries: string[];
  problems: string[];
};

export async function understandService(
  description: string,
): Promise<ServiceUnderstanding> {
  const ai = getAIProvider();
  const raw = await ai.complete(
    [
      {
        role: "system",
        content:
          'Return JSON only with keys: summary (string), industries (string[]), problems (string[]).',
      },
      { role: "user", content: `Service description: ${description}` },
    ],
    { json: true },
  );

  try {
    const parsed = JSON.parse(raw) as ServiceUnderstanding;
    return parsed;
  } catch {
    return {
      summary: description.slice(0, 200),
      industries: [],
      problems: ["outdated website", "poor mobile UX"],
    };
  }
}
