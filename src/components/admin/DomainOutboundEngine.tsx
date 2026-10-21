import React, { useState, useEffect } from "react";
import {
  Send,
  Mail,
  Linkedin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  Plus,
  RefreshCw,
  Building,
  DollarSign,
  TrendingUp,
  FileText,
  AlertCircle,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
  Zap,
  Loader2,
  Check,
  Inbox,
  MessageSquare,
  Bell,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  dispatchDomainPitchViaResend,
  testDomainSlackWebhook,
  logInboundDomainOffer,
} from "@/lib/domain-pitch-dispatch.functions";

export interface OutboundTarget {
  id: string;
  companyName: string;
  website: string;
  targetRole: string;
  suggestedContactName: string;
  suggestedEmail?: string;
  strategicHook: string;
  status: "ready" | "pitched" | "followup_due" | "negotiating" | "sold" | "declined";
  pitchedAt?: string;
  lastFollowupAt?: string;
  notes?: string;
  providerId?: string;
}

export interface DomainCampaign {
  id: string;
  domain: string;
  tld: string;
  binGbp: number;
  leaseMonthlyGbp: number;
  floorReserveGbp: number;
  category: string;
  registrarStatus: string;
  strategicRationale: string;
  targets: OutboundTarget[];
}

const INITIAL_CAMPAIGNS: DomainCampaign[] = [
  {
    id: "letscarshop-com",
    domain: "letscarshop.com",
    tld: ".com",
    binGbp: 1995,
    leaseMonthlyGbp: 180,
    floorReserveGbp: 995,
    category: "Automotive & Car Buying",
    registrarStatus: "Active in IONOS (Renews 25 Dec 2026) · Sedo / Afternic Listed",
    strategicRationale:
      "Global .com with conversational action phrase. Natural fit for digital car supermarkets, automotive finance aggregators, and national consumer acquisition campaigns.",
    targets: [
      {
        id: "carwow",
        companyName: "Carwow Ltd",
        website: "https://www.carwow.co.uk",
        targetRole: "Head of Brand & Digital Acquisition",
        suggestedContactName: "Marketing Team",
        suggestedEmail: "partnerships@carwow.co.uk",
        strategicHook:
          "Conversational consumer car-buying hub or app campaign name ('Let's Car Shop'). Defends against emerging competitors.",
        status: "ready",
      },
      {
        id: "motorpoint",
        companyName: "Motorpoint Group Plc",
        website: "https://www.motorpoint.co.uk",
        targetRole: "Marketing Director",
        suggestedContactName: "Digital Marketing Lead",
        suggestedEmail: "marketing@motorpoint.co.uk",
        strategicHook:
          "The UK's largest independent car supermarket. Perfect vanity domain for national TV / radio campaigns directing to online inventory.",
        status: "ready",
      },
      {
        id: "big-motoring-world",
        companyName: "Big Motoring World",
        website: "https://www.bigmotoringworld.co.uk",
        targetRole: "Chief Commercial Officer / Head of Marketing",
        suggestedContactName: "Commercial Director",
        suggestedEmail: "commercial@bigmotoringworld.co.uk",
        strategicHook:
          "Rapidly expanding UK used car supermarket chain looking to build online direct-to-consumer digital shopping volume.",
        status: "ready",
      },
      {
        id: "carfinance-247",
        companyName: "CarFinance 247",
        website: "https://www.carfinance247.co.uk",
        targetRole: "Managing Director / Brand Lead",
        suggestedContactName: "Acquisition Director",
        suggestedEmail: "marketing@carfinance247.co.uk",
        strategicHook:
          "Online car finance and vehicle search aggregator. 'Let's Car Shop' serves as a direct consumer-facing vehicle search frontend.",
        status: "ready",
      },
      {
        id: "cinch",
        companyName: "Cinch (Constellation Automotive Group)",
        website: "https://www.cinch.co.uk",
        targetRole: "Head of Digital Acquisition",
        suggestedContactName: "Acquisition Lead",
        suggestedEmail: "partnerships@cinch.co.uk",
        strategicHook:
          "Major UK online car marketplace with massive ad budgets. Direct category-match vanity URL.",
        status: "ready",
      },
    ],
  },
  {
    id: "virtualavatars-co-uk",
    domain: "virtualavatars.co.uk",
    tld: ".co.uk",
    binGbp: 895,
    leaseMonthlyGbp: 80,
    floorReserveGbp: 400,
    category: "AI Media & Synthetic Video",
    registrarStatus: "Active in IONOS (Renews 24 Dec 2026) · Sedo Listed",
    strategicRationale:
      "Exact-match British digital twin and corporate AI video avatar domain. High-demand sector for corporate compliance and L&D training.",
    targets: [
      {
        id: "guildhawk",
        companyName: "Guildhawk Ltd",
        website: "https://www.guildhawk.com",
        targetRole: "Head of Enterprise AI & Video Solutions",
        suggestedContactName: "Enterprise Director",
        suggestedEmail: "info@guildhawk.com",
        strategicHook:
          "UK enterprise AI avatar creation and multilingual video translation studio for corporate training.",
        status: "ready",
      },
      {
        id: "avatarnow",
        companyName: "AvatarNow AI",
        website: "https://avatarnow.ai",
        targetRole: "Managing Director",
        suggestedContactName: "Founding Director",
        suggestedEmail: "hello@avatarnow.ai",
        strategicHook:
          "Boutique UK studio creating executive digital twins for sales enablement and corporate training.",
        status: "ready",
      },
      {
        id: "harmony-studios",
        companyName: "Harmony Studios",
        website: "https://www.harmony.co.uk",
        targetRole: "Creative Technology Director",
        suggestedContactName: "Creative Director",
        suggestedEmail: "info@harmony.co.uk",
        strategicHook:
          "UK interactive media agency building real-time 3D and synthetic avatar pipelines for enterprise clients.",
        status: "ready",
      },
      {
        id: "sales-enablement-group",
        companyName: "The Sales Enablement Group",
        website: "https://thesalesenablement.group",
        targetRole: "Learning & Development Director",
        suggestedContactName: "L&D Lead",
        suggestedEmail: "info@thesalesenablement.group",
        strategicHook:
          "Specialist agency delivering AI avatar-powered corporate training modules and HR onboarding systems.",
        status: "ready",
      },
    ],
  },
  {
    id: "valuecurrencies-com",
    domain: "valuecurrencies.com",
    tld: ".com",
    binGbp: 4995,
    leaseMonthlyGbp: 450,
    floorReserveGbp: 2500,
    category: "Fintech & Foreign Exchange",
    registrarStatus: "Active in IONOS · Afternic Nameservers Configured",
    strategicRationale:
      "Global .com financial asset. Highly suitable for international money transfer comparison, FX brokers, or digital treasury platforms.",
    targets: [
      {
        id: "ofx-uk",
        companyName: "OFX (UK) Limited",
        website: "https://www.ofx.com",
        targetRole: "Head of Digital Marketing (Europe)",
        suggestedContactName: "Marketing Lead",
        suggestedEmail: "partnerships@ofx.com",
        strategicHook:
          "Global foreign exchange and international money transfer provider. Asset provides permanent SEO authority for currency valuation.",
        status: "ready",
      },
      {
        id: "torfx",
        companyName: "TorFX",
        website: "https://www.torfx.com",
        targetRole: "Commercial Director",
        suggestedContactName: "Commercial Lead",
        suggestedEmail: "business@torfx.com",
        strategicHook:
          "Leading UK currency broker handling high-value personal and corporate overseas transfers.",
        status: "ready",
      },
      {
        id: "currencyfair",
        companyName: "CurrencyFair",
        website: "https://www.currencyfair.com",
        targetRole: "Head of Acquisition Marketing",
        suggestedContactName: "Acquisition Director",
        suggestedEmail: "partnerships@currencyfair.com",
        strategicHook:
          "Peer-to-peer international currency exchange platform looking to capture organic global search volume.",
        status: "ready",
      },
    ],
  },
  {
    id: "5gdata-org",
    domain: "5gdata.org",
    tld: ".org",
    binGbp: 2495,
    leaseMonthlyGbp: 225,
    floorReserveGbp: 1200,
    category: "Telecom & IoT Telemetry",
    registrarStatus: "Active in IONOS · Sedo Parking Configured",
    strategicRationale:
      "Short, authoritative .org asset for private 5G network providers, smart city telemetry, or telecommunications research bodies.",
    targets: [
      {
        id: "cellnex-uk",
        companyName: "Cellnex Telecom UK",
        website: "https://www.cellnextelecom.co.uk",
        targetRole: "Head of Enterprise 5G Solutions",
        suggestedContactName: "Enterprise Director",
        suggestedEmail: "info@cellnextelecom.co.uk",
        strategicHook:
          "Europe's largest wireless telecommunications infrastructure operator. Strong brand vehicle for enterprise private 5G data telemetry.",
        status: "ready",
      },
      {
        id: "wireless-infrastructure-group",
        companyName: "Wireless Infrastructure Group (WIG)",
        website: "https://www.wirelessinfrastructure.co.uk",
        targetRole: "Commercial Strategy Director",
        suggestedContactName: "Strategy Lead",
        suggestedEmail: "info@wirelessinfrastructure.co.uk",
        strategicHook:
          "Independent UK wireless infrastructure builder and operator of neutral-host 5G networks.",
        status: "ready",
      },
    ],
  },
];

