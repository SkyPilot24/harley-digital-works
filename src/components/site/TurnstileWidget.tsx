import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  onVerify?: (token: string) => void;
}

export function TurnstileWidget({ onVerify }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState("");

  const isEnabled =
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.VITE_TURNSTILE_ENABLED === "true") ||
    (typeof process !== "undefined" && process.env?.TURNSTILE_ENABLED === "true");

  const siteKey =
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.VITE_TURNSTILE_SITE_KEY) ||
    "";

  useEffect(() => {
    if (!isEnabled || !siteKey || !containerRef.current) return;

    let isMounted = true;

    function renderWidget() {
      if (!window.turnstile || !containerRef.current || widgetIdRef.current) return;
      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (receivedToken: string) => {
            if (!isMounted) return;
            setToken(receivedToken);
            onVerify?.(receivedToken);
          },
          "error-callback": () => {
            if (!isMounted) return;
            setToken("");
          },
          "expired-callback": () => {
            if (!isMounted) return;
            setToken("");
          },
          theme: "auto",
        });
        widgetIdRef.current = id;
      } catch (err) {
        console.warn("Could not render Turnstile widget:", err);
      }
    }

    if (window.turnstile) {
      renderWidget();
    } else {
      const existingScript = document.querySelector('script[src*="turnstile/v0/api.js"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (isMounted) renderWidget();
        };
        document.head.appendChild(script);
      } else {
        const interval = setInterval(() => {
          if (window.turnstile) {
            clearInterval(interval);
            if (isMounted) renderWidget();
          }
        }, 100);
        return () => clearInterval(interval);
      }
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore cleanup errors
        }
        widgetIdRef.current = null;
      }
    };
  }, [isEnabled, siteKey, onVerify]);

  if (!isEnabled) {
    return <input type="hidden" name="cf-turnstile-response" value="" />;
  }

  return (
    <div
      className="turnstile-wrapper my-2 min-h-[65px] flex items-center justify-center sm:justify-start"
      role="region"
      aria-label="Human verification challenge"
    >
      <div ref={containerRef} className="turnstile-widget" />
      <input type="hidden" name="cf-turnstile-response" value={token} />
    </div>
  );
}
