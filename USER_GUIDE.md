# VentureDial — User Guide

Living user-facing reference. Full training manual: `docs/BUILD_PLAN.md` §5. In-app help: the **?** button (bottom-right) in every portal — searchable, screen-aware, with Ask-AI.

## Roles

Two logins: **Agent** or **Manager**. Agents pick their team at sign-in — **Inside Sales**, **CX**, or **Operations**. That sets your default tab and disposition set, but every agent has every tool: Dialer, CX Inbox, Operations, and Integrations tabs. Switch via the role chip (top-left).

## Agent (quick card)

1. Queue fills itself (Salesforce lists + live web leads). Read the **AI Brief** before dialing.
2. **Dial** — DNC scrub, state window check, and caller ID selection are automatic. Blocked dial = compliance, not a bug.
3. ⚡ **Hot leads** jump the queue with a timer — dial within 60 seconds.
4. **Script tab** auto-populates the right state script with the lead's data.
5. After hangup, confirm the **AI-suggested disposition** (your disposition list is set per user type by Ops); the summary is already in Salesforce. Appointments = +150 XP.
6. **SMS panel** for texts (templates, STOP handled automatically). **📍 View home** opens a live satellite view of the lead's roof.
7. **⇄ Transfer** on any live call — warm or blind, to a closer, your team, CX, or a manager; the context card and transcript follow the call.
8. Inbound pops show ring group + lead source before you answer. Amber whisper bar mid-call = your manager coaching you privately (the lead hears nothing).

## Manager (quick card)

- Salesfloor: teal = on call, coral pulsing = inactive 15+ min (auto Google Chat alert; click *nudge*).
- Click *listen* on any live agent → live transcript + sentiment → escalate **Listen → Whisper → Barge**. Whisper is agent-only audio.
- **Performance Pulse** ranks agents vs their own 7-day baseline; coral rows need a conversation today.
- **AI Coaching Feed** = your triage list (whisper in / send tip / assign roleplay).
- **Lead-source alerts** fire automatically when any source runs over or under its baseline.
- Leaderboards: appointments (June) and **most calls today**.

## CX (quick card)

Unified Inbox = every care call + text, urgency-sorted, with full history and install stage. Work the AI proactive-outreach suggestions to prevent inbound calls.

## Ops (quick card)

- **Lead Source Performance:** refresh aging lists; watch contact % and speed-to-lead by source.
- **Ring Groups:** inbound numbers → source tag → team → ring strategy.
- **State Scripts + AI Script Lab:** edit scripts with merge fields; the Lab proposes improvements from real call outcomes and A/B tests them — apply with one click.
- **Number Registration & Branded Calling:** "+ Register new number" handles DID purchase, 10DLC, CNAM, and branded-ID verification in one flow; the table shows each number's branding status ("VENTURE HOME SOLAR" verified display).
- **Disposition Sets:** customize wrap-up dispositions per user type (sales / CX / team lead); each maps to a CRM status + optional automation.
- **Compliance Center:** per-state calling windows (Save & enforce), DNC layers, abandon throttle.

## Compliance — everyone

All calls recorded (disclosure mandatory) · "stop calling" → *Do not call* disposition instantly · never dial or text outside the platform.
