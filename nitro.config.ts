import { defineConfig } from "nitro";
import { fileURLToPath } from "node:url";

export default defineConfig({
  experimental: { tasks: true },
  tasks: {
    "lead-notifications": {
      handler: fileURLToPath(new URL("./server/tasks/lead-notifications.ts", import.meta.url)),
    },
    "prune-lead-attempts": {
      handler: fileURLToPath(new URL("./server/tasks/prune-lead-attempts.ts", import.meta.url)),
    },
    "founder-daily-digest": {
      handler: fileURLToPath(new URL("./server/tasks/founder-daily-digest.ts", import.meta.url)),
    },
    "system-health-alerts": {
      handler: fileURLToPath(new URL("./server/tasks/system-health-alerts.ts", import.meta.url)),
    },
    "outreach-dispatcher": {
      handler: fileURLToPath(new URL("./server/tasks/outreach-dispatcher.ts", import.meta.url)),
    },
  },
  scheduledTasks: {
    "* * * * *": ["lead-notifications"],
    "0 * * * *": ["lead-notifications", "prune-lead-attempts"],
    "0 8 * * *": ["founder-daily-digest"],
    "0 9 * * 1-5": ["outreach-dispatcher"],
    "*/30 * * * *": ["system-health-alerts"],
  },
});
