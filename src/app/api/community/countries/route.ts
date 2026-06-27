import { NextResponse } from "next/server";
import { getCountries } from "@/lib/db/platform";

export async function GET() {
  const countries = await getCountries();
  const featured = countries.filter((c) => c.is_featured).slice(0, 12);
  return NextResponse.json({ countries, featured });
}
