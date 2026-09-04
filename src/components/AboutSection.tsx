export default function AboutSection() {
  return (
    <div className="page-section text-white h-fit flex flex-col justify-center items-center px-[10vw] xs:mt-[30vh] md:mt-[10vh]">
      {/* about me page */}
      <div className="md:text-[50px] text-[30px] px-6 text-center">About Me</div>

      <div className=" flex md:flex-row flex-col-reverse justify-center items-center">
        <div className="flex flex-col justify-center items-start gap-4">
          <div className="bg-[var(--color-primary)] md:w-[clamp(260px,32vw,420px)] md:translate-x-[clamp(0px,12vw,300px)] z-0 p-[30px] px-[50px] rounded-lg">
            Hey, I&#39;m Raunak — a full-stack developer passionate about building tools that boost productivity and solve real problems. <br /> <br />

            My journey began with a curiosity for how things work under the hood, which led me to explore everything from Java and web development to machine learning and system design. I enjoy taking on challenges that require both creative problem-solving and solid engineering. <br /> <br />

            When I&#39;m not coding, you&#39;ll probably find me working out, reading about brilliant minds like Turing or Ramanujan, or refining side projects that keep me sharp. <br /> <br />

            Ready to connect? Just scroll down — I&#39;d be glad to hear from you. <br /><br />
          </div>

          <a href="mailto:raunakaga12@gmail.com" target="_blank" className="md:translate-x-[clamp(0px,12vw,300px)] border text-[20px] border-[var(--color-primary)] px-6 py-1 rounded-xl text-center hover:bg-[var(--color-secondary)] hover:border-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:font-semibold xs:mx-4 md:mx-2">
            <button>Hire Me</button>
          </a>
        </div>

        <div className="z-1">
          <img src={"/image/whoami.png"} className=" overflow-x-hidden md:max-w-[clamp(280px,45vw,800px)] xs:max-w-[400px]" alt="who_am_i" />
        </div>

      </div>

      <div className="bg-[var(--color-projectDiv)] w-screen h-fit py-2 text-center text-[var(--color-primary)] xs:mt-10 md:mt-0">Built By <div className="text-white text-[20px]">Raunak Agarwal</div></div>
    </div>
  );
}
