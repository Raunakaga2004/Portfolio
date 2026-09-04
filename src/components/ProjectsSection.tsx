import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Locked In",
    description: "Locked In is a productivity web app that helps you stay focused and track your habits, tasks, and progress all in one place.",
    tech: ["React", "TypeScript", "Zod", "JWT", "Node.js", "Express", "Prisma", "PostgreSQL", "TailwindCSS"],
    github: "https://github.com/Raunakaga2004/LockedIn",
  },
  {
    title: "Portfolio",
    description: "It is a personal website that showcases my work, skills, and projects, with a private admin panel to update content and track performance.",
    tech: ["Next.js", "TypeScript", "NextAuth", "Node.js", "TailwindCSS"],
    github: "https://github.com/Raunakaga2004/Portfolio",
    live: "https://portfolio-mu-smoky-91.vercel.app/",
  },
  {
    title: "Sudoku Game",
    description: "It is a console-based game that lets users play Sudoku at different difficulty levels, use pencil marks, and view solutions.",
    tech: ["Core JAVA", "Backtracking", "Recursion", "Stack"],
    github: "https://github.com/Raunakaga2004/Sudoku-Game",
  },
  {
    title: "Advance Task Managing",
    description: "It is a console-based app that lets users manage complex tasks with unlimited nested subtasks using a linked list structure.",
    tech: ["Core JAVA", "Nested Linked List", "ArrayList"],
    github: "https://github.com/Raunakaga2004/to-do-list-with-subtasks-features",
  },
  {
    title: "Compile Storm",
    description: "Compile Storm is an online code editor that lets you write, run, and test code in multiple programming languages like Java, C, C++, and Python all in one place.",
    tech: ["React", "JavaScript", "Zod", "JWT", "Node.js", "Express", "Mongoose", "MongoDB", "TailwindCSS", "Monaco Editor"],
    github: "https://github.com/Raunakaga2004/CompileStorm",
    live: "https://compilestorm-frontend.netlify.app/",
    className: "hover-area",
  },
  {
    title: "PomoFocus",
    description: "It is a simple and minimalist productivity web app based on the Pomodoro technique that helps users stay focused by working in timed sessions with regular breaks.",
    tech: ["React", "TailwindCSS"],
    github: "https://github.com/Raunakaga2004/PomoFocus",
    live: "https://pomofocus-vxuz.onrender.com/",
  },
];

export default function ProjectsSection() {
  return (
    <div id="work" className="h-fit page-section xs:mt-[75vh] md:mt-[10vh] text-white flex flex-col gap-10 z-0">
      <div className="md:text-[50px] text-[30px] md:mt-[0px] xs:mt-[60px] px-6 text-center">What I Have Built</div>

      <div className="flex flex-col justify-center items-center gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
