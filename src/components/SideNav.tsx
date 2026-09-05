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

function HamburgerIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
}

export default function SideNav({ scrollerRef, visible }: SideNavProps) {
  const [activeId, setActiveId] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);

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

  // While the mobile full-screen menu is open, lock background scrolling by
  // reusing the same class the intro animation already uses to lock scroll.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (menuOpen) {
      scroller.classList.add("overflow-y-hidden");
    } else {
      scroller.classList.remove("overflow-y-hidden");
    }
    return () => {
      scroller.classList.remove("overflow-y-hidden");
    };
  }, [menuOpen, scrollerRef]);

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

  const handleOverlayItemClick = (id: string) => {
    handleClick(id);
    setMenuOpen(false);
  };

  return (
    <>
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
                className={`${sora.className} hidden md:inline text-sm transition-colors duration-300 ${
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

      {/* Mobile-only hamburger, fixed directly below ThemeToggle (top-4 right-4). */}
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        className={`fixed top-16 right-4 z-50 md:hidden text-fortext border border-primary rounded-full p-2 hover:bg-primary hover:text-backgroundcolor transition-colors transition-opacity duration-700 ease-out ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {/* Mobile-only full-screen menu overlay. */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Section navigation menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8 bg-backgroundcolor/95 backdrop-blur-sm"
        >
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOverlayItemClick(id);
                }}
                className={`${sora.className} text-2xl transition-colors duration-300 ${
                  isActive ? "text-primary font-semibold" : "text-fortext/60"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
