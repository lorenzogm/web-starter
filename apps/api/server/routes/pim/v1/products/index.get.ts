import { defineEventHandler } from "h3";
import { mockProducts } from "./products.mocks";

export default defineEventHandler(() => ({
  success: true,
  data: mockProducts,
  count: mockProducts.length,
}));
