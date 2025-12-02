import { $fetchRaw } from "nitro-test-utils/e2e";
import { describe, expect, it } from "vitest";
import {
  HTTP_NOT_FOUND,
  HTTP_OK,
} from "../../../../utils/http-response-status-code";

describe("DELETE /commerce/v1/orders/:id", () => {
  it("should delete an existing order", async () => {
    const { data, status } = await $fetchRaw("/commerce/v1/orders/1", {
      method: "DELETE",
    });

    expect(status).toBe(HTTP_OK);
    expect(data).toHaveProperty("success", true);
    expect(data).toHaveProperty("message");
    expect(data.message).toContain("deleted successfully");
  });

  it("should return 404 for non-existent order", async () => {
    const { status } = await $fetchRaw("/commerce/v1/orders/999", {
      method: "DELETE",
    });

    expect(status).toBe(HTTP_NOT_FOUND);
  });
});
