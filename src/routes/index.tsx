import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CONTINENTS, STATUS_LABEL, SIGNUP_METHODS, LOGIN_METHODS, flag,
  type Country, type Entity, type Status,
} from "@/data/countries";
import { exportCSV, exportJSON, exportSQL } from "@/lib/export";
import { useSuspenseQuery } from "@tanstack/react-query";
import { countriesQuery } from "@/lib/countries-query";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "أطلس البنوك والمحافظ الرقمية — 193 دولة" },
      { name: "description", content: "سجل لكل دولة: البنك المحلي الأكثر انتشاراً والمحفظة الرقمية وطرق فتح الحساب وتسجيل الدخول، بحالات توثيق واضحة." },
      { property: "og:title", content: "أطلس البنوك والمحافظ الرقمية" },
      { property: "og:description", content: "بيانات مصرفية ومحافظ رقمية لكل دولة مع حالة التوثيق." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;700&display=swap" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(countriesQuery),
  component: Index,
});

const STATUS_CLS: Record<Status, string> = {
  verified: "bg-success/15 text-success border-success/30",
  partial: "bg-info/15 text-info border-info/30",
  review: "bg-warning/15 text-warning border-warning/30",
  unavailable: "bg-muted text-muted-foreground border-border",
};
const Badge = ({ s }: { s: Status }) => (
  <span className={`rounded-full border px-2 py-0.5 text-xs ${STATUS_CLS[s]}`}>{STATUS_LABEL[s]}</span>
);

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function Index() {
  const [q, setQ] = useState("");
  const [cont, setCont] = useState<string>("all");
  const [sel, setSel] = useState<Country | null>(null);
  const [only, setOnly] = useState<"all" | "filled" | "empty">("all");
  const { data: COUNTRIES } = useSuspenseQuery(countriesQuery);

  const list = useMemo(() => COUNTRIES.filter((c) =>
    (cont === "all" || c.continent === cont) &&
    (only === "all" || (only === "filled") === !!(c.bank.name || c.wallet.name)) &&
    (c.nameAr.includes(q) || (c.bank.name ?? "").toLowerCase().includes(q.toLowerCase()) || (c.wallet.name ?? "").toLowerCase().includes(q.toLowerCase()) || c.nameEn.toLowerCase().includes(q.toLowerCase()))), [q, cont, only, COUNTRIES]);

  const count = (k: "bank" | "wallet", s: Status) => COUNTRIES.filter((c) => c[k].status === s).length;

  return (
    <div dir="rtl" className="relative min-h-screen">
      <div className="bg-aurora" /><div className="bg-grid" />
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-glow text-4xl font-bold md:text-5xl">أطلس البنوك والمحافظ الرقمية</h1>
            <p className="mt-2 text-muted-foreground">سجل مستقل لكل دولة. «موثّق جزئياً» = الاسم والموقع الرسمي مؤكَّدان، ودليل المقارنة وطرق الدخول قيد المراجعة.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="/downloads/project-source.zip" download="project-source.zip"
              className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90">تحميل المشروع كاملاً</a>
            {[["CSV", exportCSV], ["JSON", exportJSON], ["SQL", exportSQL]].map(([l, f]) => (
              <button key={l as string} onClick={() => (f as (c: Country[]) => void)(COUNTRIES)}
                className="glass rounded-lg px-3 py-2 text-sm transition hover:border-primary">تصدير {l as string}</button>
            ))}
          </div>
        </header>

        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">لوحة الإحصائيات</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="إجمالي الدول" value={COUNTRIES.length} />
            <Stat label="بنوك/محافظ موثّقة" value={count("bank", "verified") + count("wallet", "verified")} />
            <Stat label="بنوك/محافظ موثّقة جزئياً" value={count("bank", "partial") + count("wallet", "partial")} />
            <Stat label="دول بها بيانات" value={COUNTRIES.filter((c) => c.bank.name || c.wallet.name).length} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-6">
            {CONTINENTS.map((c) => (
              <Stat key={c} label={c} value={COUNTRIES.filter((x) => x.continent === c).length} />
            ))}
          </div>
          <div className="glass mt-3 grid gap-4 rounded-xl p-4 md:grid-cols-2">
            {(["bank", "wallet"] as const).map((k) => (
              <div key={k}>
                <div className="mb-2 text-sm text-muted-foreground">{k === "bank" ? "حالة بيانات البنوك" : "حالة بيانات المحافظ"}</div>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
                    <span key={s} className="flex items-center gap-1"><Badge s={s} /><b>{count(k, s)}</b></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن دولة أو بنك أو محفظة…" aria-label="بحث"
              className="glass min-w-60 flex-1 rounded-lg px-3 py-2 outline-none focus:border-primary" />
            {["all", ...CONTINENTS].map((c) => (
              <button key={c} onClick={() => setCont(c)}
                className={`rounded-lg px-3 py-2 text-sm transition ${cont === c ? "bg-primary text-primary-foreground" : "glass"}`}>
                {c === "all" ? "الكل" : c}
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {([["all", "كل السجلات"], ["filled", "بها بيانات"], ["empty", "بدون بيانات"]] as const).map(([v, l]) => (
              <button key={v} onClick={() => setOnly(v)}
                className={`rounded-lg px-3 py-1.5 text-xs transition ${only === v ? "bg-accent text-accent-foreground" : "glass"}`}>{l}</button>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{list.length} دولة</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((c) => (
              <button key={c.code} onClick={() => setSel(c)}
                className="glass rounded-xl p-4 text-right transition hover:-translate-y-0.5 hover:border-primary">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{flag(c.code)}</span>
                  <div><div className="font-semibold">{c.nameAr}</div><div className="text-xs text-muted-foreground">{c.nameEn} · {c.continent}</div></div>
                </div>
                <div className="mt-3 flex flex-col gap-1 text-xs">
                  <div className="flex justify-between"><span>البنك: {c.bank.name ?? "—"}</span><Badge s={c.bank.status} /></div>
                  <div className="flex justify-between"><span>المحفظة: {c.wallet.name ?? "—"}</span><Badge s={c.wallet.status} /></div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur" onClick={() => setSel(null)}>
          <div className="glass max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">{flag(sel.code)} {sel.nameAr}</h3>
              <button onClick={() => setSel(null)} className="text-muted-foreground hover:text-foreground">إغلاق ✕</button>
            </div>
            <EntityBlock title="البنك المحلي الأكثر انتشاراً" e={sel.bank} />
            <EntityBlock title="أكبر محفظة رقمية محلية" e={sel.wallet} />
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ k, v, link }: { k: string; v: string | null; link?: boolean }) {
  return (
    <div className="flex justify-between gap-3 border-b border-border py-1.5 text-sm">
      <span className="text-muted-foreground">{k}</span>
      {v ? (link ? <a href={v} target="_blank" rel="noreferrer" className="truncate text-primary">{v}</a> : <span>{v}</span>)
        : <span className="text-muted-foreground">غير مكتمل</span>}
    </div>
  );
}

function EntityBlock({ title, e }: { title: string; e: Entity }) {
  return (
    <section className="mt-6">
      <div className="mb-2 flex items-center justify-between"><h4 className="font-semibold text-primary">{title}</h4><Badge s={e.status} /></div>
      {e.logo && <img src={e.logo} alt={e.name ?? ""} className="mb-2 h-10" />}
      <Field k="الاسم" v={e.name} /><Field k="الاسم الرسمي" v={e.officialName} />
      <Field k="الموقع الرسمي" v={e.website} link /><Field k="Facebook" v={e.facebook} link />
      {e.ownerType && <Field k="نوع الجهة" v={{ bank: "بنك", telecom: "شركة اتصالات", independent: "مستقلة" }[e.ownerType]} />}
      <Field k="Instagram" v={e.social.instagram} link /><Field k="X" v={e.social.x} link />
      <Field k="تطبيق Android" v={e.apps.android} link /><Field k="تطبيق iOS" v={e.apps.ios} link />
      {e.note && <p className="mt-2 rounded-lg border border-border bg-muted/40 p-2 text-xs text-muted-foreground">ملاحظة: {e.note}</p>}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {([["فتح الحساب لأول مرة", SIGNUP_METHODS, e.signup, e.signupEvidence], ["تسجيل الدخول اليومي", LOGIN_METHODS, e.login, e.loginEvidence]] as const).map(([t, ms, map, ev]) => (
          <div key={t} className="rounded-xl border border-border p-3" data-testid={t === "فتح الحساب لأول مرة" ? "signup-box" : "login-box"}>
            <div className="mb-2 text-sm font-medium">{t}</div>
            {ms.map((m) => (
              <div key={m} className="border-b border-border/50 py-1.5 text-sm last:border-0">
                <div className="flex justify-between gap-2"><span>{m}</span><Badge s={map[m] ?? "unavailable"} /></div>
                {ev[m] && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    <q className="italic">{ev[m].quote}</q>{" "}
                    <a href={ev[m].url} target="_blank" rel="noreferrer" className="text-primary">المصدر ↗</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {e.name && (
        <p className="mt-2 text-xs text-muted-foreground">
          {e.methodsCheckedAt
            ? <>فُحصت طرق التسجيل والدخول في {e.methodsCheckedAt} من {e.methodsSources.length} مصدر رسمي{e.methodsSources.length > 0 && ": "}
                {e.methodsSources.map((u, i) => <a key={u} href={u} target="_blank" rel="noreferrer" className="ms-1 text-primary">[{i + 1}]</a>)}.
                {" "}«يحتاج مراجعة» يعني أن المصادر الرسمية التي فُحصت لا تذكر هذه الطريقة صراحةً.</>
            : "لم تُفحص طرق التسجيل والدخول بعد."}
        </p>
      )}
      {e.sources.length > 0 && <div className="mt-2 text-xs text-muted-foreground">المصادر: {e.sources.map((u) => <a key={u} href={u} target="_blank" rel="noreferrer" className="ms-2 text-primary">{u}</a>)}</div>}
    </section>
  );
}
