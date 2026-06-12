# project_venture-dialer

## Scope
Dialer for 25 remote inside sales agents + Manager/CX/Ops portals. Replaces Five9. Requirements (all prototyped): AI analysis of every call surfaced before agent's next call; SMS; high contact rate engine; all calls recorded; manager inactivity alerts; speed-to-lead from Salesforce + ActiveProspect; inbound ring groups with source ID; DNC scrub; per-state calling windows; state-populated scripts; whisper coaching; real-time performance; gamification; home map popup; in-app help.

## Architecture decisions
- Rent telephony (Twilio CPaaS), build the experience layer. Conference-based calls → listen/whisper/barge.
- Browser softphone (Twilio Voice JS SDK) — remote agents need Chrome + headset only.
- Parallel dialing capped at 2 lines, adaptive throttle at 2.7% abandon (TCPA 3% cap). Consumer solar = high TCPA exposure.
- Number health is core product: ≤75 dials/day/DID, rotation, spare pool, weekly registry checks.
- AI loop: Deepgram transcription → Claude summaries/scoring/briefs → Salesforce writeback.
- Mock mode permanent; prototype at public/prototype.html is canonical mock + UX spec.

## Design rules
Dark theme. Coral = flagged, teal = positive/approved, amber = pending/action. JetBrains Mono (data), Outfit (UI).

## Competitive grounding (research 2026-06-11)
Copy: Convoso CID reputation auto-rotation + AMD + speed-to-lead; Five9 AI summaries + supervisor tools; Nooks pre-call briefs + salesfloor. Avoid: Convoso instability/vanishing callbacks, Five9 legacy UX/add-on pricing, Orum over-aggressive parallel dialing.
