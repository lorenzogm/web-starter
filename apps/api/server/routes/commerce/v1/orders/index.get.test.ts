import { $fetchRaw } from "nitro-test-utils/e2e";
import { describe, expect, it } from "vitest";
import { HTTP_OK } from "../../../../utils/http-response-status-code";

describe("GET /commerce/v1/orders", () => {
  it("should return all orders", async () => {
    const { data, status } = await $fetchRaw("/commerce/v1/orders");

    expect(status).toBe(HTTP_OK);
    expect(data).toHaveProperty("success", true);
    expect(data).toHaveProperty("data");
    expect(data).toHaveProperty("count");
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.count).toBeGreaterThan(0);
  });

  it("should return orders with correct structure", async () => {
    const { data } = await $fetchRaw("/commerce/v1/orders");

    const order = data.data[0];
    expect(order).toHaveProperty("id");
    expect(order).toHaveProperty("customerName");
    expect(order).toHaveProperty("items");
    expect(order).toHaveProperty("totalAmount");
    expect(order).toHaveProperty("status");
    expect(order).toHaveProperty("createdAt");
    expect(order).toHaveProperty("updatedAt");
  });
});
