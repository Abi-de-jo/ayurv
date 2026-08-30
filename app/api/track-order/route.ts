import { NextRequest, NextResponse } from "next/server";
import { getOrderById, getOrdersByCustomerId } from "@/db/queries";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const customerKey = searchParams.get("customerKey") || searchParams.get("customerId");

  let orders: any[] = [];

  // 1. If tracking code is supplied, search by code in Neon DB
  let order: any = null;
  if (code && code.trim() !== "") {
    order = await getOrderById(code);
  }

  // 2. If customer key is supplied, retrieve all orders for this customer from Neon DB
  if (customerKey && customerKey.trim() !== "") {
    orders = await getOrdersByCustomerId(customerKey);
  }

  // Set default active order if match found in customer orders list
  if (!order && orders.length > 0) {
    order = orders[orders.length - 1];
  }

  // 3. Return 404 if no order found in Neon DB
  if (!order) {
    return NextResponse.json(
      { error: "Order not found", orders: [] },
      { status: 404 }
    );
  }

  return NextResponse.json({ order, orders }, { status: 200 });
}
