import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isBusinessOpenNow } from "@/components/public/public-page.types";

describe("isBusinessOpenNow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("supports hour ranges without minutes", () => {
    vi.setSystemTime(new Date("2026-03-10T09:30:00"));

    expect(isBusinessOpenNow("Lundi - Samedi: 8h-19h\nDimanche: Ferme")).toBe(true);
  });

  it("supports hour ranges with explicit minutes", () => {
    vi.setSystemTime(new Date("2026-03-10T19:30:00"));

    expect(isBusinessOpenNow("Lundi - Samedi: 8h00 - 19h00\nDimanche: Ferme")).toBe(false);
  });
});