CREATE TABLE public.countries_methods_import (
  code CHAR(2) NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('bank','wallet')),
  patch JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (code, kind)
);
GRANT ALL ON public.countries_methods_import TO service_role;
ALTER TABLE public.countries_methods_import ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.countries_methods_import IS 'Staging for verified signup/login method patches; merged into countries.bank/wallet. No app access.';