import { describe, expect, test } from "bun:test";
import {
  DEFAULT_DISPLAY_LANGUAGE,
  isDisplayLanguage,
  normalizeDisplayLanguage,
} from "./languages";
import { en, zhCN } from "./messages";

describe("display language helpers", () => {
  test("normalizes supported browser-style language tags", () => {
    expect(normalizeDisplayLanguage("en")).toBe("en");
    expect(normalizeDisplayLanguage("en-US")).toBe("en");
    expect(normalizeDisplayLanguage("zh")).toBe("zh-CN");
    expect(normalizeDisplayLanguage("zh-CN")).toBe("zh-CN");
    expect(normalizeDisplayLanguage("zh-Hans")).toBe("zh-CN");
  });

  test("rejects unsupported values", () => {
    expect(normalizeDisplayLanguage("fr")).toBeUndefined();
    expect(normalizeDisplayLanguage("")).toBeUndefined();
    expect(normalizeDisplayLanguage(null)).toBeUndefined();
  });

  test("keeps the default language stable", () => {
    expect(DEFAULT_DISPLAY_LANGUAGE).toBe("en");
    expect(isDisplayLanguage(DEFAULT_DISPLAY_LANGUAGE)).toBe(true);
  });
});

describe("translation dictionaries", () => {
  test("Simplified Chinese dictionary covers every English key", () => {
    expect(Object.keys(zhCN).sort()).toEqual(Object.keys(en).sort());
  });
});

