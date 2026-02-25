import { getBySlug } from "@/app/entities/short-link/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  // { params }: { params: Promise<{ slug: string }> },
  ctx: RouteContext<"/go/[slug]">
) {
  // const { slug } = await params;
  const { slug } = await ctx.params;
  const shortLink = await getBySlug(slug);

  if (!shortLink) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.redirect(shortLink.url);
}
