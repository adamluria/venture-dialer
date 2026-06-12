// All field names / API endpoints are PLACEHOLDERS until confirmed (project rule #4).
// When confirmed: update here, log [Tier 1] in docs/memory/, update .auto-memory.

export const MOCK_MODE = true; // mock mode must always work

export const TEAMS = {
  Ben: ['MA', 'NH', 'ME', 'RI', 'CT'],
  Joseph: ['NY', 'MD', 'PA', 'NJ']
};

// Contact-rate engine
export const MAX_DIALS_PER_NUMBER_PER_DAY = 75;
export const ABANDON_RATE_CAP = 0.03;        // TCPA
export const ABANDON_THROTTLE_AT = 0.027;    // auto-reduce lines
export const MAX_PARALLEL_LINES = 2;
export const INACTIVITY_ALERT_MIN = 15;
export const SPEED_TO_LEAD_TARGET_SEC = 60;

// State calling windows [start, end, sundayAllowed] — verify with counsel
export const STATE_RULES = {
  MA: ['08:00', '21:00', true], NH: ['08:00', '21:00', true], ME: ['08:00', '21:00', true],
  RI: ['09:00', '18:00', false], CT: ['08:00', '21:00', true], NY: ['08:00', '21:00', true],
  MD: ['08:00', '21:00', true], PA: ['08:00', '20:00', false], NJ: ['08:00', '20:00', true]
};

// Salesforce (placeholders — confirm exact API names)
export const SF = {
  APPT_SETTER_FIELD: 'Appointment_Setter__c',
  LEAD_LIST_SOURCE: 'campaign', // campaign | report | listview
  SYNC_INTERVAL_SEC: 60
};

// Webhook routes (server/index.js)
export const WEBHOOKS = {
  LEADCONDUIT: '/webhooks/leadconduit',
  TWILIO_VOICE: '/webhooks/twilio/voice',
  TWILIO_SMS: '/webhooks/twilio/sms',
  TWILIO_STATUS: '/webhooks/twilio/status'
};

export const PHASES = [
  { name: 'Phase 1', goal: 'working dialer — softphone, SF list pull, DNC + windows, recording, dispositions, SMS', weeks: 'wk 1–4' },
  { name: 'Phase 2', goal: 'AI loop, speed-to-lead, ring groups, salesfloor + listen/whisper/barge, alerts', weeks: 'wk 5–8' },
  { name: 'Phase 3', goal: 'number health engine, scripts, gamification, CX inbox, performance pulse', weeks: 'wk 9–12' }
];
