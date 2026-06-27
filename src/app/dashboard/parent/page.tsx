import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ParentDashboardClient } from "@/components/parent/ParentDashboardClient";
import { getCountries, getCurriculumFromDb, mergeCurriculumWithFallback } from "@/lib/db/platform";

export default async function ParentDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const countries = await getCountries();
  let dbSettings = null;
  try {
    dbSettings = await getCurriculumFromDb(user.id);
  } catch { /* tables may not exist yet */ }

  const settings = mergeCurriculumWithFallback(dbSettings, user.user_metadata);
  const userName = user.user_metadata?.full_name?.split(" ")[0] || "Guardian";

  return (
    <ParentDashboardClient
      userEmail={user.email ?? ""}
      userName={userName}
      initialSettings={settings}
      countries={countries}
    />
  );
}
