import Link from "next/link";
import { DEMO_BADGE } from "@/lib/demo/data";
import {
  AUTH_CALLBACK_URIS,
  GMAIL_REDIRECT_URIS,
  PRODUCTION_APP_URL,
  getGmailWebhookUrl,
} from "@/lib/config";
import { isGoogleOAuthConfigured } from "@/lib/email/gmail-oauth";
import { isGmailPubSubConfigured } from "@/lib/email/gmail-api";
import { getGmailConnectionStatus } from "@/lib/email/gmail-store";
import { disconnectGmail } from "./actions";

export const dynamic = "force-dynamic";

export default async function IntegrationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    connected?: string;
    watch_error?: string;
  }>;
}) {
  const params = await searchParams;
  const googleReady = isGoogleOAuthConfigured();
  const pubsubReady = isGmailPubSubConfigured();
  const gmail = await getGmailConnectionStatus();
  const webhookUrl = getGmailWebhookUrl();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-amber-800">{DEMO_BADGE}</p>
        <h1 className="font-display text-3xl font-semibold">Integrations</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Connect email with OAuth. We never store email passwords.
        </p>
      </div>

      {params.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          Connection error: {params.error}
        </p>
      )}
      {params.connected === "gmail" && (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          Gmail connected successfully.
        </p>
      )}
      {params.watch_error && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
          Pub/Sub watch not started yet: {params.watch_error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Gmail</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Status:{" "}
            <span
              className={
                gmail.connected
                  ? "font-medium text-emerald-800"
                  : "font-medium"
              }
            >
              {gmail.connected ? "Connected" : "Disconnected"}
            </span>
          </p>
          {gmail.connected && (
            <p className="mt-1 text-sm">
              Email:{" "}
              <a
                href={`mailto:${gmail.email}`}
                className="text-[var(--accent)] hover:underline"
              >
                {gmail.email}
              </a>
            </p>
          )}
          <p className="mt-3 text-xs text-[var(--muted)]">
            Permissions: send, read, and modify mail. Tokens encrypted. Inbox
            push via Pub/Sub when configured.
          </p>

          {gmail.connected ? (
            <form action={disconnectGmail} className="mt-4">
              <button
                type="submit"
                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                Disconnect
              </button>
            </form>
          ) : googleReady ? (
            <Link
              href="/api/oauth/google/start"
              className="mt-4 inline-flex rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
            >
              Connect Gmail
            </Link>
          ) : (
            <p className="mt-4 text-xs text-amber-800">
              Set GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET to enable live OAuth.
            </p>
          )}
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold">Gmail Pub/Sub</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Status:{" "}
            <span
              className={
                pubsubReady ? "font-medium text-emerald-800" : "font-medium"
              }
            >
              {pubsubReady ? "Configured" : "Missing env"}
            </span>
          </p>
          <ul className="mt-3 space-y-1 text-xs text-[var(--muted)]">
            <li>
              App:{" "}
              <code className="text-[var(--ink)]">{PRODUCTION_APP_URL}</code>
            </li>
            <li>
              Topic:{" "}
              <code className="text-[var(--ink)]">
                {process.env.GMAIL_PUBSUB_TOPIC || "—"}
              </code>
            </li>
            <li>
              Subscription:{" "}
              <code className="text-[var(--ink)]">
                {process.env.GMAIL_PUBSUB_SUBSCRIPTION || "—"}
              </code>
            </li>
            <li>
              Webhook: <code className="text-[var(--ink)]">{webhookUrl}</code>
            </li>
          </ul>
        </section>
      </div>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm">
        <h2 className="font-semibold">Required Google / Supabase URLs</h2>
        <div className="mt-3 space-y-3 text-[var(--muted)]">
          <div>
            <p className="font-medium text-[var(--ink)]">
              Gmail OAuth redirect URIs
            </p>
            <ul className="mt-1 list-disc pl-5">
              {GMAIL_REDIRECT_URIS.map((u) => (
                <li key={u}>
                  <code className="text-[var(--ink)]">{u}</code>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-[var(--ink)]">
              Supabase Auth callbacks
            </p>
            <ul className="mt-1 list-disc pl-5">
              {AUTH_CALLBACK_URIS.map((u) => (
                <li key={u}>
                  <code className="text-[var(--ink)]">{u}</code>
                </li>
              ))}
            </ul>
          </div>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Topic permissions: add{" "}
              <code className="text-[var(--ink)]">
                gmail-api-push@system.gserviceaccount.com
              </code>{" "}
              as <strong>Pub/Sub Publisher</strong>.
            </li>
            <li>
              Subscription push endpoint:{" "}
              <code className="text-[var(--ink)]">{webhookUrl}</code>
            </li>
            <li>Connect Gmail above to start <code>users.watch</code>.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
