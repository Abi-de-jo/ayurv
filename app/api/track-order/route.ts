import { NextRequest, NextResponse } from "next/server";
import { getOrderById } from "@/db/queries";
import { getOrdersByCustomerIdPersistent } from "@/db/storage";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const customerKey = searchParams.get("customerKey") || searchParams.get("customerId");

  let orders: any[] = [];

  // If specific tracking code is supplied, search by code first
  let order: any = null;
  if (code && code.trim() !== "") {
    order = await getOrderById(code);
  }

  // If customer key is supplied, retrieve all orders for this customer
  if (customerKey && customerKey.trim() !== "") {
    orders = getOrdersByCustomerIdPersistent(customerKey);
  }

  // Set default active order if match found in customer orders list
  if (!order && orders.length > 0) {
    order = orders[orders.length - 1];
  }

  // If still no order found, return 404
  if (!order) {
    return NextResponse.json(
      { error: "Order not found", orders: [] },
      { status: 404 }
    );
  }

  return NextResponse.json({ order, orders }, { status: 200 });
}
