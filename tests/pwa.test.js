import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

test("web app manifest contains install metadata and icons", () => {
  const manifest = JSON.parse(readFileSync("public/manifest.webmanifest", "utf8"));

  expect(manifest.name).toBe("9M2PJU SMITH CHART");
  expect(manifest.short_name).toBe("9M2PJU");
  expect(manifest.start_url).toBe("/");
  expect(manifest.scope).toBe("/");
  expect(manifest.display).toBe("standalone");
  expect(manifest.theme_color).toBe("#111c26");
  expect(manifest.icons).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }),
      expect.objectContaining({ src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }),
      expect.objectContaining({ src: "/icons/icon-maskable-512.png", sizes: "512x512", purpose: "maskable" }),
    ]),
  );
});

test("service worker precaches the app shell", () => {
  const serviceWorker = readFileSync("public/sw.js", "utf8");

  expect(serviceWorker).toContain("9m2pju-smith-chart-v1");
  expect(serviceWorker).toContain("/manifest.webmanifest");
  expect(serviceWorker).toContain("/icons/icon-192.png");
  expect(serviceWorker).toContain("/icons/icon-512.png");
  expect(serviceWorker).toContain('sw.addEventListener("fetch"');
});
