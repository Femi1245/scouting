import type { GmailTokens } from "@/lib/email/gmail-oauth";
import { getGmailTokens, saveGmailTokens } from "@/lib/email/gmail-store";
import { classifyReply } from "@/lib/agent/classify-reply";
import { recordAudit } from "@/lib/audit";

function pubsubTopic() {
  return process.env.GMAIL_PUBSUB_TOPIC?.trim() ?? "";
}

export function isGmailPubSubConfigured() {
  return Boolean(
    process.env.GOOGLE_CLOUD_PROJECT_ID?.trim() &&
      process.env.GMAIL_PUBSUB_TOPIC?.trim() &&
      process.env.GMAIL_PUBSUB_SUBSCRIPTION?.trim(),
  );
}

async function refreshAccessToken(tokens: GmailTokens): Promise<GmailTokens> {
  if (!tokens.refreshToken) return tokens;

  const body = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!.trim(),
    client_secret: process.env.GOOGLE_CLIENT_SECRET!.trim(),
    refresh_token: tokens.refreshToken,
    grant_type: "refresh_token",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    throw new Error(`Failed to refresh Gmail token: ${await res.text()}`);
  }
  const json = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  const next: GmailTokens = {
    ...tokens,
    accessToken: json.access_token,
    expiry: Date.now() + json.expires_in * 1000,
  };
  await saveGmailTokens(next);
  return next;
}

export async function getValidGmailTokens(): Promise<GmailTokens | null> {
  const tokens = await getGmailTokens();
  if (!tokens) return null;
  if (Date.now() < tokens.expiry - 60_000) return tokens;
  return refreshAccessToken(tokens);
}

export async function startGmailWatch(tokens: GmailTokens) {
  const topicName = pubsubTopic();
  if (!topicName) {
    return { ok: false as const, error: "GMAIL_PUBSUB_TOPIC is not set" };
  }

  const valid = await getValidGmailTokens();
  if (!valid) {
    return { ok: false as const, error: "Gmail is not connected" };
  }

  const res = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/watch",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${valid.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicName,
        labelIds: ["INBOX"],
      }),
    },
  );

  if (!res.ok) {
    return {
      ok: false as const,
      error: `Gmail watch failed: ${await res.text()}`,
    };
  }

  const json = (await res.json()) as {
    historyId?: string;
    expiration?: string;
  };

  await saveGmailTokens({
    ...valid,
    historyId: json.historyId ?? valid.historyId,
    watchExpiration: json.expiration,
  });

  return {
    ok: true as const,
    historyId: json.historyId,
    expiration: json.expiration,
  };
}

export async function syncGmailHistory(historyId?: string) {
  const tokens = await getValidGmailTokens();
  if (!tokens) return { synced: 0, classifications: [] as string[] };

  const startHistoryId = historyId ?? tokens.historyId;
  if (!startHistoryId) {
    return { synced: 0, classifications: [] as string[] };
  }

  const url = new URL(
    "https://gmail.googleapis.com/gmail/v1/users/me/history",
  );
  url.searchParams.set("startHistoryId", startHistoryId);
  url.searchParams.set("historyTypes", "messageAdded");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${tokens.accessToken}` },
  });

  if (!res.ok) {
    // historyId too old — caller should re-watch / full sync later
    return {
      synced: 0,
      classifications: [] as string[],
      error: await res.text(),
    };
  }

  const json = (await res.json()) as {
    history?: Array<{
      messagesAdded?: Array<{ message?: { id?: string } }>;
    }>;
    historyId?: string;
  };

  const messageIds = new Set<string>();
  for (const item of json.history ?? []) {
    for (const added of item.messagesAdded ?? []) {
      if (added.message?.id) messageIds.add(added.message.id);
    }
  }

  const classifications: string[] = [];
  for (const id of messageIds) {
    const msgRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`,
      { headers: { Authorization: `Bearer ${tokens.accessToken}` } },
    );
    if (!msgRes.ok) continue;
    const msg = (await msgRes.json()) as {
      snippet?: string;
      payload?: { body?: { data?: string }; parts?: Array<{ body?: { data?: string } }> };
      labelIds?: string[];
    };

    // Only classify inbound (not SENT)
    if (msg.labelIds?.includes("SENT")) continue;

    const bodyText =
      decodeBody(msg.payload?.body?.data) ||
      decodeBody(msg.payload?.parts?.[0]?.body?.data) ||
      msg.snippet ||
      "";

    const result = classifyReply(bodyText);
    classifications.push(`${result.classification} (${Math.round(result.confidence * 100)}%)`);
    await recordAudit("gmail", "inbox.classified", {
      messageId: id,
      ...result,
    });
  }

  if (json.historyId) {
    await saveGmailTokens({ ...tokens, historyId: json.historyId });
  }

  return { synced: messageIds.size, classifications };
}

function decodeBody(data?: string) {
  if (!data) return "";
  try {
    return Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString(
      "utf8",
    );
  } catch {
    return "";
  }
}
