# reference_venture-dialer

## Infra (planned — not yet provisioned)
- GCP project: `venture-dialer` · Cloud Run service `venture-dialer` · us-east1
- Artifact Registry: `venture-dialer` (docker) · Cloud SQL Postgres · GCS recordings bucket (2-yr retention)
- Cloud Run URL: TBD after first deploy

## External accounts needed (see TODO Phase 0)
Twilio (voice/SMS/10DLC), Salesforce Connected App, ActiveProspect (LeadConduit + TrustedForm), DNC provider (DNC.com or PossibleNOW), FTC DNC SAN, Deepgram, Anthropic API, Google Chat webhook.

## Env vars
See `.env.example`. Local: `.env.local` (git-ignored). Prod: `gcloud run services update venture-dialer --region us-east1 --update-env-vars=...` (never --set-env-vars).
