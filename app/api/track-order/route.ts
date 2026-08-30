import { NextRequest, NextResponse } from "next/server";
import { getOrderById } from "@/db/queries";
import { getOrdersByCustomerIdPersistent, getAllOrdersPersistent } from "@/db/storage";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const customerKey = searchParams.get("customerKey") || searchParams.get("customerId");

  let orders: any[] = [];
  if (customerKey && customerKey.trim() !== "") {
    orders = getOrdersByCustomerIdPersistent(customerKey);
  }

  let order = null;
  if (code && code.trim() !== "") {
    order = await getOrderById(code);
  }

  // Fallback if no specific order match found
  if (!order && orders.length > 0) {
    order = orders[orders.length - 1];
  }

  if (!order) {
    order = await getOrderById("latest");
  }

  if (!orders || orders.length === 0) {
    orders = getAllOrdersPersistent();
  }

  if (!order) {
    return NextResponse.json({ error: "No orders active" }, { status: 404 });
  }

  return NextResponse.json({ order, orders });
}
