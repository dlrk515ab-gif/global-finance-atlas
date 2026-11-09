import type { Country } from "@/data/countries";

function download(content: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

const flat = (c: Country) => ({
  code: c.code, name_ar: c.nameAr, name_en: c.nameEn, continent: c.continent,
  bank_name: c.bank.name ?? "", bank_website: c.bank.website ?? "", bank_facebook: c.bank.facebook ?? "",
  bank_android: c.bank.apps.android ?? "", bank_ios: c.bank.apps.ios ?? "", bank_sources: c.bank.sources.join(" "), bank_status: c.bank.status,
  wallet_name: c.wallet.name ?? "", wallet_website: c.wallet.website ?? "", wallet_facebook: c.wallet.facebook ?? "",
  wallet_android: c.wallet.apps.android ?? "", wallet_ios: c.wallet.apps.ios ?? "", wallet_sources: c.wallet.sources.join(" "), wallet_status: c.wallet.status,
});

export const exportJSON = (COUNTRIES: Country[]) => download(JSON.stringify(COUNTRIES, null, 2), "countries.json", "application/json");

export function exportCSV(COUNTRIES: Country[]) {
  const rows = COUNTRIES.map(flat);
  const head = Object.keys(rows[0] ?? {});
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = "\uFEFF" + [head.join(","), ...rows.map((r) => head.map((h) => esc((r as Record<string, string>)[h])).join(","))].join("\n");
  download(csv, "countries.csv", "text/csv;charset=utf-8");
}

export function exportSQL(COUNTRIES: Country[]) {
  const q = (v: string) => (v ? `'${v.replace(/'/g, "''")}'` : "NULL");
  const schema = `CREATE TABLE IF NOT EXISTS countries (
  code CHAR(2) PRIMARY KEY, name_ar TEXT NOT NULL, name_en TEXT NOT NULL, continent TEXT NOT NULL,
  bank_name TEXT, bank_website TEXT, bank_facebook TEXT, bank_android TEXT, bank_ios TEXT, bank_sources TEXT, bank_status TEXT NOT NULL,
  wallet_name TEXT, wallet_website TEXT, wallet_facebook TEXT, wallet_android TEXT, wallet_ios TEXT, wallet_sources TEXT, wallet_status TEXT NOT NULL
);\n`;
  const inserts = COUNTRIES.map(flat).map((r) =>
    `INSERT INTO countries VALUES (${Object.entries(r).map(([k, v]) => (k.endsWith("status") ? `'${v}'` : q(String(v ?? "")))).join(", ")});`).join("\n");
  download(schema + inserts + "\n", "countries.sql", "application/sql");
}
