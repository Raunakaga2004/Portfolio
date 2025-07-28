"use server";

// main portfolio website 

import Logo from "@/components/Logo";

export default async function Home() {
  return (
    <div className="">
      <div className='w-screen flex flex-row'>
        <Logo/>
      </div>
      
      {/* Intro Section */}
      <div className="flex justify-center items-center">
        <img src={"/image/raunak.png"} className="h-[300px]"/>
        <div>
          <div>
            I'm a full-stack developer specializing in building modern, scalable web applications with technologies like Next.js, TypeScript, and PostgreSQL.
            Passionate about creating impactful digital experiences with clean code, intuitive UI, and powerful backend logic.
          </div>

          {/* CTA button */}
          <button>Resume</button>
          <button>View My Work</button>
          {/* <button>Hire me</button> */}
        </div>
      </div>

      {/* Who am I section */}
      <div className="flex justify-center items-center">
        <div>
          <div>
            Who Am I?
          </div>
          <div>
            Beyond code, I'm someone who thrives on curiosity, continuous learning, and building things that genuinely help people.
            I believe in disciplined execution, clean design, and using technology as a tool to solve real-world problems with impact.
          </div>
        </div>

        <img src={"/image/whoami.png"} className="h-[300px]"/>
      </div>

      {/* What do I offer */}
      <div>
        <div>
          <div>What Do I Offer?</div>
          <div>
            <div>for clients</div>
            <div>for hiring teams</div>
            <div>skills at glance</div>
          </div>
        </div>
        <div>
          {/* Grid section of icons */}
        </div>
      </div>

      {/* What have I built */}
      <div>
        <div>What have I Built</div>
      </div>

      {/* How to reach out */}
      <div>
        <div>How to Reach Out</div>
      </div>
    </div>
  );
}
