import { createError, defineEventHandler, getRouterParam } from "h3";
import { mockOrders } from "./orders.mocks";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

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

  return {
    success: true,
    data: order,
  };
});
