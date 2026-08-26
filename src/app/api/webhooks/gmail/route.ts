import { NextResponse } from "next/server";
import { syncGmailHistory } from "@/lib/email/gmail-api";
import { recordAudit } from "@/lib/audit";

type PubSubPushBody = {
  message?: {
    data?: string;
    messageId?: string;
    publishTime?: string;
  };
  subscription?: string;
};

/**
 * Google Pub/Sub push endpoint for Gmail mailbox updates.
 * Configure the subscription push URL to:
 *   https://YOUR_DOMAIN/api/webhooks/gmail
 */
export async function POST(request: Request) {
  let body: PubSubPushBody;
  try {
    body = (await request.json()) as PubSubPushBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const expectedSub = process.env.GMAIL_PUBSUB_SUBSCRIPTION?.trim();
  if (
    expectedSub &&
    body.subscription &&
    body.subscription !== expectedSub
  ) {
    return NextResponse.json({ error: "unexpected_subscription" }, { status: 403 });
  }

  if (!body.message?.data) {
    // Ack empty control messages
    return NextResponse.json({ ok: true });
  }

  let notification: { emailAddress?: string; historyId?: string };
  try {
    const decoded = Buffer.from(body.message.data, "base64").toString("utf8");
    notification = JSON.parse(decoded) as {
      emailAddress?: string;
      historyId?: string;
    };
  } catch {
    return NextResponse.json({ error: "invalid_message_data" }, { status: 400 });
  }

  await recordAudit("gmail", "pubsub.notification", {
    emailAddress: notification.emailAddress,
    historyId: notification.historyId,
    messageId: body.message.messageId,
  });

  // Cookie-bound tokens won't be available in a Pub/Sub worker context on
  // multi-user serverless. For the single-user MVP we still attempt sync;
  // production should load tokens from email_accounts by emailAddress.
  const result = await syncGmailHistory(notification.historyId);

  await recordAudit("gmail", "pubsub.synced", result);

  // Always 204/200 so Pub/Sub does not retry endlessly on soft failures
  return NextResponse.json({ ok: true, ...result });
}
