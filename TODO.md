# TODO

## Phase 0 — prerequisites (start immediately, long lead times)
- [ ] FTC DNC SAN subscription for target area codes
- [ ] 10DLC brand + campaign registration via Twilio
- [ ] TCPA/state counsel review (calling windows in `src/config/constants.js` are unverified defaults)
- [ ] Twilio account; buy local-presence DIDs (NH/MA/ME/RI/CT/NY/MD/PA/NJ) + 30% spare pool
- [ ] Branded calling enrollment (Twilio Branded Calling / First Orion) — pairs with 10DLC/CNAM
- [ ] Salesforce Connected App; confirm appointment-setter field API name → update `SF.APPT_SETTER_FIELD`
- [ ] Custom CRM: define adapter contract (list pull, activity writeback, dispositions, webhooks) so the in-house CRM drops in later
- [ ] LeadConduit webhook token; TrustedForm API key
- [ ] Pick DNC provider (DNC.com vs PossibleNOW) — API trial

## Phase 1 — working dialer (wk 1–4)
- [ ] Cloud SQL schema: leads, calls, dispositions, numbers, sms_threads, users/teams
- [ ] Twilio Voice JS SDK softphone (token endpoint, device lifecycle)
- [ ] Conference-based outbound call flow (foundation for listen/whisper/barge + transfers)
- [ ] **No-pause connect architecture** — zero dead air on answer (audit: #1 connect-rate killer); agent-leg-first dialing, conservative AMD
- [ ] Salesforce list pull worker (60s) + dedupe — built on the CRM adapter interface
- [ ] DNC scrub on import + cached pre-dial check
- [ ] State calling-window enforcement (port from prototype logic)
- [ ] Recording → GCS + status callbacks
- [ ] Disposition UI with per-user-type sets (port from prototype)
- [ ] Two-way SMS + STOP → internal DNC
- [ ] Callbacks (persistent, never-vanish — Convoso's bug is our test case)
- [ ] Pilot: 2–3 agents alongside Five9; weekly connect-rate comparison

## Phase 2 — differentiators (wk 5–8)
- [ ] LeadConduit webhook → queue-jump + speed-to-lead timer + WS push
- [ ] Deepgram live transcription; Claude summaries/scoring → CRM writeback
- [ ] Pre-call brief generation (lead history + last-call coaching)
- [ ] Ring groups w/ source tags + screen-pop + attribution
- [ ] Warm/blind transfers with context + transcript following the call
- [ ] Manager salesfloor (WS presence) + listen/whisper/barge (conference coach mode)
- [ ] Inactivity alerts → Google Chat; lead-source over/under-baseline alerts
- [ ] State script engine (Ops editor → agent Script tab)

## Phase 3 — moat (wk 9–12)
- [ ] Number health engine: per-DID dial caps, rotation, Free Caller Registry checks, quarantine + spares
- [ ] Managed spam remediation workflow (auto-file de-flagging tickets)
- [ ] Number registration wizard + branded caller ID pipeline (10DLC/CNAM/BCID status tracking)
- [ ] AI Script Lab: outcome-correlated script suggestions + A/B testing (self-improving loop)
- [ ] QM rubric scoring of 100% of calls (intro / discovery / disclosure / close attempt)
- [ ] Gamification (XP/streaks/goals/team battle; leaderboards incl. most calls)
- [ ] CX unified inbox + journey board
- [ ] Performance Pulse + AI coaching feed
- [ ] Help center (port from prototype) + Ask-AI on real docs
- [ ] Voicemail drop, missed-call text-back, appointment confirmation sequences (BUILD_PLAN §4.5)
- [ ] venture-payroll-agent integration: expose call-activity API as CoAdvantage cross-reference source

## Phase 4 — candidates (from coverage audit)
- [ ] Fully blended inbound/outbound queue (inbound injected into outbound pacing)
- [ ] Cadence engine (multi-touch call/SMS sequences)
- [ ] Best-time-to-call ML; propensity-ranked dialing
- [ ] AI roleplay gym from real transcripts; live battlecards (<2s latency gate)
- [ ] Spam self-test (dial own numbers across carriers daily); carrier failover (Telnyx)

## Done
- [x] Competitive research round 1 (13 platforms) + round 2 (22+ total) → docs/COVERAGE_AUDIT.md
- [x] Interactive prototype — all four portals, mock data (public/prototype.html)
- [x] Build plan doc (docs/BUILD_PLAN.md) + exec summary (docs/VentureDial-Summary.docx)
- [x] Coverage audit mapped to feature/issue countermeasures
