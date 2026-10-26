import { useState, useRef, useEffect } from "react";
import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Send,
  Building2,
  Clock,
  ArrowRight,
  Truck,
  MapPin,
  Phone,
  ShieldAlert,
} from "lucide-react";
import { getReceptionistTenant, BUILTIN_RECEPTIONIST_TENANTS } from "@/lib/receptionist-tenants";
import { cn } from "@/lib/utils";

interface CallMessage {
  id: string;
  sender: "caller" | "receptionist";
  text: string;
  audioUrl?: string | null;
  timestamp: string;
}

interface ExtractedLead {
  callerName?: string;
  callerPhone?: string;
  callerLocation?: string;
  callerTrade?: string;
  callerFleetSize?: string;
  urgency?: "standard" | "urgent_emergency";
}

interface ScenarioOption {
  id: string;
  tenantSlug: string;
  title: string;
  prompt: string;
  tag: string;
}

const PRESET_SCENARIOS: ScenarioOption[] = [
  {
    id: "hdw-electrician",
    tenantSlug: "hdw-primary",
    title: "Bristol Contractor: Website + 24/7 Voice Upsell",
    prompt:
      "Hello, I run an electrical contractor firm in Bristol with 3 vans on the road. We get all our work from word of mouth, but we need a proper website and I want to see how this 24/7 phone receptionist works.",
    tag: "HDW New Business",
  },
  {
    id: "rg-emergency",
    tenantSlug: "rg-electrical",
    title: "RG Electrical: Emergency Burning Fusebox (BS6)",
    prompt:
      "Urgent emergency: I have sparks and a strong burning fishy smell coming from my fusebox under the stairs in Redland. Can an electrician attend immediately?",
    tag: "Emergency Triage",
  },
  {
    id: "apex-cp12",
    tenantSlug: "apex-heating",
    title: "Apex Gas & Heating: Landlord CP12 Safety Cert",
    prompt:
      "Hello, I am a landlord with 2 rental flats in Bathwick. How much is a combined annual boiler service and CP12 Gas Safety certificate?",
    tag: "Trade Pricing FAQ",
  },
  {
    id: "clifton-leak",
    tenantSlug: "clifton-roofing",
    title: "Clifton Roofing: Storm Damage & Drone Survey",
    prompt:
      "Hi there, after the high winds yesterday we have water coming through our bedroom ceiling in Clifton and noticed slipped slates in the garden. Can you do a drone survey?",
    tag: "Quote Survey Request",
  },
];

