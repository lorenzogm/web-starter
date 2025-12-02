import { z } from "zod";

export const orderStatusSchema = z.enum([
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
]);

export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  price: z.number().positive("Price must be positive"),
});

export const orderSchema = z.object({
  id: z.string(),
  customerName: z.string().min(1, "Customer name is required"),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
  totalAmount: z.number().nonnegative("Total amount must be non-negative"),
  status: orderStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Order = z.infer<typeof orderSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;
