import { canRunTool, type AgentPermissionKey, type AgentPermissions } from "./permissions";
import { getContactProvider, getSearchProvider, getWebsiteAnalyzer } from "@/lib/providers";
import { computeOpportunityScore } from "./scoring";
import { recordAudit } from "@/lib/audit";
import { recordUsage } from "@/lib/usage";

type ToolContext = {
  workspaceId: string;
  userId?: string;
  permissions: AgentPermissions;
};

async function guard(ctx: ToolContext, tool: AgentPermissionKey) {
  const check = canRunTool(ctx.permissions, tool);
  if (!check.ok) throw new Error(check.reason);
}

export async function searchBusinessesTool(
  ctx: ToolContext,
  query: { industry?: string; location?: string; keywords?: string[]; limit?: number },
) {
  await guard(ctx, "find_businesses");
  const results = await getSearchProvider().searchBusinesses(query);
  await recordUsage(ctx.workspaceId, "companies_discovered", results.length);
  await recordAudit(ctx.workspaceId, "tool.searchBusinesses", { count: results.length }, ctx.userId);
  return results;
}

export async function analyzeWebsiteTool(ctx: ToolContext, url: string) {
  await guard(ctx, "analyze_websites");
  const analysis = await getWebsiteAnalyzer().analyze(url);
  await recordUsage(ctx.workspaceId, "websites_analyzed", 1);
  await recordAudit(ctx.workspaceId, "tool.analyzeWebsite", { url }, ctx.userId);
  return analysis;
}

export async function findProfessionalContactTool(
  ctx: ToolContext,
  input: { companyName: string; website?: string },
) {
  await guard(ctx, "find_contacts");
  const contact = await getContactProvider().findProfessionalContact(input);
  if (contact) await recordUsage(ctx.workspaceId, "contacts_researched", 1);
  await recordAudit(ctx.workspaceId, "tool.findProfessionalContact", { company: input.companyName }, ctx.userId);
  return contact;
}

export async function scoreOpportunityTool(
  ctx: ToolContext,
  parts: Parameters<typeof computeOpportunityScore>[0],
) {
  const result = computeOpportunityScore(parts);
  await recordAudit(ctx.workspaceId, "tool.scoreOpportunity", { score: result.score }, ctx.userId);
  return result;
}
