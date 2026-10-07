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
  },
  scheduledTasks: {
    "* * * * *": ["lead-notifications"],
    "0 * * * *": ["lead-notifications", "prune-lead-attempts"],
  },
});
