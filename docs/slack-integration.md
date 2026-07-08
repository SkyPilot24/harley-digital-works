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

## Next Slack opportunities

- Send a daily Revenue OS task digest.
- Send website diagnostic warnings to Slack.
- Send won-lead and project-launch updates to the team channel.
