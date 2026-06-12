# VentureDial — Product & Build Plan

**Venture Home Solar · Inside Sales Dialer**
Prepared June 11, 2026 · Status: prototype complete, ready to scaffold

---

## 1. Product Summary

VentureDial is a purpose-built outbound/inbound calling platform for Venture Home Solar's remote team. Two logins — **Agent** and **Manager**. Agents come in three types (Inside Sales, CX, Operations) and every agent gets every tool: the dialer, the CX inbox, and the Ops toolset all live in one workspace, with ring groups routing inbound calls to the right team. It replaces Five9 with a system designed around three principles drawn from competitive research: **contact rate is the product** (Convoso's strength, without its instability), **AI in the loop on every call** (the Nooks/Orum pattern legacy dialers lack), and **a remote salesfloor that manages itself** (live status, inactivity alerts, coaching from anywhere).

**What it does, in one pass:** Leads flow in from Salesforce lists and ActiveProspect LeadConduit in real time — new web leads jump the queue within seconds with a speed-to-lead countdown. Before every dial the system scrubs DNC (federal, state, internal), checks the lead's state calling window, and selects a healthy local-presence caller ID. The agent gets an AI pre-call brief (lead context plus coaching from their own last call) and a state-specific script auto-populated with the lead's data. Every call is recorded and transcribed live; on hangup, AI scores the call, writes the summary to Salesforce, and suggests the disposition. Two-way SMS (10DLC compliant) sits beside the dialer. Inbound calls route through source-tagged ring groups to the right team with full screen-pop. Managers watch a live salesfloor with per-agent performance vs baseline, real-time call sentiment, listen/whisper/barge, and automatic alerts when agents go inactive. Gamification (XP, streaks, goals, team battles) keeps a remote floor energized. An Ops portal owns lead source analytics, routing, scripts, and the compliance center; a CX portal owns the customer-care inbox and journey.

**Why it wins vs incumbents:** Convoso's contact-rate science (number rotation, spam-flag auto-remediation, speed-to-lead) but cloud-native and stable; Five9's AI summaries and supervisor tools without the legacy UX and add-on pricing sprawl; Nooks-grade agent experience at roughly one-tenth the per-seat cost by building on CPaaS.

### Feature inventory (all demonstrated in the prototype)

| Area | Features |
|---|---|
| Dialing | Adaptive power dial, AMD, local presence, abandon-rate guard (3% TCPA cap), number health + auto-rotation (≤75 dials/day/number), persistent callbacks, one-click number registration (10DLC + CNAM), branded caller ID with verified business display |
| Lead flow | Salesforce list/campaign pull (60s sync), LeadConduit real-time webhook, speed-to-lead queue-jump with countdown, TrustedForm consent display, dedupe + list hygiene |
| AI | Pre-call brief, live transcription, post-call summary auto-logged to CRM, AI-suggested disposition, call scoring, coaching tips, sentiment |
| SMS | Two-way threads beside dialer, templates, 10DLC, auto-STOP, simulated drip |
| Inbound | Multiple ring groups → teams (simultaneous / round-robin / longest-idle), source identification on screen-pop, Salesforce attribution |
| Manager | Live salesfloor (25 agents), inactivity alerts (15 min → coral + Google Chat), listen/whisper/barge with live transcript + sentiment, Performance Pulse vs 7-day baseline, AI coaching feed, lead-source over/under-baseline alerts, leaderboards (appointments + most calls) |
| Compliance | DNC scrub (nightly + pre-dial + internal list), per-state calling windows (editable, auto-enforced), recording disclosure, abandon throttle, consent storage |
| Ops | Lead source performance, ring group config, state script builder with merge fields, AI Script Lab (proposes + A/B tests script changes from call outcomes — continuously self-improving), per-user-type disposition sets, number registration & branding, compliance center |
| CX | Unified voice+SMS inbox, customer journey board, screen-pop with install stage/tickets, AI proactive-outreach suggestions |
| Other | Two-login model (Agent + Manager) with three agent types sharing all tools, gamification (XP/streaks/badges/team battle/confetti), live satellite view of lead's home, one-click warm/blind transfers (agent/team/CX/manager, transcript follows), one-click integrations, in-app help center with Ask-AI |

---

## 2. Tech Stack

**Principle: rent telephony, build the experience.** Carrier infrastructure, call quality, STIR/SHAKEN, AMD, and recording are commodity CPaaS APIs in 2026. The differentiating layer — agent UX, AI loop, compliance engine — is ours.

