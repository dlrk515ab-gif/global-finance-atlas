CREATE TABLE IF NOT EXISTS countries (
  code CHAR(2) PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  continent TEXT NOT NULL,
  bank_name TEXT, bank_website TEXT, bank_facebook TEXT,
  bank_status TEXT NOT NULL DEFAULT 'unavailable'
    CHECK (bank_status IN ('verified','partial','review','unavailable')),
  wallet_name TEXT, wallet_website TEXT, wallet_facebook TEXT,
  wallet_status TEXT NOT NULL DEFAULT 'unavailable'
    CHECK (wallet_status IN ('verified','partial','review','unavailable'))
);
