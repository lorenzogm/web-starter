import { createError, defineEventHandler, getRouterParam } from "h3";
import { zh } from "h3-zod";
import { z } from "zod";
import { mockOrders } from "./orders.mocks";
import {
  type Order,
  orderItemSchema,
  orderStatusSchema,
} from "./orders.schemas";

const updateOrderSchema = z.object({
  customerName: z.string().min(1, "Customer name is required").optional(),
  items: z
    .array(orderItemSchema)
    .min(1, "At least one item is required")
    .optional(),
  status: orderStatusSchema.optional(),
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await zh.useValidatedBody(event, updateOrderSchema);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Order ID is required",
    });
  }

  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    throw createError({
      statusCode: 404,
      statusMessage: `Order with ID ${id} not found`,
    });
  }

  const updatedOrder: Order = {
    ...order,
    ...(body.customerName && { customerName: body.customerName }),
    ...(body.items && { items: body.items }),
    ...(body.status && { status: body.status }),
    updatedAt: new Date().toISOString(),
  };

  if (body.items) {
    updatedOrder.totalAmount = body.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }

  return {
    success: true,
    data: updatedOrder,
    message: "Order updated successfully",
  };
});
