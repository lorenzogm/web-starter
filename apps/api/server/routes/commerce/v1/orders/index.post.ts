import { defineEventHandler } from "h3";
import { zh } from "h3-zod";
import { z } from "zod";
import { type Order, orderItemSchema } from "./orders.schemas";

const createOrderSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
});

export default defineEventHandler(async (event) => {
  const body = await zh.useValidatedBody(event, createOrderSchema);

  const totalAmount = body.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const newOrder: Order = {
    id: String(Date.now()),
    customerName: body.customerName,
    items: body.items,
    totalAmount,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    success: true,
    data: newOrder,
    message: "Order created successfully",
  };
});
