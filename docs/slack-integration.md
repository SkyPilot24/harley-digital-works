# Slack Integration

## Verified live configuration — 11 October 2026

Robbie has confirmed one operational channel for now: **#all-the-harley-group** in **The Harley Group** workspace. Keep this routing until a later explicit decision.

The deployed Worker has `SLACK_WEBHOOK_URL`. The other logical routes in the dispatcher fall back to that webhook. Daily digest messages and accepted lead notifications have been observed in the channel. Scheduled Worker triggers are installed, including the daily `0 8 * * *` trigger (08:00 UTC).

The approved pilot maximum is **three concurrent builds**. A successful digest query is not a live website health check. The draft repair rejects database query errors rather than reporting zero metrics and removes the unsupported edge-health success claim.

## Implemented features versus live acceptance

The repository contains interactive endpoints, slash commands, logical routing and durable retry handling. The deployed settings inspected on 11 October did not include `SLACK_BOT_TOKEN` or `SLACK_SIGNING_SECRET`. Commands and interactive actions therefore remain unverified; do not describe them as an operational two-way command centre. Nine logical route names do not establish nine installed Slack channels.

Observed lead alerts direct the owner to the secure CRM. Consult the current card and notification implementations for payload details; do not assume every fallback contains identical fields. Lead persistence precedes notification delivery, and the durable queue records delivery outcomes.

## Safety and next acceptance

Keep webhook and signing credentials server-side, outside client variables and Git. Do not print or share their values. Inspect queue status and delivery history before retrying to avoid duplicate notifications.

No channels were created and no test messages were sent during this audit. Any future interactive acceptance must use an explicitly approved test and verify both the Slack response and the resulting authorised record change.

See [SLACK_COMMAND_CENTRE_ARCHITECTURE.md](SLACK_COMMAND_CENTRE_ARCHITECTURE.md) for the implementation design; its proposed topology is not proof of the live configuration.
