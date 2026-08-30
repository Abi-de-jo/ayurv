import { NextResponse } from "next/server";
import { getActivePromotion } from "@/db/queries";

export async function GET() {
  try {
    const promo = await getActivePromotion();
    return NextResponse.json({ promo });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch promotion" }, { status: 500 });
  }
}
