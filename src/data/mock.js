// Mock data for dev — mirrors public/prototype.html. Mock mode must always work.
export const MOCK_LEADS = [
  { name: 'Karen Mitchell', phone: '(603) 555-0142', town: 'Nashua, NH', utility: 'Eversource NH', bill: 284, source: 'leadconduit', team: 'Ben' },
  { name: 'Derek Alvarez', phone: '(914) 555-0188', town: 'Yonkers, NY', utility: 'Con Edison', bill: 310, source: 'sf:ny-reactivation', team: 'Joseph' },
  { name: 'Priya Raman', phone: '(401) 555-0173', town: 'Cranston, RI', utility: 'Rhode Island Energy', bill: 245, source: 'sf:referrals', team: 'Ben' },
  { name: 'Tom Gallagher', phone: '(207) 555-0119', town: 'Portland, ME', utility: 'CMP', bill: 198, source: 'sf:canvass', team: 'Ben' }
];
export const MOCK_RING_GROUPS = [
  { name: 'NH Sales Line', number: '(603) 555-7400', sourceTag: 'Google Ads', team: 'Ben', strategy: 'simultaneous' },
  { name: 'NY/NJ Sales Line', number: '(914) 555-7410', sourceTag: 'Facebook Lead Ads', team: 'Joseph', strategy: 'simultaneous' },
  { name: 'Customer Care', number: '(800) 555-7420', sourceTag: 'Website IVR', team: 'CX', strategy: 'round-robin' },
  { name: 'Callback Line', number: '(603) 555-7430', sourceTag: 'Missed-call SMS', team: 'All', strategy: 'longest-idle' }
];
