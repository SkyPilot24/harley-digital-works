import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Zap,
} from "lucide-react";

interface Scene {
  id: number;
  title: string;
  shortTitle: string;
  durationSeconds: number;
  startSecond: number;
  endSecond: number;
  image: string;
  videoSrc?: string;
  voiceover: string;
  highlightPills: string[];
}

const SCENES: Scene[] = [
  {
    id: 1,
    title: "The Challenge: Outdated & Broken Mobile Trade Sites",
    shortTitle: "1. The Challenge",
    durationSeconds: 8,
    startSecond: 0,
    endSecond: 8,
    image: "/images/transformation-video/scene-1-frustration.jpg",
    videoSrc: "/images/transformation-video/scene-1-frustration.mp4",
    voiceover:
      "You do exceptional work on site. But when a customer searches on their phone... does your website do your business justice? Outdated layouts, missing badges, and broken forms cost you valuable customer enquiries every single week.",
    highlightPills: ["Slow Mobile Loading", "Hard to Read", "Hidden Trade Accreditations"],
  },
  {
    id: 2,
    title: "The Upgrade: The Harley Digital Works Transformation Wipe",
    shortTitle: "2. The Upgrade",
    durationSeconds: 17,
    startSecond: 8,
    endSecond: 25,
    image: "/images/transformation-video/scene-2-slider-wipe.jpg",
    videoSrc: "/images/transformation-video/scene-2-slider-wipe.mp4",
    voiceover:
      "At Harley Digital Works, we transform tired trade sites into modern commercial platforms. Fast edge delivery. Engineered for mobile. Designed to win higher-value jobs without competing on the cheapest price.",
    highlightPills: ["Fast Mobile Speed", "Trade Trust Badges", "Direct WhatsApp Contact"],
  },
  {
    id: 3,
    title: "The Advantage: All Copywriting & Setup Handled For You",
    shortTitle: "3. Copywriting Handled",
    durationSeconds: 15,
    startSecond: 25,
    endSecond: 40,
    image: "/images/transformation-video/scene-3-zero-homework.jpg",
    videoSrc: "/images/transformation-video/scene-3-zero-homework.mp4",
    voiceover:
      "And the best part? All copywriting is handled for you. We don't ask you to write your own marketing copy. We write the copy, design the site, and look after every update every single month. You stay on the tools; we handle the digital.",
    highlightPills: ["Copywriting Included", "No Homework Required", "Direct WhatsApp Support"],
  },
  {
    id: 4,
    title: "The Offer: Clear Pricing & Up to 2 Concurrent Builds",
    shortTitle: "4. The £1,495 Offer",
    durationSeconds: 15,
    startSecond: 40,
    endSecond: 55,
    image: "/images/transformation-video/scene-4-offer-cta.jpg",
    videoSrc: "/images/transformation-video/scene-4-offer-cta.mp4",
    voiceover:
      "Clear pricing: £1,495 setup with 50% deposit and 50% only when you approve the finished preview. Ongoing monthly care at £249/mo. We only take on up to 2 active builds at a time. Let's take the website headache off your plate.",
    highlightPills: [
      "£1,495 Setup (50% on approval)",
      "£249/mo Managed Care",
      "Up to 2 Builds Active",
    ],
  },
];

const TOTAL_DURATION = 55;

