"use client";

// main portfolio website 

// import Logo from "@/components/Logo";
import { qwigley } from "./layout";
import { poppins } from "./layout";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Home() {
  const containerRef = useRef(null); // Ref for the component's container
  const timelineRef = useRef<any>(null); // Ref to store the timeline instance
  const splitRef =  useRef<any>(null);

  useGSAP(()=>{
    timelineRef.current = gsap.timeline({
      defaults : {
        delay : 0,
        repeat : 0
      }
    })

    // 190 px image and oval to the left
    timelineRef.current.to('#intro_oval_shape', {
      scale : 1,
      // delay : 0.5,
      duration : 0.5,
      // y : "20px",
      opacity : 1,
      ease : "power1.inOut"
    }, 0)

    timelineRef.current.to('#intro_oval_shape', {
      scale : 0.8,
      x : "-190px",
      duration : 0.5,
      delay : 0.1,
      ease : "power1.inOut"
    }, 1)

    timelineRef.current.to('#logo_name', {
      scale : 1,
      y : "-20px",
      duration : 0.8,
      opacity : 1,
      ease : "power1.inOut"
    }, 0)

    timelineRef.current.to('#logo_name', {
      y : "-20px",
      x : "-250px",
      duration : 0.5,
      delay : 0.1,
      ease : "power1.inOut"
    }, 1)

    timelineRef.current.to('#intro_image', {
      scale : 1.2,
      opacity : 1,
      duration : 0.3,
      ease : "circ"
    }, 0)

    timelineRef.current.to('#intro_image', {
      scale : 1,
      x : "-190px",
      duration : 0.5,
      delay : 0.1,
      ease : "power1.inOut"
    }, 1)

    timelineRef.current.to('#intro_section', {
      opacity : 1,
      delay : 0.5,
      duration : 0.3,
      ease : "power1.inOut"
    }, 1)

    timelineRef.current.to('#button_last_animation', {
      opacity : 1,
      delay : 0.1,
      duration : 0.5,
      ease : "power1.inOut",
    }, 2)

    timelineRef.current.to('#last_animation_highlight', {
      backgroundColor : "var(--color-secondary)",
      color : "var(--color-primary)",
      delay : 0.1,
      duration : 0.4,
      ease : "power1.inOut",
    }, 2)

    // splitRef.current = new SplitText('#last_animation_highlight', {
    //   type : "chars"
    // })

  }, {
    scope : containerRef // scope helps to guardrail that uninted animations don't occur (although we don't need it as we are using selectors for each animation)
  })

  return (
    <div className="h-screen w-screen">
      {/* <div className="absolute z-1 h-screen w-screen flex justify-center items-center">
        <div className="h-full w-0 border border-red-500"></div>

        <div className="absolute left-[15%] h-full w-0 border border-red-500"></div>

        <div className="absolute right-[15%] h-full w-0 border border-red-500"></div>
      </div> */}
      {/* intro section */}
      <div className="h-screen z-0" ref={containerRef}>

        <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-end overflow-y-hidden">
          
          {/*w-[480px] h-[650px]*/}
          <img id="intro_image" src={"/image/image.png"} className="h-[700px] absolute z-2 opacity-1"/>
          
          <div id="intro_oval_shape" className="absolute w-[530px] h-[700px] bg-primary rounded-[60%/60%_60%_60%_60%] rotate-325 z-0 opacity-1 translate-y-[20px]"/>

          {/* Name text */}
          <div id="logo_name" className={`${qwigley.className} absolute flex flex-col h-screen w-screen justify-center items-center z-1 -translate-y-[500px] opacity-0`}>
            <div id="logo_raunak_name" className="text-fortext text-[300px] -translate-y-[110px] rotate-[350.6deg]">Raunak</div>
            <div id="logo_agarwal_name" className="text-secondary text-[250px] -translate-y-[350px] rotate-[349.2deg]">Agarwal</div>
          </div>
        </div>

        {/* Intro text */}
        <div id="intro_section" className={`${poppins.className} h-screen w-screen absolute top-0 left-0 text-fortext flex flex-col gap-[30px] justify-center items-center z-4 text-center text-wrap translate-x-[220px] translate-y-[90px] opacity-0`}>
          <p id="intro_text" className="max-w-[700px] text-[32px]">
            I'm a <span id="last_animation_highlight" className="">full-stack developer</span> specializing in building modern, scalable web applications.
          </p>

          <div id="button_last_animation" className="flex justify-center items-center gap-6 opacity-0">
            <a href="/resume/RaunakResume-2.pdf" download="RaunakResume.pdf">
            <button className="text-[20px] border hover:bg-secondary px-6 py-1 rounded-md hover:text-primary hover:font-semibold hover:border-secondary">Resume</button>
            </a>
            <button className="text-[20px] border hover:bg-secondary px-6 py-1 rounded-md hover:text-primary hover:font-semibold hover:border-secondary">View My Work</button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
