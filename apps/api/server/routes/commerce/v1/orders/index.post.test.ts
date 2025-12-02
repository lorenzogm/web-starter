import { $fetchRaw } from "nitro-test-utils/e2e";
import { describe, expect, it } from "vitest";
import {
  HTTP_BAD_REQUEST,
  HTTP_OK,
} from "../../../../utils/http-response-status-code";

const EXPECTED_ORDER_TOTAL = 109.97;

describe("POST /commerce/v1/orders", () => {
  it("should create a new order", async () => {
    const newOrder = {
      customerName: "Test Customer",
      items: [
        { productId: "P001", quantity: 2, price: 29.99 },
        { productId: "P002", quantity: 1, price: 49.99 },
      ],
    };

    const { data, status } = await $fetchRaw("/commerce/v1/orders", {
      method: "POST",
      body: newOrder,
    });

    expect(status).toBe(HTTP_OK);
    expect(data).toHaveProperty("success", true);
    expect(data).toHaveProperty("message", "Order created successfully");
    expect(data.data).toHaveProperty("id");
    expect(data.data.customerName).toBe("Test Customer");
    expect(data.data.status).toBe("pending");
    expect(data.data.totalAmount).toBe(EXPECTED_ORDER_TOTAL);
  });

  it("should return 400 when customerName is missing", async () => {
    const invalidOrder = {
      items: [{ productId: "P001", quantity: 1, price: 10 }],
    };

    const { status } = await $fetchRaw("/commerce/v1/orders", {
      method: "POST",
      body: invalidOrder,
    });

    expect(status).toBe(HTTP_BAD_REQUEST);
  });

  it("should return 400 when items are missing", async () => {
    const invalidOrder = {
      customerName: "Test Customer",
    };

    const { status } = await $fetchRaw("/commerce/v1/orders", {
      method: "POST",
      body: invalidOrder,
    });

    expect(status).toBe(HTTP_BAD_REQUEST);
  });

  it("should return 400 when items array is empty", async () => {
    const invalidOrder = {
      customerName: "Test Customer",
      items: [],
    };

    const { status } = await $fetchRaw("/commerce/v1/orders", {
      method: "POST",
      body: invalidOrder,
    });

    expect(status).toBe(HTTP_BAD_REQUEST);
  });

  it("should return 400 when quantity is negative", async () => {
    const invalidOrder = {
      customerName: "Test Customer",
      items: [{ productId: "P001", quantity: -5, price: 10 }],
    };

    const { status } = await $fetchRaw("/commerce/v1/orders", {
      method: "POST",
      body: invalidOrder,
    });

    expect(status).toBe(HTTP_BAD_REQUEST);
  });

  it("should return 400 when price is negative", async () => {
    const invalidOrder = {
      customerName: "Test Customer",
      items: [{ productId: "P001", quantity: 1, price: -10 }],
    };

    const { status } = await $fetchRaw("/commerce/v1/orders", {
      method: "POST",
      body: invalidOrder,
    });

    expect(status).toBe(HTTP_BAD_REQUEST);
  });

  it("should return 400 when productId is empty", async () => {
    const invalidOrder = {
      customerName: "Test Customer",
      items: [{ productId: "", quantity: 1, price: 10 }],
    };

    const { status } = await $fetchRaw("/commerce/v1/orders", {
      method: "POST",
      body: invalidOrder,
    });

    expect(status).toBe(HTTP_BAD_REQUEST);
  });
});
