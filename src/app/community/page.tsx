import { createClient } from "@/utils/supabase/server";
import { getCountries, getCountryTrending, getProfile } from "@/lib/db/platform";
import { CommunityClient } from "@/components/CommunityClient";

export default async function CommunityPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const countries = await getCountries();
  const defaultCode = user ? (await getProfile(user.id))?.country_code ?? "GB" : "GB";
  const trending = await getCountryTrending(defaultCode);
  const profile = user ? await getProfile(user.id) : null;

  return (
    <CommunityClient
      countries={countries.length ? countries : [{ code: "GB", name: "United Kingdom", flag_emoji: "🇬🇧", is_featured: true, explorer_count: 0 }]}
      initialTrending={trending}
      initialCountryCode={defaultCode}
      userNickname={profile?.nickname ?? profile?.full_name?.split(" ")[0]}
      isLoggedIn={!!user}
    />
  );
}
