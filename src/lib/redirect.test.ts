import { describe, expect, test } from "vitest";
import { isValidLinkId, safeDestination } from "@/lib/redirect";

describe("isValidLinkId", () => {
  test("accepts opaque ids", () => {
    expect(isValidLinkId("lnk_9fK2xQ")).toBe(true);
  });

  test.each(["", "a b", "../etc", "https://evil.example", "x".repeat(65), "a;b", "l\nx"])(
    "rejects %j",
    (id) => {
      expect(isValidLinkId(id)).toBe(false);
    },
  );
});

describe("safeDestination", () => {
  const hosts = ["track.example"];

  test("returns the URL for an allowed https host", () => {
    expect(safeDestination("https://track.example/c?id=1", hosts)?.toString()).toBe(
      "https://track.example/c?id=1",
    );
  });

  test.each([
    "http://track.example/c",
    "https://track.example.evil.example/c",
    "https://evil.example/?u=track.example",
    "javascript:alert(1)",
    "//track.example/c",
    "https://user:pw@track.example/c",
    "not a url",
    "",
  ])("rejects %j", (url) => {
    expect(safeDestination(url, hosts)).toBeNull();
  });

  test("matches hosts case-insensitively but not by suffix", () => {
    expect(safeDestination("https://TRACK.example/c", hosts)).not.toBeNull();
    expect(safeDestination("https://eviltrack.example/c", hosts)).toBeNull();
  });
});
