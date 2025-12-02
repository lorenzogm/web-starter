import { $fetchRaw } from "nitro-test-utils/e2e";
import { describe, expect, it } from "vitest";
import {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_OK,
} from "../../../../utils/http-response-status-code";

const EXPECTED_TOTAL = 100;
const LONG_RUNNING_TEST_TIMEOUT = 10_000;

describe("PUT /commerce/v1/orders/:id", () => {
  it("should update an existing order", async () => {
    const updateData = {
      customerName: "Updated Customer",
      status: "confirmed" as const,
    };

    const { data, status } = await $fetchRaw("/commerce/v1/orders/1", {
      method: "PUT",
      body: updateData,
    });

    expect(status).toBe(HTTP_OK);
    expect(data).toHaveProperty("success", true);
    expect(data).toHaveProperty("message", "Order updated successfully");
    expect(data.data.customerName).toBe("Updated Customer");
    expect(data.data.status).toBe("confirmed");
  });

  it(
    "should recalculate total when items are updated",
    async () => {
      const updateData = {
        items: [{ productId: "P001", quantity: 5, price: 20 }],
      };

      const { data, status } = await $fetchRaw("/commerce/v1/orders/1", {
        method: "PUT",
        body: updateData,
      });

      expect(status).toBe(HTTP_OK);
      expect(data.data.totalAmount).toBe(EXPECTED_TOTAL);
    },
    LONG_RUNNING_TEST_TIMEOUT
  );

  it("should return 404 for non-existent order", async () => {
    const updateData = {
      customerName: "Updated Customer",
    };

    const { status } = await $fetchRaw("/commerce/v1/orders/999", {
      method: "PUT",
      body: updateData,
    });

    expect(status).toBe(HTTP_NOT_FOUND);
  });

  it("should return 400 when status is invalid", async () => {
    const updateData = {
      status: "invalid-status",
    };

    const { status } = await $fetchRaw("/commerce/v1/orders/1", {
      method: "PUT",
      body: updateData,
    });

    expect(status).toBe(HTTP_BAD_REQUEST);
  });

  it("should return 400 when items have negative quantity", async () => {
    const updateData = {
      items: [{ productId: "P001", quantity: -1, price: 20 }],
    };

    const { status } = await $fetchRaw("/commerce/v1/orders/1", {
      method: "PUT",
      body: updateData,
    });

    expect(status).toBe(HTTP_BAD_REQUEST);
  });
});
