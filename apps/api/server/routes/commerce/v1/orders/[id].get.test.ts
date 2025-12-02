import { $fetchRaw } from "nitro-test-utils/e2e";
import { describe, expect, it } from "vitest";
import {
  HTTP_NOT_FOUND,
  HTTP_OK,
} from "../../../../utils/http-response-status-code";

describe("GET /commerce/v1/orders/:id", () => {
  it("should return a specific order", async () => {
    const { data, status } = await $fetchRaw("/commerce/v1/orders/1");

    expect(status).toBe(HTTP_OK);
    expect(data).toHaveProperty("success", true);
    expect(data).toHaveProperty("data");
    expect(data.data.id).toBe("1");
    expect(data.data.customerName).toBeDefined();
  });

  it("should return 404 for non-existent order", async () => {
    const { status } = await $fetchRaw("/commerce/v1/orders/999");

    expect(status).toBe(HTTP_NOT_FOUND);
  });
});
