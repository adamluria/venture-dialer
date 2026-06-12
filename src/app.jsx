import React from 'react';
import { PHASES } from './config/constants.js';

// VentureDial dev shell. The approved interactive prototype (the living spec +
// mock mode) is served at /prototype.html. React portals are ported from it
// feature-by-feature per TODO.md — keep the prototype working at all times.

const S = {
  page: { minHeight: '100vh', background: '#0a0d14', color: '#eef1f8', fontFamily: "'Outfit',system-ui,sans-serif", padding: 40 },
  mono: { fontFamily: "'JetBrains Mono',monospace" },
  card: { background: '#131826', border: '1px solid #27304a', borderRadius: 14, padding: 20, maxWidth: 760, marginBottom: 14 },
  amber: { color: '#ffb02e' },
  teal: { color: '#2dd4bf' },
  btn: { display: 'inline-block', background: 'linear-gradient(135deg,#ffb02e,#ff8a00)', color: '#1a1200', fontWeight: 800, padding: '12px 22px', borderRadius: 10, textDecoration: 'none', marginTop: 10 }
};

export default function App() {
  return (
    <div style={S.page}>
      <h1 style={{ fontWeight: 800 }}>Venture<span style={S.amber}>Dial</span> <span style={{ ...S.mono, fontSize: 13, color: '#8e97ad' }}>v0.1 · mock mode</span></h1>
      <div style={S.card}>
        <h3 style={S.teal}>Interactive prototype (living spec)</h3>
        <p>All approved features run with mock data here. This is the source of truth for UX while portals are ported to React.</p>
        <a style={S.btn} href="/prototype.html">Open prototype →</a>
      </div>
      <div style={S.card}>
        <h3>Build phases</h3>
        {PHASES.map(p => (
          <div key={p.name} style={{ ...S.mono, fontSize: 13, padding: '6px 0', borderBottom: '1px solid #27304a' }}>
            <b style={S.amber}>{p.name}</b> — {p.goal} <span style={{ color: '#8e97ad' }}>({p.weeks})</span>
          </div>
        ))}
        <p style={{ color: '#8e97ad', fontSize: 13 }}>Full plan: docs/BUILD_PLAN.md · tasks: TODO.md</p>
      </div>
    </div>
  );
}
