import { NextResponse } from "next/server";
import { getCountryTrending } from "@/lib/db/platform";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country") ?? "GB";
  const trending = await getCountryTrending(country);
  return NextResponse.json({ trending });
}
