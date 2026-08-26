/**
 * Background job stubs — replace with Supabase Edge Functions / queue workers.
 * Long-running scout work must not run inside a single HTTP request.
 */

export type JobType =
  | "discover_companies"
  | "analyze_website"
  | "score_opportunity"
  | "find_contacts"
  | "generate_outreach"
  | "sync_inbox"
  | "classify_reply";

export type Job = {
  id: string;
  workspaceId: string;
  type: JobType;
  payload: Record<string, unknown>;
  status: "queued" | "running" | "completed" | "failed";
  error?: string;
};

const queue: Job[] = [];

export function enqueueJob(
  workspaceId: string,
  type: JobType,
  payload: Record<string, unknown> = {},
): Job {
  const job: Job = {
    id: `job_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    workspaceId,
    type,
    payload,
    status: "queued",
  };
  queue.push(job);
  return job;
}

export function listJobs(workspaceId: string) {
  return queue.filter((j) => j.workspaceId === workspaceId);
}
