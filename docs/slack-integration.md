# Slack Integration

The app can notify Slack when a new public website lead is submitted.

## Environment variable

Set this secret in the deployment environment:

- `SLACK_WEBHOOK_URL`

Use a Slack Incoming Webhook URL for the channel that should receive sales and operations alerts.

## Current behaviour

- The `/contact` form submits through a server function.
- The lead is saved to Supabase first.
- If `SLACK_WEBHOOK_URL` is configured, the server sends a Slack message with the lead name, email, company, package interest, and message.
- If `SLACK_WEBHOOK_URL` is not configured, the lead still saves normally and no Slack message is sent.

## Safety notes

- Do not add the webhook URL to client-side `VITE_*` variables.
- Do not commit the webhook URL to the repository.
- Rotate the webhook in Slack if it is ever exposed.

## Current Status — Complete Slack Operational Command Centre

The Slack integration has been upgraded into a two-way **Founder Operational Command Centre**. Robbie can manage the business directly from Slack without constant dashboard context switching:

1. **Daily Founder Digest:** 08:00 scheduled briefing with verified MRR, 3-build capacity tracking, pipeline totals, outstanding approvals, and edge health.
2. **Two-Way Interactive Workflows:** Inbound lead cards include 1-click `[📞 Contacted]`, `[⭐ Qualify]`, `[📁 Create Client Workspace]`, and `[CRM ↗]` buttons.
3. **Founder Slash Commands:** Use `/thg status`, `/thg leads`, `/thg builds`, `/thg approvals`, `/thg retry`, and `/thg help` directly in Slack.
4. **9-Channel Operational Topology:** Targeted dispatch across `#founder-command`, `#new-leads`, `#sales`, `#customers`, `#operations`, `#finance-alerts`, `#system-alerts`, `#automation-alerts`, and `#deployments`.
5. **Durable & Exception-Managed:** Scheduled queue processor, automatic retry backoff, and 1-click retry button for stuck jobs.
6. **HMAC-SHA256 Security:** Cryptographically verified incoming request endpoints (`/api/slack/interactions`, `/api/slack/commands`, `/api/slack/events`) with 300s replay attack prevention.

For full architectural blueprints, Block Kit specs, and deployment instructions, see [SLACK_COMMAND_CENTRE_ARCHITECTURE.md](SLACK_COMMAND_CENTRE_ARCHITECTURE.md).
