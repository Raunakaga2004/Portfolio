"use client";

// main portfolio website

import { poppins } from "@/utils/font";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

import { useRef } from "react";
import IntroSection from "@/components/IntroSection";
import OfferSection from "@/components/OfferSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const scrollPageRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null); // Ref for the intro section's container
  const timelineRef = useRef<GSAPTimeline | null>(null); // Ref to store the timeline instance

  // scoll animation and snap
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const containerElement = scrollPageRef.current;

    const logo = scrollPageRef.current?.querySelector('#logo_name');

    if (logo) {
      gsap.set(logo, {
        position: 'fixed'
      })
    }

    if (!containerElement) {
      console.warn('Scroll Page ref is not available!');
    }

    const sections: HTMLElement[] = gsap.utils.toArray('.page-section', containerElement);

    sections.forEach((section, i) => {
      if (!(section instanceof HTMLElement)) {
        console.warn("section is not a HTML element!");
      }

      const mm = gsap.matchMedia();

      //laptop animation 1024px
      mm.add({
        isLaptop: `(min-width: 1024px)`,
        isSmallMobile: `(min-width: 320px)`,
      }, (context: gsap.Context & { conditions?: gsap.Conditions }) => {
        const isLaptop = context.conditions?.isLaptop;

        if (logo && i == 0) {
          // set the timeline value of logo first
          gsap.to(logo, {
            scale: isLaptop ? 0.2 : 0.3,
            top: isLaptop ? "-35vh" : -80,
            left: isLaptop ? -300 : -140,
            zIndex: 10,
            smooth: true,
            scrollTrigger: {
              trigger: section,
              scroller: containerElement,
              start: 'top top',
              scrub: true,
              snap: {
                snapTo: 1,
                duration: {
                  min: 0.4,
                  max: 0.6,
                },
                directional: true,
                ease: 'power1.inOut',
              }
            },
          })
          gsap.to(".intro-page-content", {
            filter: 'blur(10px)',
            smooth: true,
            scrollTrigger: {
              trigger: section,
              scroller: containerElement,
              start: 'top top',
              scrub: true,
              snap: {
                snapTo: 1,
                duration: {
                  min: 0.4,
                  max: 0.6,
                },
                directional: true,
                ease: 'power1.inOut',
              }
            },
          })

          gsap.timeline({
            smooth: true,
            scrollTrigger: {
              trigger: '#offer-parent',
              scroller: containerElement,
              start: '30% bottom',
              end: 'bottom bottom',
              scrub: true,
            }
          })
            .to('#offer-heading', {
              opacity: 1,
              ease: 'power1.in',
            }, 0)
            .to('#offer-div-left', {
              x: 0,
              ease: 'power1.in'
            }, 0)
            .to('#offer-div-right', {
              x: 0,
              ease: 'power1.in'
            }, 0)
        }

        gsap.timeline({
          smooth: true,
          scrollTrigger: {
            trigger: '#skill-parent',
            scroller: containerElement,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
            snap: {
              snapTo: 1,
              duration: {
                min: 0.4,
                max: 0.6,
              },
              directional: true,
              ease: 'power1.inOut',
            }
          }
        })
          .to('#offer-div-left', {
            x: '-60vw',
            ease: 'power1.out'
          }, 0)
          .to('#offer-div-right', {
            x: '60vw',
            ease: 'power1.out'
          }, 0)
      })
    })

  }, { scope: scrollPageRef })

  // intro animation
  useGSAP(() => {
    timelineRef.current = gsap.timeline({
      defaults: {
        delay: 0,
        repeat: 0
      },
      onComplete: () => {
        scrollPageRef.current?.classList.remove('overflow-y-hidden');
      }
    })

    // media breakpoints
    const mm = gsap.matchMedia();

    //laptop animation 1024px
    mm.add({
      isLaptop: `(min-width: 1024px)`,
      isSmallMobile: `(min-width: 320px)`,
    }, (context: gsap.Context & { conditions?: gsap.Conditions }) => {
      const isLaptop = context.conditions?.isLaptop;

      // 190 px image and oval to the left
      timelineRef.current?.to('#intro_oval_shape', {
        scale: 1,
        duration: 0.5,
        opacity: 1,
        ease: "power1.inOut"
      }, 0)

      timelineRef.current?.to('#intro_oval_shape', {
        scale: 0.8,
        x: isLaptop ? "-190px" : "",
        duration: 0.5,
        delay: 0.1,
        ease: "power1.inOut"
      }, 1)

      timelineRef.current?.to('#logo_name', {
        scale: (isLaptop ? 1 : 1.4),
        y: "-5vh",
        duration: 0.8,
        opacity: 1,
        ease: "power1.inOut"
      }, 0)

      timelineRef.current?.to('#logo_name', {
        scale: 1,
        y: isLaptop ? "-3vh" : "-35vh",
        x: isLaptop ? "-250px" : "",
        duration: 0.5,
        delay: 0.1,
        ease: "power1.inOut"
      }, 1)

      timelineRef.current?.to('#intro_image', {
        scale: 1.2,
        opacity: 1,
        duration: 0.3,
        ease: "circ"
      }, 0)

      timelineRef.current?.to('#intro_image', {
        scale: 1,
        x: isLaptop ? "-190px" : "",
        duration: 0.5,
        delay: 0.1,
        ease: "power1.inOut"
      }, 1)

      timelineRef.current?.to('#intro_section', {
        opacity: 1,
        delay: 0.5,
        duration: 0.3,
        ease: "power1.inOut"
      }, 1)

      timelineRef.current?.to('#button_last_animation', {
        opacity: 1,
        delay: 0.1,
        duration: 0.5,
        ease: "power1.inOut",
      }, 2)

      timelineRef.current?.to('#last_animation_highlight', {
        backgroundColor: "var(--color-secondary)",
        color: "var(--color-primary)",
        delay: 0.1,
        duration: 0.4,
        ease: "power1.inOut",
      }, 2)
    })
  }, {
    scope: containerRef // scope helps to guardrail that uninted animations don't occur (although we don't need it as we are using selectors for each animation)
  })

  return (
    <div className={`${poppins.className} relative h-screen w-screen overflow-x-hidden overflow-y-hidden hide-scrollbar`} ref={scrollPageRef}>
      <IntroSection ref={containerRef} />
      <OfferSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
    </div>
  );
}
