# venture-dialer

AI-powered dialer for Venture Home Solar inside sales — agent workspace, manager salesfloor, CX inbox, and Ops compliance portal. Replaces Five9.

**Read first:** `docs/BUILD_PLAN.md` (product summary, tech stack, phases, user guide) → `TODO.md` → `PROJECT_INSTRUCTIONS.md`.

## Quickstart

```bash
npm install
npm run dev          # React shell at :5173, prototype at /prototype.html
npm run build && npm start   # production server at :8080
```

The **interactive prototype** (`public/prototype.html`) is the living spec — every approved feature runs there with mock data. Port features to React per TODO.md; the prototype and mock mode must keep working at all times.

## Deploy (Cloud Run, us-east1)

```bash
docker build -t venture-dialer . && docker run -p 8080:8080 venture-dialer   # test first
gcloud builds submit --tag us-east1-docker.pkg.dev/venture-dialer/venture-dialer/venture-dialer:latest .
gcloud run deploy venture-dialer --image us-east1-docker.pkg.dev/venture-dialer/venture-dialer/venture-dialer:latest \
  --region us-east1 --platform managed --allow-unauthenticated
```

Env vars: `.env.local` for dev (never committed); production via `gcloud run services update --update-env-vars` (never `--set-env-vars`).

## Pre-build checklist (long lead times — start now)

- [ ] FTC DNC registry subscription (SAN)
- [ ] 10DLC brand + campaign registration (Twilio, ~2 weeks)
- [ ] TCPA / state mini-TCPA counsel review
- [ ] Twilio account + local-presence number pool
- [ ] Salesforce Connected App credentials
- [ ] LeadConduit webhook token + TrustedForm API key