| Layer | Choice | Notes |
|---|---|---|
| Telephony | **Twilio** Programmable Voice + Messaging | Browser softphone (Voice JS SDK — agents need Chrome + headset only). Conference-based calls give listen/whisper/barge natively. Alternative: Telnyx (~40% cheaper, more assembly). |
| Frontend | React (JSX) + Vite | Port of the approved prototype. Dark theme, Venture design tokens (amber/teal/coral, JetBrains Mono + Outfit). |
| Backend | Node.js / Express on **Cloud Run** | Same pattern as venture-payroll-agent. Port 8080, env vars via service config. |
| Database | Cloud SQL (Postgres) | Leads, calls, dispositions, numbers, rules, gamification state. |
| Real-time | WebSockets (or Firestore listeners) | Salesfloor presence, live transcripts, alerts. |
| Recordings | Google Cloud Storage | 2-year retention policy, signed URLs. |
| Transcription | Deepgram (real-time) | ~$0.0059/min. Twilio native as fallback. |
| AI | **Claude API** | Summaries, scoring, coaching, pre-call briefs, ask-AI help. ~$0.01–0.03/call. |
| Queueing/pacing | Cloud Tasks + Cloud Scheduler | Dial pacing, list syncs, nightly DNC scrub jobs. |
| CRM | Salesforce REST API (first adapter) | CRM-agnostic adapter layer: all CRM traffic through one interface (list pull, activity/summary writeback, dispositions). The in-house custom CRM connects via the same REST + webhook contract — swap the adapter, dialer unchanged. |
| Lead delivery | ActiveProspect LeadConduit webhook + TrustedForm API | Speed-to-lead pipeline, consent certificates. |
| DNC | DNC.com or PossibleNOW API | Import scrub + cached pre-dial check. FTC SAN subscription required. |
| Alerts | Google Chat webhooks | Already proven in venture-payroll-agent. |
| CI/CD | Cloud Build → Artifact Registry → Cloud Run | us-east1, same commands as existing project. |

### Architecture sketch

```
Salesforce ⇄ sync worker ─┐
LeadConduit ── webhook ───┼─▶ Cloud Run API ⇄ Cloud SQL
Twilio voice/SMS events ──┘        │  ▲
                                   ▼  │ WebSocket
GCS (recordings)  Deepgram→Claude  React app (agent/mgr/cx/ops portals)
```

---

## 3. Next Steps (build phases)

**Start immediately (long lead times):**
- [ ] FTC DNC registry subscription (SAN) for target area codes
- [ ] 10DLC brand + campaign registration via Twilio (~2 weeks vetting)
- [ ] TCPA / state mini-TCPA counsel review (solar outbound is a litigation magnet)
- [ ] Twilio account, number pool purchase (local presence per state), Salesforce Connected App, LeadConduit webhook credentials

