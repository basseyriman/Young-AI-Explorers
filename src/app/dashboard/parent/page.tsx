import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ParentDashboardClient } from "@/components/parent/ParentDashboardClient";
import { curriculumFromUserMetadata } from "@/lib/curriculum-utils";

export default async function ParentDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const settings = curriculumFromUserMetadata(user.user_metadata);
  const userName = user.user_metadata?.full_name?.split(" ")[0] || "Guardian";

  return (
    <ParentDashboardClient
      userEmail={user.email ?? ""}
      userName={userName}
      initialSettings={settings}
    />
  );
}
