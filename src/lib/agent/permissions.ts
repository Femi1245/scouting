export type AgentMode = "draft" | "approval" | "autopilot";

export type AgentPermissionKey =
  | "find_businesses"
  | "analyze_websites"
  | "find_contacts"
  | "generate_outreach"
  | "send_approved_emails"
  | "send_autopilot_emails"
  | "read_replies"
  | "draft_replies"
  | "send_automatic_replies"
  | "schedule_followups";

export type AgentPermissions = Record<AgentPermissionKey, boolean> & {
  mode: AgentMode;
  paused: boolean;
  daily_send_limit: number;
  max_new_contacts_per_day: number;
};

export const DEFAULT_PERMISSIONS: AgentPermissions = {
  mode: "draft",
  paused: true,
  daily_send_limit: 25,
  max_new_contacts_per_day: 20,
  find_businesses: true,
  analyze_websites: true,
  find_contacts: true,
  generate_outreach: true,
  send_approved_emails: false,
  send_autopilot_emails: false,
  read_replies: false,
  draft_replies: true,
  send_automatic_replies: false,
  schedule_followups: false,
};

export function canRunTool(
  permissions: AgentPermissions,
  tool: AgentPermissionKey,
): { ok: true } | { ok: false; reason: string } {
  if (permissions.paused) {
    return { ok: false, reason: "Agent is paused. Resume to continue." };
  }
  if (!permissions[tool]) {
    return { ok: false, reason: `Permission denied: ${tool}` };
  }
  if (
    tool === "send_autopilot_emails" &&
    permissions.mode !== "autopilot"
  ) {
    return { ok: false, reason: "Autopilot mode required to send without approval." };
  }
  if (
    tool === "send_approved_emails" &&
    permissions.mode === "draft"
  ) {
    return { ok: false, reason: "Draft mode cannot send email. Switch to Approval or Autopilot." };
  }
  return { ok: true };
}