**Phase 1 — Working dialer (weeks 1–4).** Browser softphone, Salesforce list pull, power dial with DNC scrub + calling-window enforcement, **no-pause connect architecture** (zero dead air on answer — per coverage audit, the #1 connect-rate killer), recording to GCS, dispositions, basic SMS, callback scheduling. *Exit: 2–3 agents piloting daily alongside Five9.*

**Phase 2 — Differentiators (weeks 5–8).** LeadConduit speed-to-lead queue-jump; real-time transcription → AI summaries/scoring → Salesforce writeback; pre-call briefs; ring groups with source tags; manager salesfloor with listen/whisper/barge; inactivity alerts to Google Chat. *Exit: half the floor migrated.*

**Phase 3 — Moat + polish (weeks 9–12).** Number health engine (rotation, spam monitoring via Free Caller Registry/Numeracle, managed remediation workflow); number registration + branded calling pipeline; state script builder + AI Script Lab; QM rubric scoring of 100% of calls; gamification; CX inbox; Performance Pulse + AI coaching feed; help center. *Exit: full cutover, Five9 cancelled.* (Phase 4 candidates from coverage audit: fully blended inbound/outbound queue, cadence engine — see docs/COVERAGE_AUDIT.md.)

---

## 4. Suggestions & Recommendations

1. **Pilot against Five9, not after it.** Run 2–3 agents on VentureDial from week 4 and compare connect rate, appts/agent/day, and agent NPS weekly. Kill criteria beat sunk cost.
2. **Treat number reputation as an SLO.** Weekly Free Caller Registry checks, auto-quarantine flagged DIDs, keep a 30% spare pool. PhoneBurner markets a 28% answer-rate lift from this alone — it's the highest-ROI feature in the build.
3. **Keep parallel dialing at 1–2 lines with adaptive throttle.** Solar is consumer TCPA territory; the 3% abandon cap and "AI hung up on a real homeowner" failure mode (Orum's top complaint) aren't worth line #3.
4. **Feed the payroll agent.** Dial/call activity from VentureDial is the ground truth your venture-payroll-agent cross-references against CoAdvantage — same GCP project family, shared Postgres or API, one less Five9 export.
5. **Mock mode forever.** Every feature testable with demo data before live credentials — same rule as your other projects. The prototype doubles as the living mock.
6. **Buy-out clause.** If Phase 1 slips badly, the fallback isn't more building — it's Convoso/Nooks plus this UI's roadmap as your config spec. Decide at week 6, not week 12.
7. **Don't store what you don't need.** Recordings 2 years, transcripts indefinitely (cheap, searchable), raw audio of declined/DNC contacts purged.

### 4.5 Future feature roadmap — "best dialer ever" additions

**Contact rate & automation**
- **Voicemail drop:** one click plays a pre-recorded VM while the agent moves to the next dial — saves ~30 sec on every VM (PhoneBurner's most-loved feature).
- **Missed-call instant text-back:** any unanswered inbound gets an automatic SMS within seconds ("Sorry we missed you — reply 1 for a callback"). Recovers calls that would never redial.
- **Best-time-to-call ML:** per-lead attempt scheduling learned from answer history (Derek answers after 5pm → the queue knows). Lift compounds with local presence.
- **Branded caller ID (CNAM + verification):** display "Venture Home Solar" with a verified checkmark on recipients' phones — **now in the prototype** (Ops portal: registration wizard + branding status table); production via Twilio Branded Calling / First Orion.
- **Weather/rate-event triggers:** utility rate-case approvals or outage events in a service area auto-spin a campaign with matching scripts ("Con Ed +9.2% just approved").

**Conversion & revenue**
- **Show-rate engine:** automated confirmation sequences (day-before + hour-before SMS, one-tap reschedule link). No-shows are the silent killer of appointment-setting economics.
- **Propensity-ranked dialing:** score leads on bill size, utility rate trend, source quality, and engagement; dial the queue in expected-value order, not list order.
- **Closed-loop attribution:** track appointment → sit → closed deal back to the setter, feeding commission tiers automatically — this plugs straight into venture-payroll-agent.
- **Referral mining:** AI flags delighted customers post-install (CSAT + call sentiment) and queues referral asks — referrals close 3x better.
- **After-hours AI agent:** voice AI answers inbound after close, qualifies, and books consults directly onto the calendar (Convoso Voso.ai pattern, but yours).

**Coaching & quality**
- **AI roleplay gym:** practice bots generated from your team's real objections and transcripts; new hires certify against them before touching live leads (Nooks pattern — 40% faster ramp claimed).
- **Live battlecards:** real-time objection detection pops the matching response on the agent's screen mid-call (Dialpad's flagship; only useful if latency < 2s).
- **100% automated QA:** every call scored against a rubric (disclosure read? DNC honored? next step set?) replacing random sampling — compliance proof and coaching data in one.
- **Conversation search:** "show me every call this month where roof age came up" — transcripts become a queryable asset for scripts and marketing.

**Operations**
- **Spam self-test:** robo-dial your own DIDs across carriers daily and read what actually displays — catch labeling before answer rates show it.
- **Wrap-up auto-ready:** configurable wrap timer that auto-returns agents to ready, with manager-visible wrap-time stats (camping in wrap-up is the classic hidden productivity leak).
- **Carrier failover:** secondary CPaaS route (Telnyx) if Twilio degrades — reliability was Convoso's fatal flaw; don't inherit it with a single-vendor dependency.

Recommended sequencing: voicemail drop, text-back, and the show-rate engine first (cheap, immediate ROI), then propensity dialing and the roleplay gym, then the rest as Phase 4+.

### Cost estimate (25 agents, monthly)

| Item | Est. |
|---|---|
| Twilio voice (~150k min) + numbers (~40 DIDs) | $1,400–2,400 |
| SMS (10DLC, ~15k segments) | $150–250 |
| Transcription + Claude AI | $250–500 |
| DNC service | $100–300 |
| GCP (Cloud Run, SQL, GCS) | $150–300 |
| **Total** | **~$2,000–3,700/mo** |

vs. Five9/Convoso at 25 seats: typically $3,000–8,000+/mo before AI add-ons. Payback on build effort in roughly 6–12 months, plus features no vendor sells (payroll integration, solar-specific briefs).

---

## 5. User Guide / Training Manual

> Also shipped in-app: the **? help button** (bottom-right) has searchable, screen-aware help and an Ask-AI box. This section is the trainer's version.

### 5.1 Signing in & roles
Two logins: **Agent** or **Manager**. Agents pick their team at sign-in — **Inside Sales**, **CX**, or **Operations** — which sets their default tab and disposition set, but every agent can use every tool (Dialer, CX Inbox, Operations, Integrations tabs). Switch anytime via the role chip (top-left).

### 5.2 Agent Workspace — a shift in 8 steps
1. **Check your goals** (left panel): daily rings for dials, connects, appointments. Streaks and badges track above your queue.
2. **Trust the queue.** It fills itself from Salesforce lists and live web leads. The top card is always "why this lead now."
3. **Read the AI Brief** (right panel) before dialing — lead context plus coaching from *your* last call with them ("you talked 71%, pause after the roof answer").
4. **Dial.** One amber button. The system handles DNC scrub, state calling windows, and caller ID selection. If a dial is blocked ("Outside RI window"), it auto-defers — don't fight it.
5. **Use the Script tab** if you need it — it's already populated with this lead's name, utility, and bill, in the right version for their state. Read the DISCLOSURE line on every call.
6. **Hot leads beat everything.** When the amber ⚡ banner appears with a timer, drop what you're doing and dial — under 60 seconds is the target.
7. **Wrap fast.** AI suggests the disposition (amber "AI pick"); confirm or correct it. The summary is already in Salesforce. Booked appointment = confetti + 150 XP.
8. **Text from the SMS panel** — templates for confirms, reschedules, estimates. Never paste a phone number into your personal phone; compliance lives in the platform.

**Inbound:** when a ring group call pops (top-right), you'll see the line, the source ("Google Ads — solar cost NH"), and whether they're a known customer *before* you answer. Answer or Pass (it rings the next teammate).

**If a manager whispers:** an amber bar appears mid-call — only you hear it. Don't acknowledge it out loud; just use it.

### 5.3 Manager Portal — running a remote floor
- **Salesfloor grid** = your room. Teal dot: on a call. Amber: wrap-up/break. Coral + pulsing: inactive 15+ min (also pushed to Google Chat — click *nudge*).
- **Listen → Whisper → Barge:** click *listen* on any live agent. You get streaming transcript, sentiment, and duration. *Whisper* to coach (agent-only audio); *Barge* only when a deal is dying. Bookmark calls for later coaching reviews.
- **Performance Pulse:** every agent vs their own 7-day baseline. Coral rows need a conversation today, not Friday. ⭐ rows: clip their calls for the playbook.
- **AI Coaching Feed:** acts as your triage list — "whisper in," "send tip," "assign roleplay" are one click.
- **Daily rhythm:** scan KPIs (answer rate, abandon vs 3% cap, speed-to-lead, inactive count) → handle coral flags → one live-listen per team per day minimum.

### 5.4 CX tools (a tab in every agent workspace)
Unified Inbox holds every customer call and text from the Care line, urgency-sorted. Open a thread for full history (calls, recordings, AI summaries, install stage, tickets). The Journey board shows where every customer sits (consult → contract → install → service). Act on AI suggestions — pre-empting install-delay calls with a text beats answering them.

### 5.5 Operations tools (a tab in every agent workspace)
- **Lead Source Performance:** kill or refresh aging lists (watch contact % and median speed-to-lead per source).
- **Ring Groups:** add/edit inbound lines, source tags, team routing, ring strategy.
- **State Scripts:** edit per-state scripts with merge fields; Save pushes live to all agents instantly.
- **Compliance Center:** calling windows per state (Save & enforce), DNC layers, abandon throttle, consent coverage. Review weekly; after any state law change, update windows the same day.

### 5.6 Compliance rules every user must know
1. All calls are recorded — the disclosure line is mandatory.
2. "Stop calling me" → disposition **Do not call**. Instantly. No exceptions.
3. Never dial outside the platform (personal cell = no DNC scrub, no recording, no consent trail).
4. SMS only through the platform — STOP handling is automatic there.
5. Blocked dial = the law, not a bug.

### 5.7 Training plan (suggested)
- **Day 1:** role walkthrough on the prototype + this guide; agents run 10 mock calls in demo mode.
- **Day 2:** live pilot, manager shadowing via live-listen; whisper coaching practiced deliberately.
- **Week 2:** review each agent's AI scorecards 1:1; assign roleplays from real flagged moments.
- **Ongoing:** Friday playbook review — best clipped calls from the Coaching Feed.

---

*Prototype: `venturedial-prototype.html` (also at `public/prototype.html` in the repo). Scaffold: `venture-dialer/`. This document also lives in the repo at `docs/BUILD_PLAN.md`.*
