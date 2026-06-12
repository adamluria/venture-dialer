# Project: venture-dialer

AI-powered dialer for Venture Home Solar's 25 remote inside sales agents (+ Manager/CX/Ops portals). Replaces Five9. Full product spec: `docs/BUILD_PLAN.md`. Living UX spec: `public/prototype.html`.

## How to work in this project

1. **Read every session:** `.auto-memory/MEMORY.md` → `docs/memory/` (newest first) → `TODO.md` → this file → `docs/BUILD_PLAN.md` §5 (user guide = current feature surface).
2. **Mock mode always works.** `MOCK_MODE` in `src/config/constants.js`; the prototype is the canonical mock.
3. **Placeholders until confirmed:** Salesforce field names, webhook payload shapes, STATE_RULES windows. On confirmation: update constants, log `[Tier 1]` in today's `docs/memory/` file, update `.auto-memory/`.
4. **Design rules are not suggestions:** dark theme; coral = flagged, teal = positive/approved, amber = pending/action; JetBrains Mono for data, Outfit for UI.
5. **Compliance is product, not polish.** DNC scrub, calling windows, abandon cap, STOP handling, and recording disclosure ship in Phase 1, not later.
6. **Commit small, push with memory + TODO updates.** Branch `feature/[name]` → PR → `main`.
7. **Docker test before deploy:** `docker build -t venture-dialer . && docker run -p 8080:8080 venture-dialer`.
8. **Env vars:** `.env.local` dev-only; prod via `--update-env-vars` (never `--set-env-vars`).

## Infra

- GCP project: `venture-dialer` (create) · Cloud Run `venture-dialer` · us-east1 · Artifact Registry `venture-dialer`
- Cloud SQL Postgres · GCS bucket for recordings (2-yr retention)
- Teams: Ben (MA/NH/ME/RI/CT), Joseph (NY/MD/PA/NJ)

## Key references

- Reference data (tiers, thresholds, teams): `src/config/constants.js`
- Sibling project: `venture-payroll-agent` — VentureDial call activity becomes its timesheet cross-reference source (Phase 3)
