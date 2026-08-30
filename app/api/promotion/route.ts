import { NextRequest, NextResponse } from "next/server";
import { getActivePromotion, checkPromoUsedByCustomer } from "@/db/queries";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const customerKey = searchParams.get("customerKey") || searchParams.get("customerId");

    const promo = await getActivePromotion();
    let alreadyUsed = false;

    if (customerKey && promo?.code) {
      alreadyUsed = await checkPromoUsedByCustomer(customerKey, promo.code);
    }

    return NextResponse.json({ promo, alreadyUsed });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch promotion" }, { status: 500 });
  }
}
