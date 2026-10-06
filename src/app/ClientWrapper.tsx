"use client";

import Github from "@/components/icons/Github";
// main portfolio website

// import Logo from "@/components/Logo";
import { qwigley, workSans, sora } from "@/utils/font";
import SideNav from "@/components/SideNav";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";

import { useRef, useState } from "react";
import Live from "@/components/icons/Live";
import Button from "@/components/Button";
// import { skillsType } from "./page";

gsap.registerPlugin(ScrollTrigger, SplitText)

// interface skillMapType {
//   allSkills : Map<string, skillsType[]>;
// }

// export default function Home({allSkills}: skillMapType) {
export default function Home(){

  // console.log(categories)

  const scrollPageRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef(null); // Ref for the component's container
  const timelineRef = useRef<GSAPTimeline | null>(null); // Ref to store the timeline instance
  const [introDone, setIntroDone] = useState(false); // drives SideNav's reveal once the intro (photo) animation finishes

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

        // fade the background shape out as the skills section arrives
        ScrollTrigger.create({
          trigger : '#skill-parent',
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


  const projectTechStack = {
    lockedIn : ['React', 'TypeScript', 'Zod', 'JWT', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'TailwindCSS'],
    portfolio : ['Next.js', 'TypeScript', 'NextAuth', 'Node.js', 'TailwindCSS'],
    sudokuGame : ['Core JAVA', 'Backtracking', 'Recursion', 'Stack'],
    taskManging : ['Core JAVA', 'Nested Linked List', 'ArrayList'],
    compileStorm : ['React', 'JavaScript', 'Zod', 'JWT', 'Node.js', 'Express', 'Mongoose', 'MongoDB', 'TailwindCSS', 'Monaco Editor'],
    pomofocus : ['React', 'TailwindCSS']
  }

  return (
    <div className={`${workSans.className} relative h-screen w-screen overflow-x-hidden overflow-y-hidden hide-scrollbar`} ref={scrollPageRef}>
      {/* SideNav is nested here because nothing on scrollPageRef itself applies a
          transform/filter/perspective; if that ever changes, move SideNav to render
          as a sibling instead so its `fixed` positioning stays viewport-relative. */}
      <SideNav scrollerRef={scrollPageRef} visible={introDone} />

      {/* intro section */}
      <div id="home" className="h-screen page-section" ref={containerRef}>

        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-end overflow-y-hidden overflow-x-hidden pointer-events-none intro-page">
          
          {/*w-[480px] h-[650px]*/}
          <img id="intro_image" src={"/image/image.webp"} fetchPriority="high" className="light-lift max-h-[400px] lg:max-h-[72vh] absolute z-2 opacity-1 overflow-x-hidden intro-page-content" alt="intro_image"/>
          
{/* <div id="intro_oval_shape" className="absolute lg:w-[530px] lg:h-[700px] w-[255px] h-[390px] bg-primary rounded-[60%/60%_60%_60%_60%] rotate-325 z-0 opacity-1 translate-y-[20px] overflow-x-hidden intro-page-content"/> */}

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
              I&#39;m a <span id="last_animation_highlight" className="">full-stack developer</span> specializing in building modern, scalable web applications.
            </p>

            <div id="button_last_animation" className="flex flex-wrap w-full justify-center items-center sm:gap-6 xs:gap-2 opacity-0">
              <Button href="/resume/RaunakResume-2.pdf" download="RaunakResume.pdf" label="Resume" hoverColor="var(--color-primary)" className="lg:text-[20px] sm:text-[16px] xs:text-[12px] px-6 py-1 [--btn-fg-hover:white]"/>
              <Button href="#work" label="View My Work" hoverColor="var(--color-primary)" className="lg:text-[20px] sm:text-[16px] xs:text-[12px] px-6 py-1 [--btn-fg-hover:white]"/>
            </div>
          </div>
        </div>

      </div>
      
      <div id="skill-parent" className="page-section text-fortext flex flex-col justify-center items-center md:gap-10 xs:gap-4 xs:h-fit md:h-screen z-0">
        
        {/* Heading */}
        <div className={`${sora.className} md:text-[50px] text-[30px] md:mt-[0px] xs:mt-[60px] px-6 text-center`}>What I Bring To The Table</div>

        {/* content (temporary hard-coded) */}
        <div className="flex md:flex-row flex-col md:max-h-[70vh] xs:max-h-[80vh] xs:p-8 md:p-0">
          <div className="flex flex-col flex-wrap gap-4">
            <div className="skill-box md:max-w-[30vw]">
              <div className={`${sora.className} lg:text-[30px] xs:text-[16px]`}>Problem Solving & DSA</div>
              <div  className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Leetcode : 450+ Questions</div>
              </div>
            </div>

            <div className="skill-box md:max-w-[30vw]">
              <div className={`${sora.className} lg:text-[30px] xs:text-[16px]`} >Languages</div>
              <div  className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">JavaScript</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">TypeScript</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Java</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Python</div>
              </div>
            </div>

            <div className="skill-box md:max-w-[30vw]">
              <div className={`${sora.className} lg:text-[30px] xs:text-[16px]`}>Frontend</div>
              <div className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">React.js</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Next.js</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">TailwindCSS</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">GSAP</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Figma</div>
              </div>
            </div>

            <div className="skill-box md:max-w-[30vw]">
              <div className={`${sora.className} lg:text-[30px] xs:text-[16px]`}>Backend</div>
              <div  className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Node.js</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Next.js</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Web Sockets</div>
              </div>
            </div>

            <div className="skill-box md:max-w-[30vw]">
              <div className={`${sora.className} lg:text-[30px] xs:text-[16px]`}>Database</div>
              <div  className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">PostgreSQL</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">MongoDB</div>
              </div>
            </div>

            <div className="skill-box md:max-w-[30vw]">
              <div className={`${sora.className} lg:text-[30px] xs:text-[16px]`}>Machine Learning</div>
              <div  className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">EDA (Exploratory Data Analysis)</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">SQL</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Supervised Learning</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Unsupervised Learning</div>
              </div>
            </div>

            <div className="skill-box lg:max-w-[30vw]">
              <div className={`${sora.className} lg:text-[30px] xs:text-[16px]`}>Version Control</div>
              <div  className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Git & Github</div>
              </div>
            </div>
          </div>
        </div>

        {/* also show leetcode profile in a window maybe */}
      </div>
      <div id="work" className="h-fit page-section xs:mt-[75vh] md:mt-[10vh] text-fortext flex flex-col gap-10 z-0">
        <div className={`${sora.className} md:text-[50px] text-[30px] md:mt-[0px] xs:mt-[60px] px-6 text-center`}>What I Have Built</div>

        <div className="flex flex-col justify-center items-center gap-5">
          <div className="projectDiv md:w-[50vw] max-w-[80vw]">
            <div className={`${sora.className} text-[25px]`}>Locked In</div>
            <div className="text-[14px]">
              Locked In is a productivity web app that helps you stay focused and track your habits, tasks, and progress all in one place.
            </div>
            <div className="flex flex-wrap gap-1">
              {projectTechStack.lockedIn.map((tech)=>{
                return <div key={tech} className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl text-[12px]">
                  {tech}
                </div>
              })}
            </div>
            <div className="text-[12px] flex gap-1">
              <Button href="https://github.com/Raunakaga2004/LockedIn" icon={<Github/>} label="GitHub" color="var(--color-projectDiv)" hoverColor="var(--color-primary)" className="mt-4 px-2 py-1 rounded-4xl w-fit [--btn-bg-h:transparent] [--btn-fg-hover:var(--color-fortext)]"/>
            </div>
          </div>

          <div  className="projectDiv md:w-[50vw] max-w-[80vw]">
            <div className={`${sora.className} text-[25px]`}>Portfolio</div>
            <div className="text-[14px]">
              It is a personal website that showcases my work, skills, and projects, with a private admin panel to update content and track performance.
            </div>
            <div className="flex flex-wrap gap-1">
              {projectTechStack.portfolio.map((tech)=>{
                return <div key={tech} className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl text-[12px]">
                  {tech}
                </div>
              })}
            </div>
            <div className="text-[12px] flex gap-1">
              <Button href="https://github.com/Raunakaga2004/Portfolio" icon={<Github/>} label="GitHub" color="var(--color-projectDiv)" hoverColor="var(--color-primary)" className="mt-4 px-2 py-1 rounded-4xl w-fit [--btn-bg-h:transparent] [--btn-fg-hover:var(--color-fortext)]"/>

              <Button href="https://portfolio-mu-smoky-91.vercel.app/" icon={<Live/>} label="Live Link" color="var(--color-projectDiv)" hoverColor="var(--color-primary)" className="mt-4 px-2 py-1 rounded-4xl w-fit [--btn-bg-h:transparent] [--btn-fg-hover:var(--color-fortext)]"/>
            </div>
          </div>

          <div  className="projectDiv md:w-[50vw] max-w-[80vw]">
            <div className={`${sora.className} text-[25px]`}>Sudoku Game</div>
            <div className="text-[14px]">
              It is a console-based game that lets users play Sudoku at different difficulty levels, use pencil marks, and view solutions.
            </div>
            <div className="flex flex-wrap gap-1">
              {projectTechStack.sudokuGame.map((tech)=>{
                return <div key={tech} className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl text-[12px]">
                  {tech}
                </div>
              })}
            </div>
            <div className="text-[12px] flex gap-1">
              <Button href="https://github.com/Raunakaga2004/Sudoku-Game" icon={<Github/>} label="GitHub" color="var(--color-projectDiv)" hoverColor="var(--color-primary)" className="mt-4 px-2 py-1 rounded-4xl w-fit [--btn-bg-h:transparent] [--btn-fg-hover:var(--color-fortext)]"/>
            </div>
          </div>

          <div className="projectDiv md:w-[50vw] max-w-[80vw]">
            <div className={`${sora.className} text-[25px]`}>Advance Task Managing</div>
            <div className="text-[14px]">
              It is a console-based app that lets users manage complex tasks with unlimited nested subtasks using a linked list structure.
            </div>
            <div className="flex flex-wrap gap-1">
              {projectTechStack.taskManging.map((tech)=>{
                return <div key={tech} className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl text-[12px]">
                  {tech}
                </div>
              })}
            </div>
            <div className="text-[12px] flex gap-1">
              <Button href="https://github.com/Raunakaga2004/to-do-list-with-subtasks-features" icon={<Github/>} label="GitHub" color="var(--color-projectDiv)" hoverColor="var(--color-primary)" className="mt-4 px-2 py-1 rounded-4xl w-fit [--btn-bg-h:transparent] [--btn-fg-hover:var(--color-fortext)]"/>
            </div>
          </div>

          <div className="projectDiv hover-area md:w-[50vw] max-w-[80vw]">
            <div className={`${sora.className} text-[25px]`}>Compile Storm</div>
            <div className="text-[14px]">
              Compile Storm is an online code editor that lets you write, run, and test code in multiple programming languages like Java, C, C++, and Python all in one place.
            </div>
           <div className="flex flex-wrap gap-1">
              {projectTechStack.compileStorm.map((tech)=>{
                return <div key={tech} className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl text-[12px]">
                  {tech}
                </div>
              })}
            </div>
            <div className="text-[12px] flex gap-1">
              <Button href="https://github.com/Raunakaga2004/CompileStorm" icon={<Github/>} label="GitHub" color="var(--color-projectDiv)" hoverColor="var(--color-primary)" className="mt-4 px-2 py-1 rounded-4xl w-fit [--btn-bg-h:transparent] [--btn-fg-hover:var(--color-fortext)]"/>

              <Button href="https://compilestorm-frontend.netlify.app/" icon={<Live/>} label="Live Link" color="var(--color-projectDiv)" hoverColor="var(--color-primary)" className="mt-4 px-2 py-1 rounded-4xl w-fit [--btn-bg-h:transparent] [--btn-fg-hover:var(--color-fortext)]"/>
            </div>
          </div>
          {/* <img src={"/image/projects/compileStorm.png"} className="hover-image"/> */}

          <div className="projectDiv md:w-[50vw] max-w-[80vw]">
            <div className={`${sora.className} text-[25px]`}>PomoFocus</div>
            <div className="text-[14px]">
              It is a simple and minimalist productivity web app based on the Pomodoro technique that helps users stay focused by working in timed sessions with regular breaks.
            </div>
            <div className="flex flex-wrap gap-1">
              {projectTechStack.pomofocus.map((tech)=>{
                return <div key={tech} className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl text-[12px]">
                  {tech}
                </div>
              })}
            </div>
            <div className="text-[12px] flex gap-1">
              <Button href="https://github.com/Raunakaga2004/PomoFocus" icon={<Github/>} label="GitHub" color="var(--color-projectDiv)" hoverColor="var(--color-primary)" className="mt-4 px-2 py-1 rounded-4xl w-fit [--btn-bg-h:transparent] [--btn-fg-hover:var(--color-fortext)]"/>

              <Button href="https://pomofocus-vxuz.onrender.com/" icon={<Live/>} label="Live Link" color="var(--color-projectDiv)" hoverColor="var(--color-primary)" className="mt-4 px-2 py-1 rounded-4xl w-fit [--btn-bg-h:transparent] [--btn-fg-hover:var(--color-fortext)]"/>
            </div>
          </div>
        </div>
      </div>

      <div id="experience" className="page-section h-screen text-fortext flex flex-col justify-center items-center">
        <div className={`${sora.className} md:text-[50px] text-[30px] px-6 text-center`}>Experience</div>
      </div>

      <div id="about" className="page-section text-fortext h-fit flex flex-col justify-center items-center xs:mt-[30vh] md:mt-[10vh]">
        {/* about me page */}
        <div className={`${sora.className} md:text-[50px] text-[30px] px-6 text-center`}>About Me</div>
        
        <div className=" flex md:flex-row flex-col-reverse justify-center items-center">
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="bg-[var(--color-primary)] md:w-[30vw] md:translate-x-[300px] z-0 p-[30px] px-[50px] rounded-lg">
               Hey, I&#39;m Raunak — a full-stack developer passionate about building tools that boost productivity and solve real problems. <br/> <br/>

              My journey began with a curiosity for how things work under the hood, which led me to explore everything from Java and web development to machine learning and system design. I enjoy taking on challenges that require both creative problem-solving and solid engineering. <br/> <br/> 

              When I&#39;m not coding, you&#39;ll probably find me working out, reading about brilliant minds like Turing or Ramanujan, or refining side projects that keep me sharp. <br/> <br/>

              Ready to connect? Just scroll down — I&#39;d be glad to hear from you. <br/><br/>
            </div>

            <Button href="mailto:raunakaga12@gmail.com" target="_blank" label="Hire Me" hoverColor="var(--color-primary)" className="md:translate-x-[300px] text-[20px] px-6 py-1 [--btn-fg-hover:white] xs:mx-4 md:mx-2"/>
          </div>

          <div className="z-1">
            <img src={"/image/whoami.webp"} className="light-lift overflow-x-hidden md:max-w-[800px] xs:max-w-[400px]" alt="who_am_i"/>
          </div>

        </div>
      </div>

      <div id="contact" className="page-section h-screen text-fortext flex flex-col justify-center items-center gap-6">
        <div className={`${sora.className} md:text-[50px] text-[30px] px-6 text-center`}>Contact Me</div>
        <Button href="mailto:raunakaga12@gmail.com" target="_blank" label="Email Me" hoverColor="var(--color-primary)" className="text-[20px] px-6 py-1 [--btn-fg-hover:white]"/>
      </div>

      <div className="bg-[var(--color-projectDiv)] w-screen h-fit py-2 text-center text-[var(--color-primary)] xs:mt-10 md:mt-0">Built By <div className="text-fortext text-[20px]">Raunak Agarwal</div></div>

      {/* <div className="page-section text-white h-fit">

        <div>
          Lets Build Something Together
        </div>
      </div> */}

      {/* <div className="page-section h-screen text-white">
        projects section
      </div>

      <div className="page-section h-screen text-white">
        contact section
      </div>

      <div className="page-section h-screen text-white">
        footer section
      </div> */}
    </div>
  );
}

{/* {[...allSkills.entries()].map(([key, value]) => (
          <div key={key}>
            <div>{key}</div>
            {value.map((skill)=> (
              <div key={skill.id}>
                {skill.name}
              </div>
            ))}
          </div>
        ))} */}