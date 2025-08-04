"use client";

import Github from "@/components/icons/Github";
// main portfolio website 

// import Logo from "@/components/Logo";
import { qwigley } from "@/utils/font";
import { poppins } from "@/utils/font";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";

import { useRef } from "react";
import Live from "@/components/icons/Live";
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
      // isSmallMobile: `(min-width: 320px)`,
      // reduceMotion: "(prefers-reduced-motion: reduce)",
    }, (context: gsap.Context & { conditions? : gsap.Conditions})=>{
      const isLaptop = context.conditions?.isLaptop;
      
      if(logo && i == 0){
        // set the timeline value of logo first
        gsap.to(logo,{
          scale : isLaptop ? 0.2 : 0.3,
          top : isLaptop ? -350  : -80,
          left : isLaptop ? -300 : -140,
          zIndex : 10,
          smooth : true,
          scrollTrigger : {
            trigger : section,
            scroller : containerElement,
            start : 'top top',
            scrub : true,
            snap : {
              snapTo : 1,
              duration : {
                min : 0.4,
                max : 0.6,
              },
              directional : true,
              ease : 'power1.inOut',
            }
          },
        })
        gsap.to(".intro-page-content", {
          filter : 'blur(10px)',
          smooth : true,
          scrollTrigger : {
            trigger : section,
            scroller : containerElement,
            start : 'top top',
            scrub : true,
            snap : {
              snapTo : 1,
              duration : {
                min : 0.4,
                max : 0.6,
              },
              directional : true,
              ease : 'power1.inOut',
            }
          },
        })

        gsap.timeline({
          smooth : true,
          scrollTrigger : {
            trigger : '#offer-parent',
            scroller : containerElement,
            start : '30% bottom',
            end : 'bottom bottom',
            scrub : true,
            // snap : {
            //   snapTo : 1,
            //   duration : {
            //     min : 0.4,
            //     max : 0.6,
            //   },
            //   directional : true,
            //   ease : 'power1.inOut',
            // }
          }
        })
        .to('#offer-heading', {
          opacity : 1,
          ease : 'power1.in',
        }, 0)
        .to('#offer-div-left', {
          x : 0,
          ease : 'power1.in'
        }, 0)
        .to('#offer-div-right', {
          x : 0,
          ease : 'power1.in'
        }, 0)
      }

      gsap.timeline({
        smooth : true,
        scrollTrigger : {
          trigger : '#skill-parent',
          scroller : containerElement,
          start : 'top bottom',
          end : 'bottom bottom',
          scrub : true,
          markers : true,
          snap : {
            snapTo : 1,
            duration : {
              min : 0.4,
              max : 0.6,
            },
            directional : true,
            ease : 'power1.inOut',
          }
        }
      })
      .to('#offer-div-left', {
        x : '-60vw',
        ease : 'power1.out'
      }, 0)
      .to('#offer-div-right', {
        x : '60vw',
        ease : 'power1.out'
      }, 0)
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
      // isSmallMobile: `(min-width: 320px)`,
      // reduceMotion: "(prefers-reduced-motion: reduce)",
    }, (context: gsap.Context & { conditions? : gsap.Conditions})=>{
      const isLaptop = context.conditions?.isLaptop;

      // 190 px image and oval to the left
      timelineRef.current?.to('#intro_oval_shape', {
        scale : 1,
        duration : 0.5,
        opacity : 1,
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
        y : "-20px",
        duration : 0.8,
        opacity : 1,
        ease : "power1.inOut"
      }, 0)

      timelineRef.current?.to('#logo_name', {
        scale : 1,
        y : isLaptop ? "-20px" : "-35vh",
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
        x : isLaptop ? "-190px" : "",
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
    <div className={`${poppins.className} relative h-screen w-screen overflow-x-hidden overflow-y-hidden hide-scrollbar`} ref={scrollPageRef}>
      {/* intro section */}
      <div className="h-screen page-section" ref={containerRef}>

        <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-end overflow-y-hidden overflow-x-hidden intro-page">
          
          {/*w-[480px] h-[650px]*/}
          <img id="intro_image" src={"/image/image.png"} className="max-h-[400px] lg:max-h-[700px] absolute z-2 opacity-1 overflow-x-hidden intro-page-content" alt="intro_image"/>
          
          <div id="intro_oval_shape" className="absolute lg:w-[530px] lg:h-[700px] w-[255px] h-[390px] bg-primary rounded-[60%/60%_60%_60%_60%] rotate-325 z-0 opacity-1 translate-y-[20px] overflow-x-hidden intro-page-content"/>

          {/* Name text */}
          <div id="logo_name" className={`${qwigley.className} absolute flex flex-col h-screen w-screen justify-center items-center z-1 -translate-y-[500px] opacity-0 pointer-events-none`}>
            <div id="logo_raunak_name" className="text-fortext lg:text-[300px] xs:text-[96px] lg:-translate-y-[110px] rotate-[350.6deg]">Raunak</div>
            <div id="logo_agarwal_name" className="text-secondary lg:text-[250px] xs:text-[80px] lg:-translate-y-[360px] xs:-translate-y-[80px] rotate-[349.2deg]">Agarwal</div>
          </div>
        </div>

        {/* Intro text */}
        <div id="intro_section" className={`${poppins.className} h-screen w-screen absolute top-0 left-0 text-fortext flex flex-col gap-[30px] justify-center items-center z-4 text-center text-wrap lg:translate-x-[210px] lg:translate-y-[90px] xs:-translate-y-[8vh] opacity-0 overflow-x-hidden intro-page-content`}>
          <p id="intro_text" className="lg:max-w-[700px] sm:max-w-[350px] xs:max-w-[300px] lg:text-[32px] sm:text-[20px] xs:text-[16px]">
            I&#39;m a <span id="last_animation_highlight" className="">full-stack developer</span> specializing in building modern, scalable web applications.
          </p>

          <div id="button_last_animation" className="flex justify-center items-center sm:gap-6 xs:gap-2 opacity-0">
            <a href="/resume/RaunakResume-2.pdf" download="RaunakResume.pdf">
            <button className="lg:text-[20px] sm:text-[16px] xs:text-[12px] border md:hover:bg-secondary px-6 py-1 rounded-md md:hover:text-primary md:hover:font-semibold md:hover:border-secondary">Resume</button>
            </a>
            <a href="#work">
            <button className="lg:text-[20px] sm:text-[16px] xs:text-[12px] border md:hover:bg-secondary px-6 py-1 rounded-md md:hover:text-primary md:hover:font-semibold md:hover:border-secondary">View My Work</button>
            </a>
          </div>
        </div>
        
      </div>
      
      <div id="offer-parent" className="page-section h-screen text-white flex flex-col justify-center items-center md:gap-[10vh] xs:gap-[4vh] ">
      {/* <div className="absolute z-1 h-screen w-screen flex justify-center items-center">
        <div className="h-full w-0 border border-red-500"></div>

        <div className="absolute left-[15%] h-full w-0 border border-red-500"></div>

        <div className="absolute right-[15%] h-full w-0 border border-red-500"></div>
      </div> */}

        <div id="offer-heading" className="sm:text-[30px] xs:text-[20px] lg:text-[50px] opacity-0 xs:translate-y-[20px] md:translate-y-[0px]">How I Can Help</div>

        <div className="flex flex-col md:flex-row justify-center items-center md:gap-[5vw] gap-[1vh]">
          <div id="offer-div-left" className="-translate-x-[60vw] md:max-w-[400px] max-w-[350px] md:min-h-[68vh] xs:max-h-[36vh] rounded-md bg-primary offer-div md:p-5 p-2 text-center text">
            <div className="md:text-[30px] xs:text-[20px] font-semibold">
              For Clients
            </div>
            <div className="md:text-[20px] xs:text-[12px] mb-[8px] md:mb-[28px] mt-[8px] md:mt-[12px]">
              I collaborate with clients to turn ideas into fast, scalable, and appealing products.
            </div>
            <div className="md:text-[20px] xs:text-[12px] text-left px-5">
              💡 Custom Web Apps <div className="pl-5 text-[10px] pb-2 md:text-[16px]">Full-stack solutions tailored to your goals</div>
              ⚡ Responsive Design <div className="pl-5 text-[10px] pb-2 md:text-[16px]">Optimized for all devices</div>
              🔍 SEO & Speed <div className="pl-5 text-[10px] pb-2 md:text-[16px]">Fast load times, search-friendly</div>
              🧱 Modular Codebase <div className="pl-5 text-[10px] pb-2 md:text-[16px]">Easy to scale and maintain</div>
              🤝 Clear Communication <div className="pl-5 text-[10px] pb-2 md:text-[16px]">Regular updates and feedback</div>
            </div>
          </div>
          <div id="offer-div-right" className="translate-x-[60vw] md:max-w-[400px] max-w-[350px] md:max-h-[80vh] md:min-h-[68vh] xs:max-h-[36vh] rounded-md bg-primary offer-div text-center p-2 md:p-5">
            <div className="md:text-[30px] xs:text-[20px] font-semibold">
              For Hiring Team
            </div>
            <div className="md:text-[20px] xs:text-[12px] mb-[8px] mt-[8px] md:mt-[12px] md:mb-[28px]">
              I strive to work closely with my team, contributing honestly and supporting shared goals.
            </div>
            <div className="md:text-[20px] xs:text-[12px] text-left px-5">
              🧠 Strong Core Skills<div className="pl-5 text-[10px] pb-2 md:text-[16px]">DSA + full-stack development</div>
              ✍️ Clean Code <div className="pl-5 text-[10px] pb-2 md:text-[16px]">Focused on quality and maintainability</div>
              🚀 Ownership<div className="pl-5 text-[10px] pb-2 md:text-[16px]">Proactive and solution-driven</div>
              🤝 Team Player<div className="pl-5 text-[10px] pb-2 md:text-[16px]">Open to feedback, collaborative</div>
            </div>
          </div>
        </div>
      </div>

      <div id="skill-parent" className="page-section text-white flex flex-col justify-center items-center md:gap-10 xs:gap-4 xs:h-fit md:h-screen">
        
        {/* Heading */}
        <div className="md:text-[50px] text-[30px] md:mt-[0px] xs:mt-[60px] px-6 text-center">What I Bring To The Table</div>

        {/* content (temporary hard-coded) */}
        <div className="flex md:flex-row flex-col md:max-h-[70vh] xs:max-h-[80vh] xs:p-8 md:p-0">
          <div className="flex flex-col flex-wrap gap-4">
            <div className="skill-box md:max-w-[30vw]">
              <div className="lg:text-[30px] xs:text-[16px]">Problem Solving & DSA</div>
              <div  className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Leetcode : 450+ Questions</div>
              </div>
            </div>

            <div className="skill-box md:max-w-[30vw]">
              <div className="lg:text-[30px] xs:text-[16px]" >Languages</div>
              <div  className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">JavaScript</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">TypeScript</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Java</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Python</div>
              </div>
            </div>

            <div className="skill-box md:max-w-[30vw]">
              <div className="lg:text-[30px] xs:text-[16px]]">Frontend</div>
              <div className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">React.js</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Next.js</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">TailwindCSS</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">GSAP</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Figma</div>
              </div>
            </div>

            <div className="skill-box md:max-w-[30vw]">
              <div className="lg:text-[30px] xs:text-[16px]">Backend</div>
              <div  className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Node.js</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Next.js</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Web Sockets</div>
              </div>
            </div>

            <div className="skill-box md:max-w-[30vw]">
              <div className="lg:text-[30px] xs:text-[16px]">Database</div>
              <div  className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">PostgreSQL</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">MongoDB</div>
              </div>
            </div>

            <div className="skill-box md:max-w-[30vw]">
              <div className="lg:text-[30px] xs:text-[16px]">Machine Learning</div>
              <div  className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">EDA (Exploratory Data Analysis)</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">SQL</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Supervised Learning</div>
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Unsupervised Learning</div>
              </div>
            </div>

            <div className="skill-box lg:max-w-[30vw]">
              <div className="lg:text-[30px] xs:text-[16px]">Version Control</div>
              <div  className="skill-box-content">
                <div className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">Git & Github</div>
              </div>
            </div>
          </div>
        </div>

        {/* also show leetcode profile in a window maybe */}
      </div>
      <div id="work" className="h-fit page-section xs:mt-[40vh] md:mt-[10vh] text-white flex flex-col gap-10">
        <div className="md:text-[50px] text-[30px] md:mt-[0px] xs:mt-[60px] px-6 text-center">What I Have Built</div>

        <div className="flex flex-col justify-center items-center gap-5">
          <div className="projectDiv md:w-[50vw] max-w-[80vw]">
            <div className="text-[25px]">Locked In</div>
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
              <a href="https://github.com/Raunakaga2004/LockedIn" className="flex flex-row items-center gap-1 mt-4 hover:border-[var(--color-primary)] px-2 py-1 rounded-4xl w-fit border border-[var(--color-projectDiv)]"><Github/> GitHub</a>
            </div>
          </div>

          <div  className="projectDiv md:w-[50vw] max-w-[80vw]">
            <div className="text-[25px]">Portfolio</div>
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
              <a href="https://github.com/Raunakaga2004/Portfolio" className="flex flex-row items-center gap-1 mt-4 hover:border-[var(--color-primary)] px-2 py-1 rounded-4xl w-fit border border-[var(--color-projectDiv)]"><Github/> GitHub</a>
            </div>
          </div>

          <div  className="projectDiv md:w-[50vw] max-w-[80vw]">
            <div className="text-[25px]">Sudoku Game</div>
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
              <a href="https://github.com/Raunakaga2004/Sudoku-Game" className="flex flex-row items-center gap-1 mt-4 hover:border-[var(--color-primary)] px-2 py-1 rounded-4xl w-fit border border-[var(--color-projectDiv)]"><Github/> GitHub</a>
            </div>
          </div>

          <div className="projectDiv md:w-[50vw] max-w-[80vw]">
            <div className="text-[25px]">Advance Task Managing</div>
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
              <a href="https://github.com/Raunakaga2004/to-do-list-with-subtasks-features" className="flex flex-row items-center gap-1 mt-4 hover:border-[var(--color-primary)] px-2 py-1 rounded-4xl w-fit border border-[var(--color-projectDiv)]"><Github/> GitHub</a>
            </div>
          </div>

          <div className="projectDiv hover-area md:w-[50vw] max-w-[80vw]">
            <div className="text-[25px]">Compile Storm</div>
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
              <a href="https://github.com/Raunakaga2004/CompileStorm" className="flex flex-row items-center gap-1 mt-4 hover:border-[var(--color-primary)] px-2 py-1 rounded-4xl w-fit border border-[var(--color-projectDiv)]"><Github/> GitHub</a>

              <a href="https://compilestorm-frontend.netlify.app/" className="flex flex-row items-center gap-1 mt-4 hover:border-[var(--color-primary)] px-2 py-1 rounded-4xl w-fit border border-[var(--color-projectDiv)]"><Live/> Live Link</a>
            </div>
          </div>
          {/* <img src={"/image/projects/compileStorm.png"} className="hover-image"/> */}

          <div className="projectDiv md:w-[50vw] max-w-[80vw]">
            <div className="text-[25px]">PomoFocus</div>
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
              <a href="https://github.com/Raunakaga2004/PomoFocus" className="flex flex-row items-center gap-1 mt-4 hover:border-[var(--color-primary)] px-2 py-1 rounded-4xl w-fit border border-[var(--color-projectDiv)]"><Github/> GitHub</a>

              <a href="https://pomofocus-vxuz.onrender.com/" className="flex flex-row items-center gap-1 mt-4 hover:border-[var(--color-primary)] px-2 py-1 rounded-4xl w-fit border border-[var(--color-projectDiv)]"><Live/> Live Link</a>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section text-white h-fit flex flex-col justify-center items-center px-[10vw] xs:mt-[30vh] md:mt-[10vh]">
        {/* about me page */}
        <div className="md:text-[50px] text-[30px] px-6 text-center">About Me</div>
        
        <div className=" flex md:flex-row flex-col-reverse justify-center items-center">
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="bg-[var(--color-primary)] md:w-[30vw] md:translate-x-[300px] z-0 p-[30px] px-[50px] rounded-lg">
               Hey, I&#39;m Raunak — a full-stack developer passionate about building tools that boost productivity and solve real problems. <br/> <br/>

              My journey began with a curiosity for how things work under the hood, which led me to explore everything from Java and web development to machine learning and system design. I enjoy taking on challenges that require both creative problem-solving and solid engineering. <br/> <br/> 

              When I&#39;m not coding, you&#39;ll probably find me working out, reading about brilliant minds like Turing or Ramanujan, or refining side projects that keep me sharp. <br/> <br/>

              Ready to connect? Just scroll down — I&#39;d be glad to hear from you. <br/><br/>
            </div>

            <a href="mailto:raunakaga12@gmail.com" target="_blank" className="md:translate-x-[300px] border text-[20px] border-[var(--color-primary)] px-6 py-1 rounded-xl text-center hover:bg-[var(--color-secondary)] hover:border-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:font-semibold mx-2">
              <button>Hire Me</button>
            </a>
          </div>

          <div className="z-1">
            <img src={"/image/whoami.png"} className=" overflow-x-hidden md:max-w-[800px] xs:max-w-[400px]" alt="who_am_i"/>
          </div>

        </div>

        <div className="bg-[var(--color-projectDiv)] w-screen h-full py-2 text-center text-[var(--color-primary)] mt-10">Built By <div className="text-white">Raunak Agarwal</div></div>
      </div>

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