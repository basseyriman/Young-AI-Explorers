import { ParentDashboardClient } from "@/components/parent/ParentDashboardClient";
import {
  getCountries,
  getCurriculumFromDb,
  getApprovedCustomTopicsForLinkedChildren,
  getLinkedChildren,
  getPendingCustomTopicsForParent,
  mergeCurriculumWithFallback,
  syncFamilyLinksByEmail,
} from "@/lib/db/platform";
import { requireRole } from "@/lib/auth/dashboard-access";

export default async function ParentDashboardPage() {
  const { user } = await requireRole(["parent", "admin"]);

  await syncFamilyLinksByEmail(user.id);

  const countries = await getCountries();
  let dbSettings = null;
  let linkedChildren: Awaited<ReturnType<typeof getLinkedChildren>> = [];
  let pendingTopics: Awaited<ReturnType<typeof getPendingCustomTopicsForParent>> = [];

  try {
    dbSettings = await getCurriculumFromDb(user.id);
    linkedChildren = await getLinkedChildren(user.id);
    pendingTopics = await getPendingCustomTopicsForParent(user.id);
  } catch { /* tables may not exist yet */ }

  const childCustomTopics = await getApprovedCustomTopicsForLinkedChildren(user.id).catch(() => [] as Awaited<ReturnType<typeof getApprovedCustomTopicsForLinkedChildren>>);

  const settings = mergeCurriculumWithFallback(dbSettings, user.user_metadata);
  settings.customTopics = childCustomTopics;
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
