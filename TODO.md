# TODO

## Phase 0 — prerequisites (start immediately, long lead times)
- [ ] FTC DNC SAN subscription for target area codes
- [ ] 10DLC brand + campaign registration via Twilio
- [ ] TCPA/state counsel review (calling windows in `src/config/constants.js` are unverified defaults)
- [ ] Twilio account; buy local-presence DIDs (NH/MA/ME/RI/CT/NY/MD/PA/NJ) + 30% spare pool
- [ ] Salesforce Connected App; confirm appointment-setter field API name → update `SF.APPT_SETTER_FIELD`
- [ ] LeadConduit webhook token; TrustedForm API key
- [ ] Pick DNC provider (DNC.com vs PossibleNOW) — API trial

## Phase 1 — working dialer (wk 1–4)
- [ ] Cloud SQL schema: leads, calls, dispositions, numbers, sms_threads, users/teams
- [ ] Twilio Voice JS SDK softphone (token endpoint, device lifecycle)
- [ ] Conference-based outbound call flow (foundation for listen/whisper/barge)
- [ ] Salesforce list pull worker (60s) + dedupe
- [ ] DNC scrub on import + cached pre-dial check
- [ ] State calling-window enforcement (port from prototype logic)
- [ ] Recording → GCS + status callbacks
- [ ] Disposition UI (port agent workspace from prototype to React)
- [ ] Two-way SMS + STOP → internal DNC
- [ ] Callbacks (persistent, never-vanish — Convoso's bug is our test case)
- [ ] Pilot: 2–3 agents alongside Five9; weekly connect-rate comparison

## Phase 2 — differentiators (wk 5–8)
- [ ] LeadConduit webhook → queue-jump + speed-to-lead timer + WS push
- [ ] Deepgram live transcription; Claude summaries/scoring → Salesforce writeback
- [ ] Pre-call brief generation (lead history + last-call coaching)
- [ ] Ring groups w/ source tags + screen-pop + attribution
- [ ] Manager salesfloor (WS presence) + listen/whisper/barge (conference coach mode)
- [ ] Inactivity alerts → Google Chat
- [ ] State script engine (Ops editor → agent Script tab)

## Phase 3 — moat (wk 9–12)
- [ ] Number health engine: per-DID dial caps, rotation, Free Caller Registry checks, quarantine + spares
- [ ] Gamification (XP/streaks/goals/team battle)
- [ ] CX unified inbox + journey board
- [ ] Performance Pulse + AI coaching feed
- [ ] Help center (port from prototype) + Ask-AI on real docs
- [ ] Voicemail drop, missed-call text-back, appointment confirmation sequences (see BUILD_PLAN §4.5)
- [ ] venture-payroll-agent integration: expose call-activity API as CoAdvantage cross-reference source

## Done
- [x] Competitive research (Five9, Convoso, Nooks, Orum, etc.)
- [x] Interactive prototype — all portals, mock data (public/prototype.html)
- [x] Build plan doc (docs/BUILD_PLAN.md)
