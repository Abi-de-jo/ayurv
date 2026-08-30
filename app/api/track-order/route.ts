import { NextRequest, NextResponse } from "next/server";
import { getOrderById } from "@/db/queries";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  let order = null;
  if (code && code.trim() !== "") {
    order = await getOrderById(code);
  }

  // Fallback to latest order if specific code lookup yielded null
  if (!order) {
    order = await getOrderById("latest");
  }

  if (!order) {
    return NextResponse.json({ error: "No orders active" }, { status: 404 });
  }

  return NextResponse.json({ order });
}