const LOCAL_STORAGE_KEY = "thg_domain_outbound_campaigns_v2";
const SLACK_STORAGE_KEY = "thg_domain_slack_webhook";

export function DomainOutboundEngine() {
  const [campaigns, setCampaigns] = useState<DomainCampaign[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback to initial
        }
      }
    }
    return INITIAL_CAMPAIGNS;
  });

  const [activeCampaignId, setActiveCampaignId] = useState<string>("letscarshop-com");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [danModalOpen, setDanModalOpen] = useState(false);
  const [escrowModalOpen, setEscrowModalOpen] = useState(false);
  const [addTargetModalOpen, setAddTargetModalOpen] = useState(false);

  // Slack Integration State
  const [slackWebhookUrl, setSlackWebhookUrl] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(SLACK_STORAGE_KEY) || "";
    }
    return "";
  });
  const [slackModalOpen, setSlackModalOpen] = useState(false);
  const [slackTesting, setSlackTesting] = useState(false);
  const [slackStatusMessage, setSlackStatusMessage] = useState<{
    success: boolean;
    text: string;
  } | null>(null);

  // Inbound Offer / Reply Modal State
  const [inboundModalOpen, setInboundModalOpen] = useState(false);
  const [inboundTarget, setInboundTarget] = useState<OutboundTarget | null>(null);
  const [inboundCompanyName, setInboundCompanyName] = useState("");
  const [inboundSenderEmail, setInboundSenderEmail] = useState("");
  const [inboundOfferAmount, setInboundOfferAmount] = useState("");
  const [inboundMessageSnippet, setInboundMessageSnippet] = useState("");
  const [inboundNextStatus, setInboundNextStatus] =
    useState<OutboundTarget["status"]>("negotiating");
  const [isInboundSubmitting, setIsInboundSubmitting] = useState(false);
  const [inboundSuccessReceipt, setInboundSuccessReceipt] = useState<{
    loggedAt: string;
    slackDelivered: boolean;
  } | null>(null);
  const [inboundError, setInboundError] = useState<string | null>(null);

  // Inbound Automation Webhook Info Modal
  const [inboundInfoModalOpen, setInboundInfoModalOpen] = useState(false);

  // Resend Dispatch Modal State
  const [resendModalOpen, setResendModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<OutboundTarget | null>(null);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessReceipt, setSendSuccessReceipt] = useState<{
    providerId: string;
    sentAt: string;
    recipient: string;
    slackDelivered?: boolean;
  } | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  // Custom Target Form
  const [customCompany, setCustomCompany] = useState("");
  const [customWebsite, setCustomWebsite] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [customHook, setCustomHook] = useState("");

  const activeCampaign = campaigns.find((c) => c.id === activeCampaignId) || campaigns[0];

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(campaigns));
    }
  }, [campaigns]);

  // Copy helper with visual feedback
  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(identifier);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Status updater
  const updateTargetStatus = (
    targetId: string,
    nextStatus: OutboundTarget["status"],
    providerId?: string,
    notes?: string,
  ) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== activeCampaign.id) return c;
        return {
          ...c,
          targets: c.targets.map((t) => {
            if (t.id !== targetId) return t;
            return {
              ...t,
              status: nextStatus,
              pitchedAt: nextStatus === "pitched" ? new Date().toISOString() : t.pitchedAt,
              providerId: providerId || t.providerId,
              notes: notes !== undefined ? notes : t.notes,
            };
          }),
        };
      }),
    );
  };

  // Test Slack Webhook Connection
  const handleTestSlack = async (urlToTest?: string) => {
    const targetUrl = (urlToTest !== undefined ? urlToTest : slackWebhookUrl).trim();
    if (!targetUrl || !targetUrl.startsWith("http")) {
      setSlackStatusMessage({
        success: false,
        text: "Please enter a valid Slack webhook URL (e.g. https://hooks.slack.com/services/...)",
      });
      return;
    }

    setSlackTesting(true);
    setSlackStatusMessage(null);

    try {
      await testDomainSlackWebhook({
        data: {
          webhookUrl: targetUrl,
        },
      });

      if (typeof window !== "undefined") {
        localStorage.setItem(SLACK_STORAGE_KEY, targetUrl);
      }
      setSlackWebhookUrl(targetUrl);
      setSlackStatusMessage({
        success: true,
        text: "Connected! Test verification message delivered to your #sales channel.",
      });
    } catch (err) {
      setSlackStatusMessage({
        success: false,
        text: err instanceof Error ? err.message : "Failed to verify Slack webhook.",
      });
    } finally {
      setSlackTesting(false);
    }
  };

  // Open Inbound Logger Modal
  const handleOpenInboundModal = (target: OutboundTarget) => {
    setInboundTarget(target);
    setInboundCompanyName(target.companyName);
    setInboundSenderEmail(target.suggestedEmail || "");
    setInboundOfferAmount("");
    setInboundMessageSnippet("");
    setInboundNextStatus("negotiating");
    setInboundSuccessReceipt(null);
    setInboundError(null);
    setInboundModalOpen(true);
  };

  // Execute Inbound Offer / Activity Log
  const handleExecuteLogInboundOffer = async () => {
    if (!inboundTarget) return;
    if (!inboundSenderEmail.trim() || !inboundSenderEmail.includes("@")) {
      setInboundError("Please enter a valid sender email address.");
      return;
    }
    if (!inboundMessageSnippet.trim()) {
      setInboundError("Please enter the response message snippet or summary.");
      return;
    }

    setIsInboundSubmitting(true);
    setInboundError(null);

    try {
      const cleanedAmount = inboundOfferAmount.replace(/[^0-9.]/g, "").trim();
      const offerNum = cleanedAmount ? Number(cleanedAmount) : null;

      const result = await logInboundDomainOffer({
        data: {
          domain: activeCampaign.domain,
          companyName: inboundCompanyName.trim() || inboundTarget.companyName,
          senderEmail: inboundSenderEmail.trim(),
          offerAmountGbp: offerNum && !isNaN(offerNum) ? offerNum : null,
          messageSnippet: inboundMessageSnippet.trim(),
          slackWebhookUrl: slackWebhookUrl.trim() || undefined,
        },
      });

      const noteText = `[Inbound ${new Date().toLocaleDateString("en-GB")}] ${offerNum ? `Offer: £${offerNum.toLocaleString("en-GB")}. ` : ""}"${inboundMessageSnippet.trim()}"`;

      updateTargetStatus(
        inboundTarget.id,
        inboundNextStatus,
        undefined,
        inboundTarget.notes ? `${inboundTarget.notes} | ${noteText}` : noteText,
      );

      setInboundSuccessReceipt({
        loggedAt: result.loggedAt,
        slackDelivered: result.slackDelivered,
      });
    } catch (err) {
      setInboundError(
        err instanceof Error ? err.message : "Failed to record inbound deal activity.",
      );
    } finally {
      setIsInboundSubmitting(false);
    }
  };

  // Open Resend Dispatch Modal
  const handleOpenResendModal = (target: OutboundTarget) => {
    setSelectedTarget(target);
    setRecipientEmail(target.suggestedEmail || "");
    setEmailSubject(`Question regarding ${activeCampaign.domain} for ${target.companyName}`);
    setEmailBody(generateEmailPitch(target, activeCampaign));
    setSendSuccessReceipt(null);
    setSendError(null);
    setResendModalOpen(true);
  };

  // Trigger Send via Resend API
  const handleExecuteResendDispatch = async () => {
    if (!selectedTarget) return;
    if (!recipientEmail.trim() || !recipientEmail.includes("@")) {
      setSendError("Please provide a valid recipient email address.");
      return;
    }

    setIsSending(true);
    setSendError(null);

    try {
      const result = await dispatchDomainPitchViaResend({
        data: {
          recipientEmail: recipientEmail.trim(),
          recipientName: selectedTarget.suggestedContactName || "Team",
          companyName: selectedTarget.companyName,
          domain: activeCampaign.domain,
          subject: emailSubject,
          plainTextBody: emailBody,
          targetId: selectedTarget.id,
          slackWebhookUrl: slackWebhookUrl.trim() || undefined,
        },
      });

      setSendSuccessReceipt({
        providerId: result.providerId,
        sentAt: result.sentAt,
        recipient: result.recipientEmail,
        slackDelivered: result.slackDelivered,
      });

      // Update target status in state and localStorage
      updateTargetStatus(
        selectedTarget.id,
        "pitched",
        result.providerId,
        `Sent via Resend API on ${new Date().toLocaleDateString("en-GB")} (${result.providerId})${result.slackDelivered ? " · Alerted Slack #sales" : ""}`,
      );
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Failed to dispatch email via Resend.");
    } finally {
      setIsSending(false);
    }
  };

  // Add target handler
  const handleAddCustomTarget = () => {
    if (!customCompany.trim()) return;
    const newTarget: OutboundTarget = {
      id: `custom-${Date.now()}`,
      companyName: customCompany.trim(),
      website: customWebsite.trim().startsWith("http")
        ? customWebsite.trim()
        : `https://${customWebsite.trim()}`,
      targetRole: customRole.trim() || "Marketing Director / MD",
      suggestedContactName: "Decision Maker",
      suggestedEmail: customEmail.trim() || undefined,
      strategicHook: customHook.trim() || "Exact match domain asset acquisition.",
      status: "ready",
    };

    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== activeCampaign.id) return c;
        return {
          ...c,
          targets: [newTarget, ...c.targets],
        };
      }),
    );

    setCustomCompany("");
    setCustomWebsite("");
    setCustomRole("");
    setCustomEmail("");
    setCustomHook("");
    setAddTargetModalOpen(false);
  };

  // Reset to default campaigns
  const handleReset = () => {
    if (confirm("Reset all targets, dispatch history, and campaign notes to verified defaults?")) {
      setCampaigns(INITIAL_CAMPAIGNS);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  // Pitch generation helpers
  const generateEmailPitch = (target: OutboundTarget, campaign: DomainCampaign) => {
    return `Hi ${target.suggestedContactName || "Team"},

I hope you don’t mind the direct note.

I currently hold the brand asset ${campaign.domain} and am preparing to sell it as part of an end-of-year portfolio restructuring.

Before listing it across public registrar exchanges, I wanted to reach out to ${target.companyName} first to see if having the exact address ${campaign.domain} makes strategic sense for your digital campaigns, consumer acquisition, or branding.

We have priced it reasonably for a clean, direct transfer (£${campaign.binGbp.toLocaleString("en-GB")}), or it can be leased monthly (£${campaign.leaseMonthlyGbp.toLocaleString("en-GB")}/month over 12 months with 0% interest).

To ensure complete buyer security, the transaction is handled through ICANN-accredited escrow (Escrow.com or Dan.com), so funds are safely held in trust until the domain is fully under your control.

If this is of interest, let me know and I will send over the secure transfer details. If not, no problem at all—thanks for your time.

Kind regards,

Robbie Harley
Founder & Director
The Harley Group
Bristol, UK`;
  };

  const generateMailtoUrl = (target: OutboundTarget, campaign: DomainCampaign) => {
    const subject = encodeURIComponent(
      `Question regarding ${campaign.domain} for ${target.companyName}`,
    );
    const body = encodeURIComponent(generateEmailPitch(target, campaign));
    const recipient = target.suggestedEmail ? encodeURIComponent(target.suggestedEmail) : "";
    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  const generateLinkedInPitch = (target: OutboundTarget, campaign: DomainCampaign) => {
    return `Hi, hope you don't mind the direct note. I currently hold the brand asset ${campaign.domain} and am selling it as part of a portfolio review. Reaching out to ${target.companyName} first in case it fits your brand or digital acquisition strategy (£${campaign.binGbp.toLocaleString("en-GB")} Buy-It-Now or £${campaign.leaseMonthlyGbp}/mo lease via Escrow). Best, Robbie Harley`;
  };

  const generateFollowupPitch = (target: OutboundTarget, campaign: DomainCampaign) => {
    return `Hi ${target.suggestedContactName || "Team"},

Following up briefly on my note regarding ${campaign.domain}. 

We are scheduling the public registrar exchange listings next week, but wanted to check whether ${target.companyName} would like to secure the asset directly before it goes public.

Happy to provide the secure escrow transfer link or discuss 12-month lease options (£${campaign.leaseMonthlyGbp}/mo) if helpful.

Best regards,

Robbie Harley
The Harley Group`;
  };

  // Pipeline summary metrics
  const totalPipelineValue = campaigns.reduce((sum, c) => sum + c.binGbp, 0);
  const totalMonthlyPotential = campaigns.reduce((sum, c) => sum + c.leaseMonthlyGbp, 0);
  const allTargets = campaigns.flatMap((c) => c.targets);
  const pitchedCount = allTargets.filter(
    (t) => t.status === "pitched" || t.status === "followup_due" || t.status === "negotiating",
  ).length;
  const soldCount = allTargets.filter((t) => t.status === "sold").length;
  const resendSentCount = allTargets.filter((t) => Boolean(t.providerId)).length;

  return (
    <div className="space-y-6">
      {/* Top Value Summary Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Outbound Pipeline
              </span>
              <DollarSign size={16} className="text-emerald-600" />
            </div>
            <div className="mt-1 text-2xl font-bold text-[#081B30]">
              £{totalPipelineValue.toLocaleString("en-GB")}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Across {campaigns.length} high-value assets
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Monthly Lease Potential
              </span>
              <TrendingUp size={16} className="text-blue-600" />
            </div>
            <div className="mt-1 text-2xl font-bold text-blue-700">
              £{totalMonthlyPotential.toLocaleString("en-GB")}
              <span className="text-sm font-normal text-slate-500"> /mo</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Zero-risk recurring lease</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Vetted Targets
              </span>
              <Building size={16} className="text-amber-600" />
            </div>
            <div className="mt-1 text-2xl font-bold text-[#081B30]">{allTargets.length}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">UK corporate buyers identified</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Dispatched via Resend
              </span>
              <Zap size={16} className="text-emerald-600 fill-emerald-600" />
            </div>
            <div className="mt-1 text-2xl font-bold text-emerald-700">
              {resendSentCount}{" "}
              <span className="text-sm font-normal text-slate-500">/ {pitchedCount} Active</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Sent via robbie@theharleygroup.org</p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Channel & Automation Integration Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Resend Outbound status */}
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">Resend 1-Click:</span>
            <span className="font-mono text-[11px] text-emerald-800">
              robbie@theharleygroup.org
            </span>
          </div>

          {/* Slack Channel status */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
              slackWebhookUrl
                ? "bg-slate-50 text-slate-800 border-slate-200"
                : "bg-amber-50 text-amber-900 border-amber-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                slackWebhookUrl ? "bg-emerald-500" : "bg-amber-400"
              }`}
            />
            <MessageSquare
              size={13}
              className={slackWebhookUrl ? "text-slate-600" : "text-amber-700"}
            />
            <span className="font-bold">Slack Channel:</span>
            <span className="font-mono text-[11px] font-semibold">
              {slackWebhookUrl ? "#sales (Active)" : "Not Configured"}
            </span>

            {slackWebhookUrl ? (
              <div className="flex items-center gap-1.5 ml-1">
                <button
                  type="button"
                  onClick={() => handleTestSlack()}
                  disabled={slackTesting}
                  className="text-[11px] text-blue-700 hover:text-blue-900 underline font-medium cursor-pointer"
                >
                  {slackTesting ? "Testing..." : "Test"}
                </button>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => setSlackModalOpen(true)}
                  className="text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer"
                  title="Configure Slack Webhook"
                >
                  <Settings2 size={12} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSlackModalOpen(true)}
                className="ml-1 text-[11px] font-bold text-amber-800 hover:underline cursor-pointer"
              >
                Connect #sales 🔔
              </button>
            )}
          </div>
        </div>

        {/* Inbound Mail Automation Info */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setInboundInfoModalOpen(true)}
            className="text-xs font-bold text-[#081B30] border-slate-300 hover:bg-slate-50 gap-1.5 cursor-pointer"
          >
            <Inbox size={13} className="text-indigo-600" /> Inbound Mail Automation 📬
          </Button>
        </div>
      </div>

      {/* Asset Selection Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {campaigns.map((camp) => (
            <button
              key={camp.id}
              type="button"
              onClick={() => setActiveCampaignId(camp.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeCampaignId === camp.id
                  ? "bg-[#081B30] text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>{camp.domain}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  activeCampaignId === camp.id
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                £{camp.binGbp}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAddTargetModalOpen(true)}
            className="text-xs font-bold gap-1 text-[#081B30] border-slate-300"
          >
            <Plus size={14} /> Add Target Company
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800"
            title="Reset to factory targets"
          >
            <RefreshCw size={13} />
          </Button>
        </div>
      </div>

      {/* Selected Domain Deal Card */}
      <Card className="bg-gradient-to-r from-[#081B30] to-[#173C62] text-white border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-500 text-white text-[11px] font-mono tracking-wide px-2.5 py-0.5">
                  TARGET ASSET · {activeCampaign.tld.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="text-slate-200 border-slate-500 text-[11px]">
                  {activeCampaign.category}
                </Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-mono">
                {activeCampaign.domain}
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                {activeCampaign.strategicRationale}
              </p>
              <div className="text-xs text-emerald-300 flex items-center gap-1.5 pt-1">
                <ShieldCheck size={14} /> {activeCampaign.registrarStatus}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px] bg-white/10 p-4 rounded-xl border border-white/15 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-300">Buy-It-Now Ask:</span>
                <span className="text-lg font-mono font-bold text-emerald-400">
                  £{activeCampaign.binGbp.toLocaleString("en-GB")}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-300">Lease Option:</span>
                <span className="text-sm font-mono font-bold text-white">
                  £{activeCampaign.leaseMonthlyGbp}/mo{" "}
                  <span className="text-[10px] text-slate-400 font-sans">(12m)</span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-2">
                <span className="text-xs text-slate-300">Private Reserve Floor:</span>
                <span className="text-sm font-mono text-amber-300 font-bold">
                  £{activeCampaign.floorReserveGbp.toLocaleString("en-GB")}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => setDanModalOpen(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold gap-1 cursor-pointer"
                >
                  <LinkIcon size={12} /> Lease Link
                </Button>
                <Button
                  size="sm"
                  onClick={() => setEscrowModalOpen(true)}
                  className="w-full bg-white text-[#081B30] hover:bg-slate-100 text-xs font-bold gap-1 cursor-pointer"
                >
                  <ShieldCheck size={12} /> Escrow
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Target Companies Pipeline List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#081B30]">
              Identified UK Corporate Targets ({activeCampaign.targets.length})
            </h3>
            <p className="text-xs text-slate-500">
              1-Click automated dispatch via Resend (sent directly from{" "}
              <code className="text-emerald-700 font-semibold">robbie@theharleygroup.org</code>).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1 font-bold">
              <Zap size={12} className="fill-emerald-600 text-emerald-600" /> Resend API Connected
            </span>
          </div>
        </div>

        <div className="grid gap-4">
          {activeCampaign.targets.map((target, idx) => {
            const emailText = generateEmailPitch(target, activeCampaign);
            const mailtoUrl = generateMailtoUrl(target, activeCampaign);
            const linkedInText = generateLinkedInPitch(target, activeCampaign);
            const followupText = generateFollowupPitch(target, activeCampaign);

            return (
              <Card
                key={target.id}
                className="border-slate-200 shadow-sm hover:border-slate-300 transition-all bg-white"
              >
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Company details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-400">
                          #{idx + 1}
                        </span>
                        <h4 className="text-base font-bold text-[#081B30] flex items-center gap-1.5">
                          {target.companyName}
                        </h4>
                        <a
                          href={target.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 hover:underline inline-flex items-center gap-0.5 font-mono"
                        >
                          {target.website.replace("https://", "").replace("www.", "")}
                          <ExternalLink size={10} />
                        </a>

                        {/* Status Badge with Select */}
                        <div className="ml-auto sm:ml-2">
                          <select
                            value={target.status}
                            onChange={(e) =>
                              updateTargetStatus(
                                target.id,
                                e.target.value as OutboundTarget["status"],
                              )
                            }
                            className={`text-xs font-bold px-2.5 py-1 rounded-full border cursor-pointer ${
                              target.status === "ready"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : target.status === "pitched"
                                  ? "bg-blue-50 text-blue-800 border-blue-200"
                                  : target.status === "followup_due"
                                    ? "bg-purple-50 text-purple-800 border-purple-200"
                                    : target.status === "negotiating"
                                      ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                                      : target.status === "sold"
                                        ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                                        : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            <option value="ready">Ready to Pitch</option>
                            <option value="pitched">Pitched (Sent)</option>
                            <option value="followup_due">Follow-up Due</option>
                            <option value="negotiating">In Negotiation</option>
                            <option value="sold">Sold & Cleared (£)</option>
                            <option value="declined">Declined</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <Building size={12} className="text-slate-400" />
                          Target Role:{" "}
                          <strong className="text-slate-800">{target.targetRole}</strong>
                        </span>
                        {target.suggestedEmail && (
                          <span className="inline-flex items-center gap-1 text-slate-500 font-mono">
                            <Mail size={12} className="text-slate-400" />
                            {target.suggestedEmail}
                          </span>
                        )}
                        {target.pitchedAt && (
                          <span className="inline-flex items-center gap-1 text-slate-500">
                            <Clock size={12} className="text-blue-500" />
                            Pitched on: {new Date(target.pitchedAt).toLocaleDateString("en-GB")}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <strong className="text-slate-800 font-medium">Strategic Angle:</strong>{" "}
                        {target.strategicHook}
                      </p>

                      {target.providerId && (
                        <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50/80 px-2 py-1 rounded border border-emerald-200 flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-600" />
                          <span>
                            Resend Dispatch Verified · Receipt: <code>{target.providerId}</code>
                          </span>
                        </div>
                      )}

                      {target.notes && (
                        <p className="text-xs text-indigo-700 bg-indigo-50/50 p-2 rounded border border-indigo-100">
                          <strong>Note:</strong> {target.notes}
                        </p>
                      )}
                    </div>

                    {/* 1-Click Action Buttons */}
                    <div className="flex flex-row md:flex-col gap-2 min-w-[220px] self-end md:self-center border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
                      {/* 1-Click Send via Resend Button */}
                      <Button
                        size="sm"
                        onClick={() => handleOpenResendModal(target)}
                        className="text-xs font-bold justify-start gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs"
                      >
                        <Zap size={13} className="fill-white" /> Send via Resend (Auto)
                      </Button>

                      {/* Log Inbound Reply / Offer Button */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenInboundModal(target)}
                        className="text-xs font-bold justify-start gap-1.5 text-indigo-700 border-indigo-200 hover:bg-indigo-50 cursor-pointer shadow-2xs"
                      >
                        <Inbox size={13} className="text-indigo-600" /> Log Inbound Offer 📬
                      </Button>

                      {/* Copy full email */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          handleCopy(emailText, `email-${target.id}`);
                          if (target.status === "ready") {
                            updateTargetStatus(target.id, "pitched");
                          }
                        }}
                        className={`text-xs font-bold justify-start gap-1.5 cursor-pointer ${
                          copiedId === `email-${target.id}`
                            ? "bg-slate-800 text-white"
                            : "text-[#081B30] border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {copiedId === `email-${target.id}` ? (
                          <>
                            <CheckCircle2 size={13} className="text-emerald-400" /> Copied Text!
                          </>
                        ) : (
                          <>
                            <Copy size={13} /> Copy Pitch Text
                          </>
                        )}
                      </Button>

                      {/* Launch mailto */}
                      <a href={mailtoUrl} target="_blank" rel="noreferrer" className="inline-flex">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-full text-xs font-bold justify-start gap-1.5 text-blue-700 hover:bg-blue-50 cursor-pointer"
                        >
                          <Mail size={13} /> Open in Email App
                        </Button>
                      </a>

                      {/* Copy LinkedIn */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(linkedInText, `li-${target.id}`)}
                        className="text-xs font-bold justify-start gap-1.5 text-slate-600 hover:bg-slate-50 cursor-pointer"
                      >
                        {copiedId === `li-${target.id}` ? (
                          <>
                            <CheckCircle2 size={13} className="text-emerald-600" /> Copied!
                          </>
                        ) : (
                          <>
                            <Linkedin size={13} className="text-blue-600" /> Copy LinkedIn Note
                          </>
                        )}
                      </Button>

                      {/* 7-Day Followup */}
                      {target.status === "pitched" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(followupText, `fu-${target.id}`)}
                          className="text-[11px] text-purple-700 hover:bg-purple-50 justify-start gap-1"
                        >
                          {copiedId === `fu-${target.id}` ? (
                            <CheckCircle2 size={12} className="text-purple-600" />
                          ) : (
                            <Send size={12} />
                          )}
                          Copy 7-Day Follow-up
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Resend Automated Dispatch Modal */}
      <Dialog open={resendModalOpen} onOpenChange={setResendModalOpen}>
        <DialogContent className="max-w-xl bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#081B30]">
              <Zap size={18} className="text-emerald-600 fill-emerald-600" />
              Automated Resend Pitch Dispatch
            </DialogTitle>
            <DialogDescription>
              Dispatches directly through your verified Resend domain from{" "}
              <strong>Robbie Harley &lt;robbie@theharleygroup.org&gt;</strong>.
            </DialogDescription>
          </DialogHeader>

          {sendSuccessReceipt ? (
            <div className="space-y-4 py-4 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">
                  Pitch Successfully Dispatched!
                </h4>
                <p className="text-xs text-slate-600">
                  Resend accepted the email for delivery to{" "}
                  <strong className="text-[#081B30]">{sendSuccessReceipt.recipient}</strong>.
                </p>
                {sendSuccessReceipt.slackDelivered && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold mt-1">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    Instant dispatch alert sent to Slack #sales
                  </div>
                )}
                <p className="text-[11px] font-mono text-slate-500 pt-1">
                  Provider ID: <code>{sendSuccessReceipt.providerId}</code>
                </p>
              </div>
              <div className="pt-2">
                <Button
                  onClick={() => setResendModalOpen(false)}
                  className="bg-[#081B30] text-xs font-bold"
                >
                  Done & Back to Deals
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5 py-1 text-xs">
              {sendError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-2.5 rounded-lg flex items-center gap-2 text-xs">
                  <AlertCircle size={14} className="text-rose-600 shrink-0" />
                  <span>{sendError}</span>
                </div>
              )}

              {/* Sender & Recipient bar */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Verified Sender:</span>
                  <span className="font-mono text-slate-800 font-semibold">
                    Robbie Harley &lt;robbie@theharleygroup.org&gt;
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold text-slate-700">Recipient Email *</Label>
                    <button
                      type="button"
                      onClick={() => setRecipientEmail("robbie@theharleygroup.org")}
                      className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                    >
                      (Test Send to Myself)
                    </button>
                  </div>
                  <Input
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="e.g. partnerships@carwow.co.uk"
                    className="font-mono text-xs bg-white"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-700">Subject Line</Label>
                <Input
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="text-xs"
                />
              </div>

              {/* Body Preview */}
              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-700">Email Body</Label>
                <Textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={8}
                  className="font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-700 shrink-0" />
                <span>
                  <strong>PECR / B2B Compliant:</strong> Sent as a 1-to-1 personalised commercial
                  enquiry from your verified corporate domain.
                </span>
              </div>
            </div>
          )}

          {!sendSuccessReceipt && (
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setResendModalOpen(false)}
                disabled={isSending}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                onClick={handleExecuteResendDispatch}
                disabled={isSending}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold gap-1.5"
              >
                {isSending ? (
                  <>
                    <Loader2 size={13} className="animate-spin" /> Dispatching via Resend...
                  </>
                ) : (
                  <>
                    <Zap size={13} className="fill-white" /> Confirm & Send via Resend 🚀
                  </>
                )}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Dan.com Lease-to-Own Modal */}
      <Dialog open={danModalOpen} onOpenChange={setDanModalOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#081B30]">
              <LinkIcon size={18} className="text-emerald-600" />
              Dan.com Lease-to-Own Generator
            </DialogTitle>
            <DialogDescription>
              When a buyer agrees to monthly instalments, share this link or set these parameters in
              Dan:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Domain:</span>
                <strong className="text-[#081B30] font-mono">{activeCampaign.domain}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Buy-It-Now Full Price:</span>
                <strong className="text-emerald-700 font-mono">
                  £{activeCampaign.binGbp.toLocaleString("en-GB")}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Monthly Lease (12 Months):</span>
                <strong className="text-blue-700 font-mono">
                  £{activeCampaign.leaseMonthlyGbp} / month
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Interest / APR:</span>
                <span className="text-slate-700">0% (Founder Approved)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Direct Checkout Link:</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={`https://dan.com/buy-domain/${activeCampaign.domain}`}
                  className="font-mono text-xs bg-slate-50"
                />
                <Button
                  size="sm"
                  onClick={() =>
                    handleCopy(`https://dan.com/buy-domain/${activeCampaign.domain}`, "dan-link")
                  }
                  className="text-xs bg-[#081B30] hover:bg-slate-800"
                >
                  {copiedId === "dan-link" ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                </Button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              💡 <strong>How it protects you:</strong> Dan.com holds the domain under contract in
              their registrar. The buyer uses the domain via DNS changes, but ownership only
              transfers to them once the final 12th payment clears. If they cancel, you keep all
              payments and retain the domain.
            </p>
          </div>

          <DialogFooter>
            <Button onClick={() => setDanModalOpen(false)} className="bg-[#081B30] text-xs">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Escrow.com Safeguard Modal */}
      <Dialog open={escrowModalOpen} onOpenChange={setEscrowModalOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#081B30]">
              <ShieldCheck size={18} className="text-blue-600" />
              Escrow.com Deal Calculator & Security
            </DialogTitle>
            <DialogDescription>
              Parameters to enter when creating a transaction on Escrow.com for{" "}
              {activeCampaign.domain}:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Item Category:</span>
                <strong className="text-slate-800">Domain Name (Intangible Digital Asset)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Agreed Price:</span>
                <strong className="text-emerald-700 font-mono">
                  £{activeCampaign.binGbp.toLocaleString("en-GB")}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Recommended Escrow Fee Split:</span>
                <strong className="text-slate-800">50% Buyer / 50% Seller</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Inspection Period:</span>
                <strong className="text-slate-800">2 Business Days</strong>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5">
                <span className="text-slate-500">Disbursement Method:</span>
                <strong className="text-blue-700 font-mono">
                  UK BACS / Bank Wire (Zero Chargeback)
                </strong>
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-800 text-[11px] leading-relaxed">
              ⚠️ <strong>Golden Rule for Robbie:</strong> Never release the EPP Authorisation code
              or approve the Nominet IPS-TAG transfer until Escrow.com sends the formal status:{" "}
              <em>"Buyer funds secured and verified — safe to transfer."</em>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setEscrowModalOpen(false)} className="bg-[#081B30] text-xs">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Custom Target Modal */}
      <Dialog open={addTargetModalOpen} onOpenChange={setAddTargetModalOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#081B30]">
              Add Custom Target for {activeCampaign.domain}
            </DialogTitle>
            <DialogDescription>
              Add a new UK company or contact to pitch for this domain asset.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">Company Name *</Label>
              <Input
                placeholder="e.g. Vertu Motors Plc"
                value={customCompany}
                onChange={(e) => setCustomCompany(e.target.value)}
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">Website</Label>
              <Input
                placeholder="e.g. https://www.vertumotors.com"
                value={customWebsite}
                onChange={(e) => setCustomWebsite(e.target.value)}
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">Recipient Email</Label>
              <Input
                placeholder="e.g. partnerships@vertumotors.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">Target Role / Contact</Label>
              <Input
                placeholder="e.g. Marketing Director / CEO"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">
                Strategic Angle / Pitch Reason
              </Label>
              <Textarea
                placeholder="e.g. Looking to launch a national consumer car buying comparison portal."
                value={customHook}
                onChange={(e) => setCustomHook(e.target.value)}
                className="text-xs min-h-[60px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddTargetModalOpen(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button onClick={handleAddCustomTarget} className="bg-[#081B30] text-xs font-bold">
              Save Target
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Slack Channel Configuration & Test Modal */}
      <Dialog open={slackModalOpen} onOpenChange={setSlackModalOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#081B30]">
              <MessageSquare size={18} className="text-emerald-600" />
              Slack #sales Channel Integration
            </DialogTitle>
            <DialogDescription>
              Connect Slack to receive instant mobile and desktop alerts whenever domain pitches are
              sent, inbound buyer replies arrive, or offers are submitted.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            {slackStatusMessage && (
              <div
                className={`p-3 rounded-lg border text-xs flex items-start gap-2 ${
                  slackStatusMessage.success
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-rose-50 border-rose-200 text-rose-800"
                }`}
              >
                {slackStatusMessage.success ? (
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={15} className="text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{slackStatusMessage.text}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">
                Slack Incoming Webhook URL *
              </Label>
              <Input
                placeholder="https://hooks.slack.com/services/T.../B.../..."
                value={slackWebhookUrl}
                onChange={(e) => setSlackWebhookUrl(e.target.value)}
                className="font-mono text-xs"
              />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                💡 <strong>Where to find this:</strong> In your Slack workspace, go to Apps →
                Incoming Webhooks, choose <strong>#sales</strong>, and copy the Webhook URL. It is
                stored securely in your browser so you only ever have to enter it once.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1 text-slate-600">
              <span className="font-semibold text-slate-800">What alerts will be sent?</span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
                <li>🚀 1-Click Outbound pitch dispatch receipts</li>
                <li>📬 Inbound email arrivals from corporate buyers</li>
                <li>🚨 Price counter-offers and negotiation updates</li>
              </ul>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setSlackModalOpen(false)} className="text-xs">
              Close
            </Button>
            <Button
              onClick={() => handleTestSlack()}
              disabled={slackTesting}
              className="bg-[#081B30] hover:bg-slate-800 text-white text-xs font-bold gap-1.5 cursor-pointer"
            >
              {slackTesting ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Verifying Connection...
                </>
              ) : (
                <>
                  <Bell size={13} /> Test & Save Connection 🚀
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Inbound Response & Offer Logger Modal */}
      <Dialog open={inboundModalOpen} onOpenChange={setInboundModalOpen}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#081B30]">
              <Inbox size={18} className="text-indigo-600" />
              Log Inbound Response / Offer
            </DialogTitle>
            <DialogDescription>
              Record an incoming email response or counter-offer for{" "}
              <strong className="text-slate-800 font-mono">{activeCampaign.domain}</strong>.
              Automatically updates the deal status and triggers an alert in Slack #sales.
            </DialogDescription>
          </DialogHeader>

          {inboundSuccessReceipt ? (
            <div className="space-y-4 py-4 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Inbound Activity Recorded!</h4>
                <p className="text-xs text-slate-600">
                  Target status updated to{" "}
                  <strong className="capitalize text-indigo-700">{inboundNextStatus}</strong>.
                </p>
                {inboundSuccessReceipt.slackDelivered ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium mt-2">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    High-priority alert delivered to Slack #sales
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 pt-1">
                    (Note: Slack alert skipped or webhook not configured)
                  </p>
                )}
              </div>
              <div className="pt-2">
                <Button
                  onClick={() => setInboundModalOpen(false)}
                  className="bg-[#081B30] text-xs font-bold"
                >
                  Done & Back to Deals
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5 py-1 text-xs">
              {inboundError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-2.5 rounded-lg flex items-center gap-2 text-xs">
                  <AlertCircle size={14} className="text-rose-600 shrink-0" />
                  <span>{inboundError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-700">Company Name</Label>
                  <Input
                    value={inboundCompanyName}
                    onChange={(e) => setInboundCompanyName(e.target.value)}
                    className="text-xs bg-slate-50"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-700">Sender / Buyer Email *</Label>
                  <Input
                    value={inboundSenderEmail}
                    onChange={(e) => setInboundSenderEmail(e.target.value)}
                    className="text-xs font-mono"
                    placeholder="buyer@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-700">
                    Counter-Offer Amount (£ GBP)
                  </Label>
                  <Input
                    value={inboundOfferAmount}
                    onChange={(e) => setInboundOfferAmount(e.target.value)}
                    placeholder="e.g. 1500 (leave blank if enquiry)"
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-700">Update Status To</Label>
                  <select
                    value={inboundNextStatus}
                    onChange={(e) =>
                      setInboundNextStatus(e.target.value as OutboundTarget["status"])
                    }
                    className="w-full h-9 rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-slate-800 focus:outline-hidden"
                  >
                    <option value="negotiating">In Negotiation</option>
                    <option value="sold">Sold & Cleared (£)</option>
                    <option value="followup_due">Follow-up Due</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-700">
                  Buyer Message Snippet / Notes *
                </Label>
                <Textarea
                  value={inboundMessageSnippet}
                  onChange={(e) => setInboundMessageSnippet(e.target.value)}
                  placeholder="e.g. Received your note regarding letscarshop.com. We are interested in purchasing it for our online car supermarket division and can offer £1,400 via Escrow..."
                  rows={4}
                  className="text-xs leading-relaxed"
                />
              </div>

              <div className="bg-indigo-50/70 p-2.5 rounded-lg border border-indigo-200 text-[11px] text-indigo-900 flex items-center gap-2">
                <Zap size={14} className="text-indigo-700 shrink-0" />
                <span>
                  Submitting will automatically post an instant alert to your{" "}
                  <strong>#sales</strong> Slack channel and append this note to the deal card.
                </span>
              </div>
            </div>
          )}

          {!inboundSuccessReceipt && (
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setInboundModalOpen(false)}
                disabled={isInboundSubmitting}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                onClick={handleExecuteLogInboundOffer}
                disabled={isInboundSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold gap-1.5 cursor-pointer"
              >
                {isInboundSubmitting ? (
                  <>
                    <Loader2 size={13} className="animate-spin" /> Recording Activity...
                  </>
                ) : (
                  <>
                    <Inbox size={13} /> Save Offer & Alert Slack 🚀
                  </>
                )}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Inbound Mail Automation Webhook Info Modal */}
      <Dialog open={inboundInfoModalOpen} onOpenChange={setInboundInfoModalOpen}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#081B30]">
              <Inbox size={18} className="text-indigo-600" />
              Automated Inbound Mail Routing & Webhook
            </DialogTitle>
            <DialogDescription>
              How automated hands-free email capture works for all domain pitches and replies.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">
                Inbound Webhook Listener Endpoint:
              </Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value="https://harleydigitalworks.co.uk/api/webhooks/domain-inbound"
                  className="font-mono text-xs bg-slate-50"
                />
                <Button
                  size="sm"
                  onClick={() =>
                    handleCopy(
                      "https://harleydigitalworks.co.uk/api/webhooks/domain-inbound",
                      "webhook-url",
                    )
                  }
                  className="text-xs bg-[#081B30] hover:bg-slate-800"
                >
                  {copiedId === "webhook-url" ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                </Button>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
              <span className="font-bold text-[#081B30] text-xs">Zero-Homework 3-Step Setup:</span>
              <div className="space-y-2 text-[11px] text-slate-700 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#081B30] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                    1
                  </span>
                  <div>
                    <strong>Direct Replies to robbie@theharleygroup.org:</strong> All Resend
                    outbound pitches specify your address as the verified sender and{" "}
                    <code>reply_to</code>. Any prospective buyer hitting &quot;Reply&quot; in
                    Outlook or Gmail arrives directly into your primary inbox.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#081B30] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                    2
                  </span>
                  <div>
                    <strong>Automated Webhook Forwarding (Resend / Cloudflare):</strong> When
                    configuring Inbound Email Webhooks in your Resend dashboard or Cloudflare Email
                    Routing rules, paste the endpoint above. Resend forwards the raw email JSON
                    immediately to the deal engine.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#081B30] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                    3
                  </span>
                  <div>
                    <strong>Real-time Slack Notification:</strong> The server route instantly
                    extracts the sender, domain, and message snippet, then pushes an urgent
                    notification to your <strong>#sales</strong> Slack channel on your mobile
                    device.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-emerald-900 text-[11px] flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
              <span>
                <strong>No Missed Deals:</strong> Even without automated webhooks configured, you
                can log any email reply or telephone counter-offer in 1 click using the{" "}
                <strong>&quot;Log Inbound Offer 📬&quot;</strong> button on each deal card!
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setInboundInfoModalOpen(false)}
              className="bg-[#081B30] text-xs font-bold"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
