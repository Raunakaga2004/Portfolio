import { forwardRef } from "react";
import { qwigley, poppins } from "@/utils/font";

const IntroSection = forwardRef<HTMLDivElement>(function IntroSection(_props, ref) {
  return (
    <div className="h-screen page-section" ref={ref}>

      <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-end overflow-y-hidden overflow-x-hidden intro-page">

        <img id="intro_image" src={"/image/image.png"} className="max-h-[400px] lg:max-h-[72vh] absolute z-2 opacity-1 overflow-x-hidden intro-page-content" alt="intro_image" />

        <div id="intro_oval_shape" className="absolute lg:w-[55vh] lg:h-[80vh] w-[38vh] h-[55vh] bg-primary rounded-[60%/60%_60%_60%_60%] rotate-325 z-0 opacity-1 lg:translate-y-[10vh] translate-y-[7vh] overflow-x-hidden intro-page-content" />

        {/* Name text */}
        <div id="logo_name" className={`${qwigley.className} absolute flex flex-col h-screen w-screen justify-center items-center z-1 -translate-y-[500px] opacity-0 pointer-events-none`}>
          <div id="logo_raunak_name" className="text-fortext lg:text-[30vh] xs:text-[96px] lg:-translate-y-[6vw] rotate-[350.6deg]">Raunak</div>
          <div id="logo_agarwal_name" className="text-secondary lg:text-[25vh] xs:text-[80px] lg:-translate-y-[19vw] xs:-translate-y-[80px] rotate-[349.2deg]">Agarwal</div>
        </div>
      </div>

      {/* Intro text */}
      <div id="intro_section" className={`${poppins.className} h-screen w-screen absolute top-0 left-0 text-fortext flex flex-col gap-[30px] justify-center items-center z-4 text-center text-wrap lg:translate-x-[210px] lg:translate-y-[90px] xs:-translate-y-[8vh] opacity-0 overflow-x-hidden intro-page-content`}>
        <p id="intro_text" className="lg:max-w-[700px] sm:max-w-[350px] xs:max-w-[300px] lg:text-[3.2vh] sm:text-[20px] xs:text-[16px]">
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
  );
});

export default IntroSection;
