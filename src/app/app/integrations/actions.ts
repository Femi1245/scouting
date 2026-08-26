"use server";

import { revalidatePath } from "next/cache";
import { clearGmailTokens } from "@/lib/email/gmail-store";
import { recordAudit } from "@/lib/audit";
import { getSession } from "@/lib/auth/session";

export async function disconnectGmail() {
  const session = await getSession();
  await clearGmailTokens();
  await recordAudit(
    session?.id ?? "anonymous",
    "gmail.disconnected",
    {},
    session?.id,
  );
  revalidatePath("/app/integrations");
}
