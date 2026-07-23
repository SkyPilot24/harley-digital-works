import { useEffect, type RefObject } from "react";

export function useHomepageAnimations(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | null = null;

    document.body.classList.add("is-loading");

    async function initAnimations() {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (cancelled || !containerRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          const loaderTl = gsap.timeline({
            onComplete: () => {
              document.body.classList.remove("is-loading");
              ScrollTrigger.refresh();
            },
          });

          loaderTl.fromTo(
            ".wave-path-1",
            { strokeDashoffset: 100 },
            { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" },
          );
          loaderTl.fromTo(
            ".wave-path-2",
            { strokeDashoffset: 100 },
            { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" },
            "<0.2",
          );

          loaderTl.fromTo(
            ".loader-letter",
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.7)" },
            "-=0.6",
          );

          loaderTl.to(".loader-strip", {
            scaleY: 1,
            duration: 0.5,
            stagger: 0.08,
            transformOrigin: "bottom",
            ease: "power3.in",
          });

          loaderTl.to(".loader-overlay", {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
          });

          loaderTl.fromTo(
            ".main-wrapper",
            { opacity: 0, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
            "-=0.4",
          );

          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: "bottom+=150% top",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          heroTl.to(".hero-card-1", {
            xPercent: -90,
            yPercent: 30,
            rotation: -14,
            ease: "power2.out",
          });
          heroTl.to(
            ".hero-card-3",
            {
              xPercent: 90,
              yPercent: -30,
              rotation: 14,
              ease: "power2.out",
            },
            "<",
          );
          heroTl.to(
            ".hero-card-2",
            {
              scale: 1.08,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              ease: "power2.out",
            },
            "<",
          );

          gsap.to(".hero-card-2", {
            y: "+=12",
            yoyo: true,
            repeat: -1,
            duration: 2.2,
            ease: "sine.inOut",
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#pillars",
                start: "top top",
                end: "bottom+=120% top",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
              },
            })
            .fromTo(
              ".pillar-title",
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, ease: "power2.out" },
            )
            .fromTo(
              ".pillar-item",
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out" },
              "-=0.3",
            );

          const manifestoTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#manifesto",
              start: "top top",
              end: "bottom+=150% top",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          manifestoTl.to(".manifesto-word", {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            stagger: {
              each: 0.04,
              from: "random",
            },
            ease: "power4.out",
          });

          const boardTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#board",
              start: "top top",
              end: "bottom+=150% top",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          boardTl.to(".board-card", {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "back.out(1.2)",
          });

          gsap.to(".flying-dot-1", {
            strokeDashoffset: -200,
            repeat: -1,
            duration: 8,
            ease: "none",
          });
          gsap.to(".flying-dot-2", {
            strokeDashoffset: 200,
            repeat: -1,
            duration: 10,
            ease: "none",
          });

          const ctaTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#cta",
              start: "top top",
              end: "bottom+=250% top",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          ctaTl.to(".wipe-rose", {
            yPercent: 0,
            ease: "power2.inOut",
          });
          ctaTl.fromTo(
            ".sweep-title-rose",
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, ease: "back.out(1.5)" },
            "-=0.2",
          );

          ctaTl.to(".wipe-emerald", {
            xPercent: 0,
            ease: "power2.inOut",
          });
          ctaTl.fromTo(
            ".sweep-title-emerald",
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, ease: "back.out(1.5)" },
            "-=0.2",
          );

          ctaTl.to(".wipe-black", {
            yPercent: 0,
            ease: "power2.inOut",
          });
          ctaTl.fromTo(
            ".sweep-title-black",
            { yPercent: 50, opacity: 0 },
            { yPercent: 0, opacity: 1, ease: "power3.out" },
            "-=0.3",
          );
          ctaTl.fromTo(
            ".final-pane",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, ease: "power3.out" },
          );
        }, containerRef);

        revert = () => ctx.revert();
      } catch (error) {
        console.error(error);
        document.body.classList.remove("is-loading");
      }
    }

    void initAnimations();

    return () => {
      cancelled = true;
      revert?.();
      document.body.classList.remove("is-loading");
    };
  }, [containerRef]);
}
