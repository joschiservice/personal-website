import { NextResponse } from "next/server"
import { getCachedCvUrl } from "@/app/lib/cv"

export const revalidate = 3600

export async function GET() {
  const url = await getCachedCvUrl()
  if (!url) {
    return NextResponse.json({ error: "CV not found" }, { status: 404 })
  }
  return NextResponse.redirect(url, { status: 302 })
}


