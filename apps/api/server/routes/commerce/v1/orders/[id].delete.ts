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

  const orderIndex = mockOrders.findIndex((o) => o.id === id);

  if (orderIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: `Order with ID ${id} not found`,
    });
  }

  return {
    success: true,
    message: `Order ${id} deleted successfully`,
  };
});