export function VirtualPhoneCockpit() {
  const [activeTenantSlug, setActiveTenantSlug] = useState<string>("hdw-primary");
  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [messages, setMessages] = useState<CallMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [extractedLead, setExtractedLead] = useState<ExtractedLead>({});
  const [audioPlaying, setAudioPlaying] = useState(false);

  const currentTenant = getReceptionistTenant(activeTenantSlug);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (callActive) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callActive]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Pre-warm browser voices for instant British speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const playRingTone = () => {
    try {
      if (typeof window === "undefined") return;
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // Play authentic UK phone ring tone (400Hz + 450Hz dual tone)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.setValueAtTime(400, now);
      osc2.frequency.setValueAtTime(450, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.38);
      osc2.stop(now + 0.38);
    } catch (err) {
      console.warn("AudioContext ring tone error:", err);
    }
  };

  const playVoiceAudio = (audioDataUri: string, fallbackText?: string) => {
    if (isAudioMuted) return;
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      audioRef.current.src = audioDataUri;
      setAudioPlaying(true);
      audioRef.current.onended = () => setAudioPlaying(false);
      audioRef.current.onerror = () => {
        setAudioPlaying(false);
        if (fallbackText) speakBrowserVoice(fallbackText);
      };
      audioRef.current.play().catch(() => {
        setAudioPlaying(false);
        if (fallbackText) speakBrowserVoice(fallbackText);
      });
    } catch {
      setAudioPlaying(false);
      if (fallbackText) speakBrowserVoice(fallbackText);
    }
  };

  const speakBrowserVoice = (text: string) => {
    if (isAudioMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      setTimeout(() => {
        try {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = "en-GB";
          utterance.rate = 0.95;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;

          const voices = window.speechSynthesis.getVoices();
          const britishVoice =
            voices.find(
              (v) =>
                v.lang === "en-GB" &&
                (v.name.includes("UK") ||
                  v.name.includes("British") ||
                  v.name.includes("Natural") ||
                  v.name.includes("George") ||
                  v.name.includes("Ryan") ||
                  v.name.includes("Oliver") ||
                  v.name.includes("Daniel") ||
                  v.name.includes("Libby") ||
                  v.name.includes("Sonia")),
            ) ||
            voices.find((v) => v.lang === "en-GB") ||
            voices.find((v) => v.lang.startsWith("en"));

          if (britishVoice) {
            utterance.voice = britishVoice;
          }

          setAudioPlaying(true);
          utterance.onstart = () => {
            setAudioPlaying(true);
          };
          utterance.onend = () => setAudioPlaying(false);
          utterance.onerror = () => setAudioPlaying(false);

          window.speechSynthesis.speak(utterance);
          window.speechSynthesis.resume();
        } catch {
          setAudioPlaying(false);
        }
      }, 40);
    } catch {
      setAudioPlaying(false);
    }
  };

  const testSpeakerAudio = () => {
    playRingTone();
    setTimeout(() => {
      speakBrowserVoice(
        "Harley Digital Works audio test. Your speakers are connected and the British voice engine is working perfectly.",
      );
    }, 400);
  };

  const speakText = (text: string, audioDataUri?: string | null) => {
    if (isAudioMuted) return;
    if (audioDataUri) {
      playVoiceAudio(audioDataUri, text);
    } else {
      speakBrowserVoice(text);
    }
  };

  const startCall = (overrideTenant?: string) => {
    const tenantToUse = getReceptionistTenant(overrideTenant || activeTenantSlug);
    setCallActive(true);
    setCallDuration(0);
    setExtractedLead({});

    // Play initial connection ring tone through speakers
    playRingTone();

    const greeting = tenantToUse.greetingText;
    setMessages([
      {
        id: "msg-0",
        sender: "receptionist",
        text: greeting,
        timestamp: "00:00",
      },
    ]);

    // Audibly greet caller through speakers right after ringing tone
    setTimeout(() => {
      speakText(greeting);
    }, 450);
  };

  const endCall = () => {
    setCallActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleSendMessage = async (customText?: string, targetTenantSlug?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;

    const effectiveSlug = targetTenantSlug || activeTenantSlug;
    if (targetTenantSlug && targetTenantSlug !== activeTenantSlug) {
      setActiveTenantSlug(targetTenantSlug);
    }

    if (!callActive) {
      setCallActive(true);
    }

    const currentStamp = formatTime(callDuration);
    const userMsg: CallMessage = {
      id: `call-msg-${Date.now()}`,
      sender: "caller",
      text: textToSend,
      timestamp: currentStamp,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/receptionist/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          sessionId: `call-session-${Date.now()}`,
          tenantId: effectiveSlug,
          mode: "tenant_switchboard",
        }),
      });

      if (!res.ok) throw new Error("Call network error");

      const data = (await res.json()) as {
        replyText: string;
        audioDataUri?: string | null;
        leadInfo?: ExtractedLead;
      };

      const replyMsg: CallMessage = {
        id: `receptionist-reply-${Date.now()}`,
        sender: "receptionist",
        text: data.replyText,
        audioUrl: data.audioDataUri,
        timestamp: formatTime(callDuration + 1),
      };

      setMessages((prev) => [...prev, replyMsg]);

      if (data.leadInfo) {
        setExtractedLead((prev) => ({
          ...prev,
          ...data.leadInfo,
        }));
      }

      if (!isAudioMuted) {
        speakText(data.replyText, data.audioDataUri);
      }
    } catch {
      const fallbackText = `Thank you for calling ${currentTenant.businessName}. We have recorded your message and an on-call engineer will follow up shortly.`;
      setMessages((prev) => [
        ...prev,
        {
          id: `receptionist-err-${Date.now()}`,
          sender: "receptionist",
          text: fallbackText,
          timestamp: formatTime(callDuration + 1),
        },
      ]);
      if (!isAudioMuted) {
        speakText(fallbackText);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMicListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert(
        "Voice speech recognition is not supported in this browser. You can type or use the instant call scenarios below.",
      );
      return;
    }

    try {
      // @ts-expect-error browser SpeechRecognition prefix
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-GB";
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSendMessage(transcript);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const generateWhatsAppDispatchUrl = () => {
    const summary = [
      `*NEW INTAKE LEAD — HDW Virtual Phone Receptionist*`,
      extractedLead.callerName ? `*Name:* ${extractedLead.callerName}` : null,
      extractedLead.callerPhone ? `*Phone:* ${extractedLead.callerPhone}` : null,
      extractedLead.callerTrade ? `*Trade:* ${extractedLead.callerTrade}` : null,
      extractedLead.callerFleetSize ? `*Fleet Size:* ${extractedLead.callerFleetSize}` : null,
      extractedLead.callerLocation ? `*Territory:* ${extractedLead.callerLocation}` : null,
      `*Call Duration:* ${formatTime(callDuration)}`,
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/447394041487?text=${encodeURIComponent(summary)}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Top Cockpit Header */}
      <div className="bg-[#081B30] border border-white/10 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              GOOGLE DIALOGFLOW CX VOICE RUNTIME · UK ENGLISH NEURAL2-B
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display text-white">
              HDW 24/7 Virtual Phone Receptionist
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl font-sans">
              Official voice receptionist for Harley Digital Works. Qualifies UK trade contractors
              calling in, explains our £1,495 + £249/mo package, and showcases how this exact phone
              receptionist can capture missed jobs for their trade business.
            </p>
          </div>

          {/* Business Hours & Capacity Badge */}
          <div className="bg-black/40 px-4 py-3 rounded-xl border border-white/10 text-right space-y-1 self-stretch md:self-auto">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SWITCHBOARD ONLINE 24/7
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Capacity: Strictly Max 2 Active Builds
            </p>
          </div>
        </div>
      </div>

      {/* Trade Demonstration Switcher Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
        <span className="text-[11px] font-mono font-bold text-stone-500 uppercase mr-1">
          Select Live Demonstration:
        </span>
        {BUILTIN_RECEPTIONIST_TENANTS.map((t) => (
          <button
            key={t.tenantSlug}
            type="button"
            onClick={() => {
              setActiveTenantSlug(t.tenantSlug);
              setCallActive(false);
              setMessages([]);
              setExtractedLead({});
            }}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
              activeTenantSlug === t.tenantSlug
                ? "bg-[#081B30] text-white shadow-sm ring-2 ring-amber-400"
                : "bg-white text-stone-700 border border-stone-200/90 hover:bg-stone-100",
            )}
          >
            {t.businessName}
          </button>
        ))}
      </div>

      {/* Main Grid: Phone Dialler & Live Call Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Phone Device (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-sm bg-[#051323] border-[6px] border-[#173C62] rounded-[40px] p-5 shadow-2xl relative overflow-hidden flex flex-col h-[640px]">
            {/* Phone Speaker Notch */}
            <div className="w-24 h-4 bg-[#081B30] rounded-full mx-auto mb-4 border border-white/10 flex items-center justify-center">
              <div className="w-8 h-1 bg-slate-600 rounded-full" />
            </div>

            {/* In-Call Status Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-3 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${callActive ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`}
                />
                <span>{callActive ? "CALL CONNECTED" : "READY TO CALL"}</span>
              </div>
              <div className="text-amber-400 font-semibold">{formatTime(callDuration)}</div>
            </div>

            {/* Caller Identification Header */}
            <div className="py-3 text-center space-y-1">
              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                {currentTenant.businessName} Switchboard
              </p>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {currentTenant.assignedDid}
              </h3>
              <p className="text-xs text-emerald-400 font-medium flex items-center justify-center gap-1.5">
                {audioPlaying ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-amber-300 font-bold">
                      Speaking Aloud (British Voice)...
                    </span>
                  </>
                ) : callActive ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Call Connected · Ready to Speak</span>
                  </>
                ) : (
                  <span>British Voice Synthesizer Ready</span>
                )}
              </p>
            </div>

            {/* Instant Speaker Audio Verification Button */}
            <button
              type="button"
              onClick={testSpeakerAudio}
              className="w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all mb-2 shadow-sm"
              title="Click to verify your computer speakers are outputting sound"
            >
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>🔊 Test Speaker Sound (Click Me)</span>
            </button>

            {/* Voice Waveform Graphic */}
            <div className="h-14 flex items-center justify-center gap-1 bg-black/30 rounded-xl px-4 my-2 border border-white/5">
              {[4, 12, 28, 16, 36, 24, 10, 32, 18, 8, 22, 14, 30, 20, 6].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    audioPlaying
                      ? "bg-amber-400 animate-pulse"
                      : callActive
                        ? "bg-slate-500"
                        : "bg-slate-700"
                  }`}
                  style={{
                    height: audioPlaying
                      ? `${Math.min(h * 1.2, 44)}px`
                      : `${Math.max(h * 0.4, 4)}px`,
                  }}
                />
              ))}
            </div>

            {/* Transcript Stream Box */}
            <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-black/40 rounded-2xl border border-white/5 my-2 text-xs font-sans">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-400 space-y-2">
                  <PhoneCall className="w-8 h-8 text-amber-500/60" />
                  <p>
                    Press "Start Voice Call" or choose a scenario below to test the virtual
                    receptionist.
                  </p>
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === "caller" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                        m.sender === "caller"
                          ? "bg-amber-500 text-[#081B30] font-medium"
                          : "bg-white/10 text-slate-100 border border-white/10"
                      }`}
                    >
                      {m.text}
                    </div>
                    <div className="flex items-center gap-2 mt-1 px-1">
                      <span className="text-[10px] font-mono text-slate-500">
                        {m.sender === "caller"
                          ? "Caller"
                          : `${currentTenant.businessName} Receptionist`}{" "}
                        · {m.timestamp}
                      </span>
                      {m.sender === "receptionist" && (
                        <button
                          type="button"
                          onClick={() => speakText(m.text, m.audioUrl)}
                          className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-300 hover:text-amber-200 transition-colors"
                          title="Replay voice audio"
                        >
                          <Volume2 className="w-2.5 h-2.5" />
                          <span>Replay</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex items-center gap-2 text-amber-300 text-xs font-mono py-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Synthesizing British voice response...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Device Dialler Controls */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  title={isAudioMuted ? "Unmute Audio" : "Mute Audio"}
                  className={`p-3 rounded-full border transition-all ${
                    isAudioMuted
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                  }`}
                >
                  {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {callActive ? (
                  <button
                    onClick={endCall}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-600/30 transition-all"
                  >
                    <PhoneOff className="w-4 h-4" />
                    End Call
                  </button>
                ) : (
                  <button
                    onClick={() => startCall()}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Start Voice Call
                  </button>
                )}

                <button
                  onClick={toggleMicListening}
                  title="Speak into Microphone"
                  className={`p-3 rounded-full border transition-all ${
                    isListening
                      ? "bg-amber-500 text-[#081B30] border-amber-400 animate-pulse"
                      : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                  }`}
                >
                  {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Text Input Row */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Speak or type what the caller says..."
                  className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-[#081B30] transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Scenarios, Live Extracted Lead Brief & Upsell Playbook (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1-Click Interactive Scenarios */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-[#081B30] font-display">
                  1-Click Contractor Call Scenarios
                </h4>
                <p className="text-xs text-slate-600">
                  Click any scenario to test how the receptionist qualifies enquiries and seeds the
                  upsell offer.
                </p>
              </div>
              <button
                onClick={() => setMessages([])}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Log
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PRESET_SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSendMessage(s.prompt, s.tenantSlug)}
                  className="text-left p-3.5 rounded-xl border border-stone-200/90 hover:border-amber-500 hover:bg-amber-50/40 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                        {s.tag}
                      </span>
                      <Play className="w-3 h-3 text-slate-400 group-hover:text-amber-600 transition-colors" />
                    </div>
                    <p className="text-xs font-bold text-[#081B30] pt-1">{s.title}</p>
                    <p className="text-[11px] text-slate-600 line-clamp-2">"{s.prompt}"</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Live Extracted Lead Brief & CRM Card */}
          <div className="bg-[#F6F3ED] border border-stone-300/80 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-[#081B30] font-display uppercase tracking-wider">
                  Live Lead Extraction & Intake Summary
                </h4>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Clock className="w-3.5 h-3.5" />
                HDW NEW BUSINESS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  <Building2 className="w-3 h-3" />
                  <span>Trade</span>
                </div>
                <p className="font-bold text-[#081B30] truncate">
                  {extractedLead.callerTrade || "Detecting..."}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  <Truck className="w-3 h-3" />
                  <span>Fleet Size</span>
                </div>
                <p className="font-bold text-[#081B30] truncate">
                  {extractedLead.callerFleetSize || "Detecting..."}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  <MapPin className="w-3 h-3" />
                  <span>Territory</span>
                </div>
                <p className="font-bold text-[#081B30] truncate">
                  {extractedLead.callerLocation || "Detecting..."}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  <Phone className="w-3 h-3" />
                  <span>Mobile</span>
                </div>
                <p className="font-bold text-[#081B30] truncate">
                  {extractedLead.callerPhone || "Capturing..."}
                </p>
              </div>
            </div>

            {/* Instant WhatsApp Dispatch Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-stone-200">
              <div className="text-xs text-slate-700">
                <p className="font-semibold text-[#081B30]">1-Click WhatsApp Lead Dispatch</p>
                <p className="text-[11px] text-slate-500">
                  Dispatches caller brief directly to Robbie Harley (+44 7394 041487).
                </p>
              </div>
              <a
                href={generateWhatsAppDispatchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-md transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                Dispatch to WhatsApp
              </a>
            </div>
          </div>

          {/* Upsell Commercial Framework for Robbie */}
          <div className="bg-[#081B30] text-white rounded-2xl p-6 border border-white/10 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-mono">
              The Dual-Engine Conversion & Upsell Strategy
            </h4>
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
              <p>
                <strong className="text-white">1. Direct Website Conversion:</strong> When a busy
                contractor calls Harley Digital Works, the receptionist answers immediately in
                British English, explains our fixed £1,495 setup + £249/mo care offer, and captures
                their trade, van count, and mobile so Robbie can close the deal.
              </p>
              <p>
                <strong className="text-white">2. The "You Can Have This Too" Upsell Hook:</strong>{" "}
                During the call, the receptionist seeds the idea:{" "}
                <em>
                  "When we build your website, we can also install this exact 24/7 Phone
                  Receptionist on your business number so you never miss another emergency job while
                  on tools."
                </em>
              </p>
              <p>
                <strong className="text-white">3. Commercial Benefit:</strong> It demonstrates our
                cutting-edge capability live on the phone, immediately builds trust, and positions
                HDW miles ahead of traditional web designers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
