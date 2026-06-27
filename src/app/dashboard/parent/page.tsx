import { ParentDashboardClient } from "@/components/parent/ParentDashboardClient";
import {
  getCountries,
  getCurriculumFromDb,
  getLinkedChildren,
  getPendingCustomTopicsForParent,
  mergeCurriculumWithFallback,
} from "@/lib/db/platform";
import { requireRole } from "@/lib/auth/dashboard-access";

export default async function ParentDashboardPage() {
  const { user } = await requireRole(["parent", "admin"]);

  const countries = await getCountries();
  let dbSettings = null;
  let linkedChildren: Awaited<ReturnType<typeof getLinkedChildren>> = [];
  let pendingTopics: Awaited<ReturnType<typeof getPendingCustomTopicsForParent>> = [];

  try {
    dbSettings = await getCurriculumFromDb(user.id);
    linkedChildren = await getLinkedChildren(user.id);
    pendingTopics = await getPendingCustomTopicsForParent(user.id);
  } catch { /* tables may not exist yet */ }

  const settings = mergeCurriculumWithFallback(dbSettings, user.user_metadata);
  const userName = user.user_metadata?.full_name?.split(" ")[0] || "Guardian";

  return (
    <ParentDashboardClient
      userEmail={user.email ?? ""}
      userName={userName}
      initialSettings={settings}
      countries={countries}
      linkedChildren={linkedChildren}
      pendingTopics={pendingTopics}
    />
  );
}
