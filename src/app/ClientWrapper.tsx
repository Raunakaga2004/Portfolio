"use client";

import Github from "@/components/icons/Github";
// main portfolio website

// import Logo from "@/components/Logo";
import { qwigley, workSans, sora } from "@/utils/font";
import SideNav from "@/components/SideNav";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";

import { Fragment, useEffect, useRef, useState } from "react";
import Live from "@/components/icons/Live";
import Button from "@/components/Button";
import { imageUrl, resumeHref, SECTION_IDS, type Content } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Home({ content: initialContent }: { content: Content }){
  const [content, setContent] = useState(initialContent);
  // Preview: section to scroll to once the intro animation has finished (object so repeats still fire).
  const [scrollTarget, setScrollTarget] = useState<{ id: string } | null>(null);

  // Admin preview: /admin renders this page in an iframe at /?preview=1 and posts unsaved form values.
  useEffect(() => {
    if (!new URLSearchParams(location.search).has("preview")) return;
    history.scrollRestoration = "manual"; // a reload always starts at the home section
    const onMessage = (e: MessageEvent) => {
      if (e.origin === location.origin && e.data?.type === "preview-content") {
        setContent(e.data.content);
        if (e.data.scrollTo) setScrollTarget({ id: e.data.scrollTo });
      }
    };
    addEventListener("message", onMessage);
    parent.postMessage({ type: "preview-ready" }, location.origin);
    return () => removeEventListener("message", onMessage);
  }, []);

  const scrollPageRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef(null); // Ref for the component's container
  const timelineRef = useRef<GSAPTimeline | null>(null); // Ref to store the timeline instance
  const [introDone, setIntroDone] = useState(false); // drives SideNav's reveal once the intro (photo) animation finishes

  // Preview: wait for the intro to finish, then glide to the requested section.
  useEffect(() => {
    if (!introDone || !scrollTarget) return;
    requestAnimationFrame(() => document.getElementById(scrollTarget.id)?.scrollIntoView({ behavior: "smooth" }));
  }, [introDone, scrollTarget]);

  // scoll animation and snap
  useGSAP(()=>{
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const containerElement = scrollPageRef.current;

    const logo = scrollPageRef.current?.querySelector('#logo_name');

    if(logo) {
      gsap.set(logo, {
        position : 'fixed'
      })
    }

    if(!containerElement){
      console.warn('Scroll Page ref is not available!');
    }

    const sections : HTMLElement[] = gsap.utils.toArray('.page-section', containerElement);

    sections.forEach((section, i) =>{
      if(!(section instanceof HTMLElement)){
        console.warn("section is not a HTML element!");
      }

      // ScrollTrigger.create({
      //   trigger : section,
      //   markers : true,
      //   start : 'top top',
      //   end : '100% bottom',
      //   scroller : containerElement,
      //   snap : {
          
      //     // delay : 0.5,
      //     snapTo : 1,
      //     duration : {
      //       min : 0.4,
      //       max : 1,
      //     },
      //     directional : true,
      //     ease : 'power1.inOut',
      //   }
      // })

    const mm = gsap.matchMedia();

    // type MyConditions = {
    //   isLaptop: boolean;
    //   // isSmallMobile: boolean;
    // };
    
    //laptop animation 1024px 
    mm.add({
      isLaptop: `(min-width: 1024px)`,
      isSmallMobile: `(min-width: 320px)`,
      // reduceMotion: "(prefers-reduced-motion: reduce)",
    }, (context: gsap.Context & { conditions? : gsap.Conditions})=>{
      const isLaptop = context.conditions?.isLaptop;
      
      if(logo && i == 0){
        // set the timeline value of logo first
        gsap.to(logo,{
          scale : isLaptop ? 0.2 : 0.3,
          top : isLaptop ? "-35vh"  : -80,
          left : isLaptop ? -300 : -140,
          zIndex : 10,
          smooth : true,
          scrollTrigger : {
            trigger : section,
            scroller : containerElement,
            start : 'top top',
            scrub : true,
          },
        })
        const blurTrigger = {
          trigger : section,
          scroller : containerElement,
          start : 'top top',
          scrub : true,
        }
        gsap.to(".intro-page-content:not(#intro_image)", {
          filter : 'blur(10px)',
          smooth : true,
          scrollTrigger : blurTrigger,
        })
        // hero blur goes through --blur so the theme brightness in .light-lift isn't frozen by an inline filter
        gsap.to("#intro_image", {
          "--blur" : "10px",
          smooth : true,
          scrollTrigger : blurTrigger,
        })

        // image + shape are pinned (fixed), so they stay in place instead of scrolling up
        // Opacity is set directly from scroll progress (not a tween): a tween records its start value
        // at creation (before the intro reveals these) and left them partly faded on scroll up.
        // Base values match where the intro leaves them (image 1, shape 0.4); progress 0 => exactly base.
        const setFade = (p : number) => {
          gsap.set("#intro_image", { opacity : 1 - p })
        }
        ScrollTrigger.create({
          trigger : section,
          scroller : containerElement,
          start : 'top top',
          end : 'bottom top',
          onUpdate : (self) => setFade(self.progress),
          onLeaveBack : () => setFade(0),
        })

        // shape: tilt left -> right and grow/centre over the hero->services scroll, then stays as the
        // services background. GSAP merges the CSS classes (rotate-325, translate-y) into its own
        // transform, so rotation/y start values must be the class values (-35deg, 10vh/7vh), not 0.
        // fromTo (start = where the intro leaves it) because a plain .to() would record a stale start.
        const vh = window.innerHeight / 100
        const shapeY = (isLaptop ? 10 : 7) * vh
        gsap.fromTo("#intro_oval_shape",
          { rotation : -35, scale : 0.8, x : isLaptop ? -190 : 0, y : shapeY },
          { rotation : 35, scale : 2.2, x : 0, y : shapeY - 10 * vh, ease : 'none', immediateRender : false,
            scrollTrigger : { trigger : section, scroller : containerElement, start : 'top top', end : 'bottom top', scrub : true } }
        )

        // fade the background shape out as the next section (skills, unless hidden) arrives
        if (sections[1]) ScrollTrigger.create({
          trigger : sections[1],
          scroller : containerElement,
          start : 'top bottom',
          end : 'top top',
          onUpdate : (self) => gsap.set("#intro_oval_shape", { opacity : 0.4 * (1 - self.progress) }),
        })

      }

    })

      
    })

  }, {scope : scrollPageRef})

  // intro animation
  useGSAP(()=>{
    timelineRef.current = gsap.timeline({
      defaults : {
        delay : 0,
        repeat : 0
      },
      onComplete : ()=>{
        scrollPageRef.current?.classList.remove('overflow-y-hidden');
        setIntroDone(true);
      }
    })

    // media breakpoints
    const mm = gsap.matchMedia();

    // type MyConditions = {
    //   isLaptop: boolean;
    //   // isSmallMobile: boolean;
    // };
    
    //laptop animation 1024px 
    mm.add({
      isLaptop: `(min-width: 1024px)`,
      isSmallMobile: `(min-width: 320px)`,
      // reduceMotion: "(prefers-reduced-motion: reduce)",
    }, (context: gsap.Context & { conditions? : gsap.Conditions})=>{
      const isLaptop = context.conditions?.isLaptop;

      // 190 px image and oval to the left
      timelineRef.current?.to('#intro_oval_shape', {
        scale : 1,
        duration : 0.5,
        opacity : 0.4,
        ease : "power1.inOut"
      }, 0)

      timelineRef.current?.to('#intro_oval_shape', {
        scale : 0.8,
        x : isLaptop ? "-190px" : "",
        duration : 0.5,
        delay : 0.1,
        ease : "power1.inOut"
      }, 1)

      timelineRef.current?.to('#logo_name', {
        scale : (isLaptop ? 1 : 1.4),
        y : "-5vh",
        duration : 0.8,
        opacity : 1,
        ease : "power1.inOut"
      }, 0)

      timelineRef.current?.to('#logo_name', {
        scale : 1,
        y : isLaptop ? "-3vh" : "-35vh",
        x : isLaptop ? "-250px" : "",
        duration : 0.5,
        delay : 0.1,
        ease : "power1.inOut"
      }, 1)

      timelineRef.current?.to('#intro_image', {
        scale : 1.2,
        opacity : 1,
        duration : 0.3,
        ease : "circ"
      }, 0)

      timelineRef.current?.to('#intro_image', {
        scale : 1,
        x : isLaptop ? "-190px" : "" ,
        duration : 0.5,
        delay : 0.1,
        ease : "power1.inOut"
      }, 1)

      timelineRef.current?.to('#intro_section', {
        opacity : 1,
        delay : 0.5,
        duration : 0.3,
        ease : "power1.inOut"
      }, 1)

      timelineRef.current?.to('#button_last_animation', {
        opacity : 1,
        delay : 0.1,
        duration : 0.5,
        ease : "power1.inOut",
      }, 2)

      timelineRef.current?.to('#last_animation_highlight', {
        backgroundColor : "var(--color-secondary)",
        color : "var(--color-primary)",
        delay : 0.1,
        duration : 0.4,
        ease : "power1.inOut",
      }, 2)
    })

    // timelineRef.current.set('#logo_name', {
    //   position : 'fixed',
    // })

    //tablet animation 768px

    //xs mobile animation 320px

    // splitRef.current = new SplitText('#last_animation_highlight', {
    //   type : "chars"
    // })

  }, {
    scope : containerRef // scope helps to guardrail that uninted animations don't occur (although we don't need it as we are using selectors for each animation)
  })


  const { home, skills, work, experience, about, contact } = content;
  const hiddenIds = (["skills", "work", "experience", "about", "contact"] as const)
    .filter((k) => !content[k].visible)
    .map((k) => SECTION_IDS[k]);

  return (
    <div className={`${workSans.className} relative h-screen w-screen overflow-x-hidden overflow-y-hidden hide-scrollbar snap-container`} ref={scrollPageRef}>
      {/* SideNav is nested here because nothing on scrollPageRef itself applies a
          transform/filter/perspective; if that ever changes, move SideNav to render
          as a sibling instead so its `fixed` positioning stays viewport-relative. */}
      <SideNav scrollerRef={scrollPageRef} visible={introDone} hiddenIds={hiddenIds} />

      {/* intro section */}
      <div id="home" className="h-screen page-section" ref={containerRef}>

        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-end overflow-y-hidden overflow-x-hidden pointer-events-none intro-page">
          
          {/*w-[480px] h-[650px]*/}
          <img id="intro_image" src={home.imageKey ? imageUrl(home.imageKey) : "/image/image.webp"} fetchPriority="high" className="light-lift max-h-[400px] lg:max-h-[72vh] absolute z-2 opacity-1 overflow-x-hidden intro-page-content" alt="intro_image"/>

          <div id="intro_oval_shape" className="absolute lg:w-[55vh] lg:h-[80vh] w-[38vh] h-[55vh] bg-primary rounded-[60%/60%_60%_60%_60%] rotate-325 z-0 opacity-40 lg:translate-y-[10vh] translate-y-[7vh] overflow-x-hidden intro-page-content"/>

          {/* Name text */}
          <div id="logo_name" className={`${qwigley.className} absolute flex flex-col h-screen w-screen justify-center items-center z-1 -translate-y-[500px] opacity-0 pointer-events-none`}>
            <div id="logo_raunak_name" className="text-fortext lg:text-[30vh] xs:text-[96px] lg:-translate-y-[6vw] rotate-[350.6deg]">Raunak</div>
            <div id="logo_agarwal_name" className="text-primary lg:text-[25vh] xs:text-[80px] lg:-translate-y-[19vw] xs:-translate-y-[80px] rotate-[349.2deg]">Agarwal</div>
          </div>
        </div>

        {/* Intro text */}
        <div id="intro_section" className={`${workSans.className} h-screen w-screen absolute top-0 left-0 text-fortext flex flex-col justify-center items-center z-4 text-center text-wrap lg:translate-x-[210px] lg:translate-y-[90px] xs:-translate-y-[8vh] opacity-0 overflow-x-hidden intro-page-content`}>
          {/* Single shared boundary: keeps both the paragraph and the button row an equal
              distance from the right edge as the left-side gutter, accounting for the
              fixed SideNav living in that same right-side space. Below lg (where the
              nav is dots-only / hamburger, not a wide label column) this cap doesn't
              apply, matching the pre-navbar mobile layout exactly. */}
          <div className="flex flex-col items-center gap-[30px] w-full lg:max-w-[min(700px,calc(100vw-720px))]">
            <p id="intro_text" className="w-full lg:max-w-[700px] sm:max-w-[350px] xs:max-w-[300px] lg:text-[3.2vh] sm:text-[20px] xs:text-[16px]">
              {home.introPrefix} <span id="last_animation_highlight" className="">{home.highlight}</span> {home.introSuffix}
            </p>

            <div id="button_last_animation" className="flex flex-wrap w-full justify-center items-center sm:gap-6 xs:gap-2 opacity-0">
              <Button href={resumeHref(home.resumeUrl)} download="RaunakResume.pdf" label="Resume" hoverColor="var(--color-primary)" className="lg:text-[20px] sm:text-[16px] xs:text-[12px] px-6 py-1 [--btn-fg-hover:white]"/>
              <Button href="#work" label="View My Work" hoverColor="var(--color-primary)" className="lg:text-[20px] sm:text-[16px] xs:text-[12px] px-6 py-1 [--btn-fg-hover:white]"/>
            </div>
          </div>
        </div>

      </div>
      
      {skills.visible && <div id="skill-parent" className="page-section text-fortext flex flex-col justify-center items-center md:gap-10 xs:gap-4 xs:h-fit md:h-screen z-0">
        
        {/* Heading */}
        <div className={`${sora.className} md:text-[50px] text-[30px] md:mt-[0px] xs:mt-[60px] px-6 text-center`}>{skills.heading}</div>

        <div className="flex md:flex-row flex-col md:max-h-[70vh] xs:max-h-[80vh] xs:p-8 md:p-0">
          <div className="flex flex-col flex-wrap gap-4">
            {skills.groups.filter((g) => g.visible).map((group, i) => (
              <div key={i} className="skill-box md:max-w-[30vw]">
                <div className={`${sora.className} lg:text-[30px] xs:text-[16px]`}>{group.title}</div>
                <div className="skill-box-content">
                  {group.items.map((item, j) => (
                    <div key={j} className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* also show leetcode profile in a window maybe */}
      </div>}

      {work.visible && <div id="work" className="h-fit page-section xs:mt-[75vh] md:mt-[10vh] text-fortext flex flex-col gap-10 z-0">
        <div className={`${sora.className} md:text-[50px] text-[30px] md:mt-[0px] xs:mt-[60px] px-6 text-center`}>{work.heading}</div>

        <div className="flex flex-col justify-center items-center gap-5">
          {work.projects.filter((p) => p.visible).map((project, i) => (
            <div key={i} className="projectDiv md:w-[50vw] max-w-[80vw]">
              {project.imageKey && <img src={imageUrl(project.imageKey)} alt={project.title} className="rounded-lg w-full object-cover"/>}
              <div className={`${sora.className} text-[25px]`}>{project.title}</div>
              <div className="text-[14px]">{project.description}</div>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech, j) => (
                  <div key={j} className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl text-[12px]">{tech}</div>
                ))}
              </div>
              <div className="text-[12px] flex gap-1">
                {project.githubUrl && <Button href={project.githubUrl} icon={<Github/>} label="GitHub" color="var(--color-projectDiv)" hoverColor="var(--color-primary)" className="mt-4 px-2 py-1 rounded-4xl w-fit [--btn-bg-h:transparent] [--btn-fg-hover:var(--color-fortext)]"/>}
                {project.liveUrl && <Button href={project.liveUrl} icon={<Live/>} label="Live Link" color="var(--color-projectDiv)" hoverColor="var(--color-primary)" className="mt-4 px-2 py-1 rounded-4xl w-fit [--btn-bg-h:transparent] [--btn-fg-hover:var(--color-fortext)]"/>}
              </div>
            </div>
          ))}
        </div>
      </div>}

      {experience.visible && <div id="experience" className="page-section h-screen text-fortext flex flex-col justify-center items-center gap-5">
        <div className={`${sora.className} md:text-[50px] text-[30px] px-6 text-center`}>{experience.heading}</div>
        {experience.items.filter((e) => e.visible).map((item, i) => (
          <div key={i} className="projectDiv md:w-[50vw] max-w-[80vw]">
            <div className={`${sora.className} text-[25px]`}>{item.role}</div>
            <div className="text-[14px]">{item.company} · {item.start} – {item.end || "Present"}</div>
            {item.description && <div className="text-[14px] whitespace-pre-line">{item.description}</div>}
          </div>
        ))}
      </div>}

      {about.visible && <div id="about" className="page-section text-fortext h-fit flex flex-col justify-center items-center xs:mt-[30vh] md:mt-[10vh]">
        {/* about me page */}
        <div className={`${sora.className} md:text-[50px] text-[30px] px-6 text-center`}>{about.heading}</div>
        
        <div className=" flex md:flex-row flex-col-reverse justify-center items-center">
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="bg-[var(--color-primary)] md:w-[40vw] z-0 p-[30px] px-[50px] rounded-lg">
              {about.paragraphs.map((p, i) => (
                <Fragment key={i}>{p} <br/> <br/></Fragment>
              ))}
            </div>

            <Button href={`mailto:${about.email}`} target="_blank" label={about.ctaLabel} hoverColor="var(--color-primary)" className="text-[20px] px-6 py-1 [--btn-fg-hover:white] xs:mx-4 md:mx-2"/>
          </div>

        </div>
      </div>}

      {contact.visible && <div id="contact" className="page-section h-screen text-fortext flex flex-col justify-center items-center gap-6">
        <div className={`${sora.className} md:text-[50px] text-[30px] px-6 text-center`}>{contact.heading}</div>
        <Button href={`mailto:${contact.email}`} target="_blank" label={contact.buttonLabel} hoverColor="var(--color-primary)" className="text-[20px] px-6 py-1 [--btn-fg-hover:white]"/>
      </div>}

      <div className="bg-[var(--color-projectDiv)] w-screen h-fit py-2 text-center text-[var(--color-primary)] xs:mt-10 md:mt-0">Built By <div className="text-fortext text-[20px]">Raunak Agarwal</div></div>
    </div>
  );
}
