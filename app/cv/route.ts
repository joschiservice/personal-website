import { NextResponse } from "next/server";
import { getCvUrl } from "@/app/lib/cv";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get("lang") ?? "en";
  const url = await getCvUrl(locale);
  if (!url) {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }
  return NextResponse.redirect(url, { status: 302 });
}
