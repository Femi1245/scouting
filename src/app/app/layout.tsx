import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app/AppSidebar";
import { AppTopbar } from "@/components/app/AppTopbar";
import { DemoBanner } from "@/components/DemoBanner";
import { getSession } from "@/lib/auth/session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.onboardingCompleted) redirect("/onboarding");

  return (
    <div className="flex min-h-full flex-col">
      <DemoBanner />
      <div className="flex min-h-0 flex-1">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppTopbar userName={session.name} />
          <div className="flex-1 overflow-y-auto p-5 md:p-7">{children}</div>
        </div>
      </div>
    </div>
  );
}
