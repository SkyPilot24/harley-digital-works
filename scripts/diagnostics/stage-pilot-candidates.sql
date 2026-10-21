-- Stage Top 3 Vetted UK Limited Company Pilot Prospects into Production Leads Table
-- Target: worzpzbutngugwzhlvtj
-- Safety: source='pilot_research' avoids firing enqueue_lead_notification trigger.

INSERT INTO public.leads (
  name,
  email,
  phone,
  company,
  source,
  package,
  status,
  value,
  notes,
  message
) VALUES
(
  'RG Electrical Team',
  'info@rg-electrical.com',
  '01454 612 000',
  'RG Electrical Bristol Limited',
  'pilot_research',
  'Managed (£1,495 setup + £249/mo)',
  'qualified'::lead_status,
  1495.00,
  'Companies House #10082511 (Active). NICEIC approved & TrustMark verified. Target: 2–8 staff. Digital Angle: Homepage portfolio section displays holding message stating full portfolio will be uploaded soon. Ready to dispatch portfolio enhancement proposal.',
  'Homepage portfolio displays placeholder message: "Projects section says portfolio will be uploaded soon." Strong candidate for high-margin domestic rewires, consumer unit upgrades and commercial electrical maintenance showcase.'
),
(
  'Bath-Electrical Team',
  'info@bath-electrical.co.uk',
  '01225 436 123',
  'Bath-Electrical Ltd',
  'pilot_research',
  'Managed (£1,495 setup + £249/mo)',
  'qualified'::lead_status,
  1495.00,
  'Companies House #07702599 (Active). NICEIC claimed on website. Operating in high-value Bath residential market. Digital Angle: Website copy cites outdated 17th Edition wiring regs (BS 7671 is on 18th Edition Amendment 2). Frame tactfully as discrete web copy refresh.',
  'Outdated 17th Edition wiring regulations copy on workmanship page. High-value Bath residential territory. Ideal for structured enquiry form and compliance refresh.'
),
(
  'Nextgen Electrical Team',
  'info@nextgenelec.co.uk',
  '0117 960 4567',
  'Nextgen Electrical Contractors Ltd',
  'pilot_research',
  'Managed (£1,495 setup + £249/mo)',
  'qualified'::lead_status,
  1495.00,
  'Companies House #11042444 (Active). NICEIC Approved Contractor. High commercial target in Warmley/Bristol. Digital Angle: Template placeholder email visible in footer beside real business mailbox.',
  'Template placeholder email in website footer. Ideal candidate for commercial & domestic trade positioning, dual enquiry desk, and multi-service showcase.'
);
