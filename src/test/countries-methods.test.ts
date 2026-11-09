import { describe, expect, it } from "vitest";
import { fromRow, STATUS_LABEL } from "@/data/countries";

const row = (bank: unknown) => ({ code: "AO", name_ar: "أنغولا", name_en: "Angola", continent: "أفريقيا", bank, wallet: {} });

describe("signup/login methods", () => {
  it("labels the verified status as officially documented", () => {
    expect(STATUS_LABEL.verified).toBe("موثّق رسمياً");
  });

  it("marks methods as needing review when a bank exists but has no checked methods", () => {
    const c = fromRow(row({ name: "BAI" }));
    expect(c.bank.signup["رقم الهاتف"]).toBe("review");
    expect(c.bank.login["البصمة/التعرف على الوجه"]).toBe("review");
    expect(c.bank.methodsCheckedAt).toBeNull();
  });

  it("keeps each bank's own checked statuses and evidence instead of a shared template", () => {
    const c = fromRow(row({
      name: "BAI",
      signup: { "رقم الهاتف": "verified" },
      signupEvidence: { "رقم الهاتف": { url: "https://www.bancobai.ao/x", quote: "insira o seu número de telefone" } },
      methodsCheckedAt: "2026-11-09",
    }));
    expect(c.bank.signup["رقم الهاتف"]).toBe("verified");
    expect(c.bank.signup["البريد الإلكتروني"]).toBe("review");
    expect(c.bank.signupEvidence["رقم الهاتف"]?.url).toBe("https://www.bancobai.ao/x");
  });

  it("marks methods unavailable when there is no bank at all", () => {
    expect(fromRow(row({})).bank.login["OTP"]).toBe("unavailable");
  });
});
