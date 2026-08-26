import Link from "next/link";
import { DEMO_BADGE } from "@/lib/demo/data";
import { isDemoMode } from "@/lib/utils";

export function DemoBanner() {
  if (!isDemoMode()) return null;
  return (
    <div className="border-b border-amber-200/80 bg-amber-50 px-4 py-2 text-center text-xs text-amber-950">
      <span className="font-semibold">{DEMO_BADGE}</span>
      {" — "}
      Fictional companies, contacts, and replies. Not live production data.{" "}
      <Link href="/app/settings" className="underline underline-offset-2">
        Learn more
      </Link>
    </div>
  );
}
