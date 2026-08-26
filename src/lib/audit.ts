/** In-memory audit for demo; swap to Supabase audit_logs in production. */

export type AuditEntry = {
  id: string;
  workspaceId: string;
  actorId?: string;
  action: string;
  meta?: Record<string, unknown>;
  createdAt: string;
};

const memory: AuditEntry[] = [];

export async function recordAudit(
  workspaceId: string,
  action: string,
  meta?: Record<string, unknown>,
  actorId?: string,
) {
  memory.unshift({
    id: `aud_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    workspaceId,
    actorId,
    action,
    meta,
    createdAt: new Date().toISOString(),
  });
  if (memory.length > 500) memory.pop();
}

export async function listAudit(workspaceId: string, limit = 50) {
  return memory.filter((e) => e.workspaceId === workspaceId).slice(0, limit);
}
