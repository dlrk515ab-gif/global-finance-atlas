CREATE TABLE public.countries_import (
  code CHAR(2) PRIMARY KEY,
  bank JSONB NOT NULL,
  wallet JSONB NOT NULL,
  batch TEXT NOT NULL DEFAULT 'batch3',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.countries_import TO service_role;
ALTER TABLE public.countries_import ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.countries_import IS 'Staging area for verified country data batches before they are merged into public.countries. Not exposed to the app.';