"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { sora, workSans } from "@/utils/font";

gsap.registerPlugin(ScrollToPlugin);

interface SideNavProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
  /** Whether the nav should be visible yet — held back until the intro (photo) animation finishes. */
  visible: boolean;
}

const NAV_ITEMS = [
  { id: "home", label: "Intro" },
  { id: "offer-parent", label: "Services" },
  { id: "skill-parent", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
] as const;

export default function SideNav({ scrollerRef, visible }: SideNavProps) {
  const [activeId, setActiveId] = useState<string>("home");

  // Scroll-spy: rather than trusting a single GSAP ScrollTrigger `scroller`
  // guess (which silently never fires if it's watching the wrong element),
  // this compares each section's live viewport position directly and listens
  // on every plausible scroll source at once. getBoundingClientRect() is
  // always viewport-relative, so the "closest to center" math is correct
  // regardless of whether the custom container or the window ends up being
  // the element that actually scrolls.
  useEffect(() => {
    const scroller = scrollerRef.current;

    const sections = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const updateActive = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestId = sections[0].id;
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = section.id;
        }
      });

      setActiveId(closestId);
    };

    updateActive();

    const scrollTargets: (HTMLElement | Window)[] = scroller ? [scroller, window] : [window];
    scrollTargets.forEach((t) => t.addEventListener("scroll", updateActive, { passive: true }));
    window.addEventListener("resize", updateActive);

    return () => {
      scrollTargets.forEach((t) => t.removeEventListener("scroll", updateActive));
      window.removeEventListener("resize", updateActive);
    };
  }, [scrollerRef]);

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    const scroller = scrollerRef.current;
    if (!target) return;

    // Feature-detect whether scrollerRef's element is the real scroll container
    // (it should be — see ClientWrapper's overflow-y toggle) and fall back to
    // window otherwise, so click-to-scroll stays correct either way.
    const useInternalScroller = !!scroller && scroller.scrollHeight > scroller.clientHeight;

    gsap.to(useInternalScroller ? scroller : window, {
      duration: 1,
      ease: "power2.inOut",
      scrollTo: { y: target, offsetY: 0 },
    });
  };

  return (
    <nav
      aria-label="Section navigation"
      className={`${workSans.className} fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-4 transition-opacity duration-700 ease-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => handleClick(id)}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3 bg-transparent"
          >
            <span
              className={`${sora.className} text-sm transition-colors duration-300 ${
                isActive ? "text-primary font-semibold" : "text-fortext/50"
              }`}
            >
              {label}
            </span>
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive ? "w-2.5 h-2.5 bg-primary" : "w-1.5 h-1.5 bg-fortext/40"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
