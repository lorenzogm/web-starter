import { defineEventHandler } from "h3";
import { mockOrders } from "./orders.mocks";

export default defineEventHandler(() => ({
  success: true,
  data: mockOrders,
  count: mockOrders.length,
}));
