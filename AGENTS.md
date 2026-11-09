<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Country/bank/wallet data lives in the `public.countries` table (JSONB `bank`/`wallet`); `src/data/countries.ts#fromRow` fills defaults. Why: data is filled in batches without code changes.
- Only add bank/wallet data with an official source URL in `sources`; unverified fields stay null. Why: user forbids guessed data.
- New data batches are loaded into `public.countries_import` (staging, no app access) via psql COPY, then merged into `countries` with one UPDATE that only fills empty rows. Why: large JSONB batches are too big to paste as SQL.
- Facebook/social/app links come only from links published on the entity's own official site. Why: avoids unofficial pages.
- `public/downloads/project-source.zip` is a prebuilt snapshot; regenerate it (excluding node_modules, .git, .env) after changes.