interface HeroTransformationVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HeroTransformationVideoModal({
  isOpen,
  onClose,
}: HeroTransformationVideoModalProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsPlaying(false);
      }
      const listener = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
        if (e.matches) setIsPlaying(false);
      };
      mediaQuery.addEventListener?.("change", listener);
      return () => mediaQuery.removeEventListener?.("change", listener);
    }
  }, []);

  // Active scene calculation
  const currentSceneIndex = SCENES.findIndex(
    (scene) => currentTime >= scene.startSecond && currentTime < scene.endSecond,
  );
  const activeScene = SCENES[currentSceneIndex >= 0 ? currentSceneIndex : SCENES.length - 1];

  // Synchronise video playback with play/pause state
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying && !prefersReducedMotion) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, activeScene, prefersReducedMotion]);

  // Playback timer
  useEffect(() => {
    if (!isOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION) {
            setIsPlaying(false);
            return TOTAL_DURATION;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying]);

  // Voiceover audio speech synthesis when active scene changes
  const speakScene = useCallback(
    (scene: Scene) => {
      if (typeof window === "undefined" || !window.speechSynthesis || isMuted || !isOpen) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(scene.voiceover);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      // Prefer British English voice
      const voices = window.speechSynthesis.getVoices();
      const britishVoice = voices.find(
        (v) => v.lang.includes("en-GB") || v.name.includes("UK") || v.name.includes("British"),
      );
      if (britishVoice) utterance.voice = britishVoice;
      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isMuted, isOpen],
  );

  // Trigger voice on scene step if audio enabled
  useEffect(() => {
    if (isOpen && isPlaying && !isMuted) {
      speakScene(activeScene);
    }
  }, [activeScene, isOpen, isPlaying, isMuted, speakScene]);

  // Keyboard controls (Escape to close, Space to play/pause)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleJumpToScene = (scene: Scene) => {
    setCurrentTime(scene.startSecond);
    setIsPlaying(true);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (!isMuted && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsMuted((prev) => !prev);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0f1115] text-white shadow-2xl flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-[#16181e]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span
              id="video-modal-title"
              className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400"
            >
              Harley Digital Works: 55s Trade Transformation Showcase
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              title={isMuted ? "Unmute Voiceover" : "Mute Voiceover"}
            >
              {isMuted ? (
                <VolumeX className="h-3.5 w-3.5" />
              ) : (
                <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
              )}
              <span className="hidden sm:inline">{isMuted ? "Unmute" : "Voiceover Active"}</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close video showcase"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas / Main Viewport */}
        <div className="relative aspect-video w-full bg-black overflow-hidden group select-none">
          {activeScene.videoSrc ? (
            <video
              ref={videoRef}
              key={activeScene.videoSrc}
              src={activeScene.videoSrc}
              poster={activeScene.image}
              autoPlay={!prefersReducedMotion}
              loop
              muted
              playsInline
              aria-label={`Preview video for ${activeScene.title}`}
              className="h-full w-full object-cover transition-opacity duration-500"
            />
          ) : (
            <img
              src={activeScene.image}
              alt={activeScene.title}
              className="h-full w-full object-cover transition-opacity duration-500"
            />
          )}

          {/* Cinematic Shade Gradient for Subtitle Clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

          {/* Top Scene Kicker Overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 backdrop-blur-md text-xs font-medium text-white/90">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>
                Scene {activeScene.id} of 4: {activeScene.title}
              </span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs font-mono text-white/70 backdrop-blur-md">
              <span>
                {currentTime}s / {TOTAL_DURATION}s
              </span>
            </div>
          </div>

          {/* Subtitle & Voiceover Box (Bottom Overlay) */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 pointer-events-none z-20">
            <div className="max-w-3xl rounded-xl border border-white/15 bg-black/80 p-3.5 sm:p-4 backdrop-blur-md shadow-lg pointer-events-auto">
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                {activeScene.highlightPills.map((pill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-300"
                  >
                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm md:text-base font-medium leading-relaxed text-white">
                “{activeScene.voiceover}”
              </p>
            </div>
          </div>

          {/* Big Center Play / Pause Indicator on Hover */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 cursor-pointer z-10"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-md border border-white/30 text-white hover:scale-110 transition-transform">
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 translate-x-0.5" />
              )}
            </div>
          </button>
        </div>

        {/* Scene Navigation Tabs & Timeline Scrubber */}
        <div className="p-4 bg-[#14161c] border-t border-white/10 space-y-3">
          {/* 4 Scene Segmentation Progress Bar */}
          <div className="space-y-1">
            <div className="grid grid-cols-4 gap-1.5">
              {SCENES.map((scene) => {
                const isActive = scene.id === activeScene.id;
                const isPassed = currentTime >= scene.endSecond;
                const progressWithinScene = isPassed
                  ? 100
                  : isActive
                    ? Math.min(
                        100,
                        Math.max(
                          0,
                          ((currentTime - scene.startSecond) / scene.durationSeconds) * 100,
                        ),
                      )
                    : 0;

                return (
                  <button
                    key={scene.id}
                    onClick={() => handleJumpToScene(scene)}
                    className="group flex flex-col text-left cursor-pointer focus:outline-none"
                  >
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${progressWithinScene}%` }}
                      />
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs mt-1.5 font-medium truncate ${
                        isActive
                          ? "text-emerald-400 font-bold"
                          : "text-white/50 group-hover:text-white/80"
                      }`}
                    >
                      {scene.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Control Bar & Commercial CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" />
                    <span>Play</span>
                  </>
                )}
              </button>
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="Restart from beginning"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Restart</span>
              </button>
              <span className="text-xs font-mono text-white/50">
                {String(Math.floor(currentTime / 60)).padStart(2, "0")}:
                {String(currentTime % 60).padStart(2, "0")} / 00:55
              </span>
            </div>

            {/* Direct Commercial CTAs matching approved terms */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <a
                href="https://wa.me/447889808080?text=Hi%20Robbie%2C%20I%20just%20watched%20your%2055s%20trade%20transformation%20video%20and%20would%20like%20to%20discuss%20a%20website%20plan%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-bold text-black hover:bg-[#20ba59] transition-colors cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp Robbie</span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <span>Book £1,495 Plan</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
