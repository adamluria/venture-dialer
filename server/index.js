// VentureDial server — Cloud Run (port 8080)
// Phase 1 stubs: serves the built app + prototype, receives webhooks.
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static: built React app + interactive prototype (mock mode)
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'venture-dialer', mock: true }));

// --- LeadConduit: real-time lead delivery (speed-to-lead) ---
app.post('/webhooks/leadconduit', (req, res) => {
  // TODO Phase 2: validate token, dedupe, DNC scrub, insert lead, queue-jump, notify agents via WS
  console.log('[leadconduit] lead received', req.body?.phone_1 || '(mock)');
  res.status(202).json({ accepted: true });
});

// --- Twilio voice webhook (TwiML) ---
app.post('/webhooks/twilio/voice', (_req, res) => {
  // TODO Phase 1: conference-based call flow (enables listen/whisper/barge)
  res.type('text/xml').send('<Response><Say>VentureDial development stub.</Say></Response>');
});

// --- Twilio inbound SMS ---
app.post('/webhooks/twilio/sms', (req, res) => {
  // TODO Phase 1: STOP handling -> internal DNC; thread routing
  console.log('[sms] inbound', req.body?.From, req.body?.Body);
  res.type('text/xml').send('<Response></Response>');
});

// --- Twilio recording/status callbacks ---
app.post('/webhooks/twilio/status', (req, res) => {
  // TODO Phase 1: store recording URL -> GCS, call status -> DB; Phase 2: kick transcription + AI summary
  res.sendStatus(204);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`venture-dialer listening on :${port}`));
