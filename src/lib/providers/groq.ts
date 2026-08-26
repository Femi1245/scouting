import type { AIProvider, ChatMessage } from "./types";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export const groqAIProvider: AIProvider = {
  name: "groq",
  async complete(messages: ChatMessage[], options?: { json?: boolean }) {
    const apiKey = process.env.GROQ_API_KEY?.trim();
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not set");
    }

    const model =
      process.env.GROQ_MODEL?.trim() || "llama-3.3-70b-versatile";

    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.4,
        ...(options?.json
          ? { response_format: { type: "json_object" } }
          : {}),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Groq API error ${res.status}: ${errText}`);
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error("Groq returned an empty response");
    }
    return content;
  },
};
