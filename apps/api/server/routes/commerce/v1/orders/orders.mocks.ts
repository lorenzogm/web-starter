import type { Order } from "./orders.schemas";

export const mockOrders: Order[] = [
  {
    id: "1",
    customerName: "John Doe",
    items: [
      { productId: "P001", quantity: 2, price: 29.99 },
      { productId: "P002", quantity: 1, price: 49.99 },
    ],
    totalAmount: 109.97,
    status: "confirmed",
    createdAt: "2025-10-20T10:00:00Z",
    updatedAt: "2025-10-20T10:00:00Z",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    items: [{ productId: "P003", quantity: 3, price: 19.99 }],
    totalAmount: 59.97,
    status: "shipped",
    createdAt: "2025-10-21T14:30:00Z",
    updatedAt: "2025-10-22T09:15:00Z",
  },
  {
    id: "3",
    customerName: "Bob Wilson",
    items: [
      { productId: "P001", quantity: 1, price: 29.99 },
      { productId: "P004", quantity: 2, price: 15.99 },
    ],
    totalAmount: 61.97,
    status: "pending",
    createdAt: "2025-10-23T08:45:00Z",
    updatedAt: "2025-10-23T08:45:00Z",
  },
  {
    id: "4",
    customerName: "Alice Brown",
    items: [{ productId: "P005", quantity: 5, price: 9.99 }],
    totalAmount: 49.95,
    status: "delivered",
    createdAt: "2025-10-18T16:20:00Z",
    updatedAt: "2025-10-24T11:30:00Z",
  },
];
