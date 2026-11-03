CREATE TABLE public.countries (
  code CHAR(2) PRIMARY KEY, name_ar TEXT NOT NULL, name_en TEXT NOT NULL, continent TEXT NOT NULL,
  bank JSONB NOT NULL DEFAULT '{}'::jsonb, wallet JSONB NOT NULL DEFAULT '{}'::jsonb, updated_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT ON public.countries TO anon, authenticated;
GRANT ALL ON public.countries TO service_role;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read countries" ON public.countries FOR SELECT TO anon, authenticated USING (true);