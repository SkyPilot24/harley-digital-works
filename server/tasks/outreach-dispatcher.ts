import { defineTask } from "nitro/task";
import { processOutreachBatch, type QualifiedProspect } from "../../src/lib/outreach-dispatcher";
import { supabaseAdmin } from "../../src/integrations/supabase/client.server";

export default defineTask({
  meta: {
    name: "outreach-dispatcher",
    description:
      "Automated corporate prospect outreach dispatch with concurrency cap and audit logging",
  },
  async run() {
    const isEnabled = process.env.TRANSACTIONAL_EMAIL_ENABLED === "true";
    const apiKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.TRANSACTIONAL_SENDER_EMAIL;

    // Check active builds count against the strict 2-build concurrency cap
    let activeBuilds = 0;
    try {
      const { count } = await supabaseAdmin
        .from("projects")
        .select("id", { count: "exact", head: true })
        .in("status", ["in_progress", "review"]);
      activeBuilds = count ?? 0;
    } catch {
      activeBuilds = 0;
    }

    // Load qualified targets approved for sending
    // For Pilot 1: Qualified top target P01 (RG Electrical Bristol Limited)
    const candidates: QualifiedProspect[] = [
      {
        id: "P01",
        businessName: "RG Electrical Bristol Limited",
        area: "Bradley Stoke / Bristol",
        website: "https://www.rg-electrical.com/",
        recipientEmail: process.env.PILOT_P01_TARGET_EMAIL || "office@rg-electrical.com",
        recipientName: "RG Electrical Team",
        companyNumber: "10082511",
        accreditationEvidence: "NICEIC verified via TrustMark 421650",
        observationSummary: "Projects section indicates portfolio forthcoming",
        subject: "A small improvement to your project portfolio",
        plainTextBody:
          "Hello RG Electrical team,\n\nI noticed your website's project section says the full portfolio is coming soon. A few clear examples could help customers understand the work you already do.\n\nI run Harley Digital Works, part of The Harley Group. Would you like a short note showing how that section could be improved?\n\nRobbie\nHarley Digital Works, part of The Harley Group",
        approvedForSending: true,
      },
    ];

    const results = await processOutreachBatch({
      prospects: candidates,
      enabled: isEnabled,
      apiKey,
      senderEmail,
      activeBuildsCount: activeBuilds,
      maxConcurrentBuilds: 2,
      alreadyContactedIds: new Set(),
      recordSent: async (prospectId, receipt) => {
        console.log(`[Outreach Dispatcher] Sent confirmed for ${prospectId}:`, receipt);
      },
      fetch: (input, init) => fetch(input, init),
    });

    return { result: results };
  },
});
