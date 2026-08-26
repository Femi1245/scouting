/** Usage ledger — monetization-ready metric store (memory for demo). */

export type UsageRecord = {
  id: string;
  workspaceId: string;
  metric: string;
  quantity: number;
  createdAt: string;
};

const memory: UsageRecord[] = [];

export async function recordUsage(
  workspaceId: string,
  metric: string,
  quantity = 1,
) {
  memory.push({
    id: `use_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    workspaceId,
    metric,
    quantity,
    createdAt: new Date().toISOString(),
  });
}

export async function sumUsage(workspaceId: string, metric: string) {
  return memory
    .filter((r) => r.workspaceId === workspaceId && r.metric === metric)
    .reduce((acc, r) => acc + r.quantity, 0);
}

export async function listUsage(workspaceId: string) {
  return memory.filter((r) => r.workspaceId === workspaceId);
}
