import { defineConfig } from "nitro";
import { fileURLToPath } from "node:url";

export default defineConfig({
  experimental: { tasks: true },
  tasks: {
    "lead-notifications": {
      handler: fileURLToPath(new URL("./server/tasks/lead-notifications.ts", import.meta.url)),
    },
  },
  scheduledTasks: { "* * * * *": ["lead-notifications"] },
});
