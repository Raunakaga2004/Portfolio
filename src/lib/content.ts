import { z } from "zod";

// Shared by the homepage, admin forms and server actions — keep this client-safe (no DB imports).

const text = z.string().trim().min(1, "Required");
const optUrl = z.union([z.literal(""), z.url("Must be a valid URL")]);
const linkOrPath = z.string().trim().min(1, "Required").refine(
  (v) => v.startsWith("/") || v.startsWith("#") || z.url().safeParse(v).success,
  "Must be a URL or a path starting with /",
);
const imageKey = z.string().regex(/^images\/[\w-]+\.\w+$/).optional();
const tags = z.array(text);

export const sectionSchemas = {
  home: z.object({
    introPrefix: z.string(),
    highlight: text,
    introSuffix: z.string(),
    resumeUrl: linkOrPath,
    imageKey,
  }),
  skills: z.object({
    visible: z.boolean(),
    heading: text,
    groups: z.array(z.object({ title: text, visible: z.boolean(), items: tags })),
  }),
  work: z.object({
    visible: z.boolean(),
    heading: text,
    projects: z.array(
      z.object({
        title: text,
        description: text,
        tech: tags,
        githubUrl: optUrl,
        liveUrl: optUrl,
        imageKey,
        visible: z.boolean(),
      }),
    ),
  }),
  experience: z.object({
    visible: z.boolean(),
    heading: text,
    items: z.array(
      z.object({
        role: text,
        company: text,
        start: text,
        end: z.string(), // "" = Present
        description: z.string(),
        visible: z.boolean(),
      }),
    ),
  }),
  about: z.object({
    visible: z.boolean(),
    heading: text,
    paragraphs: z.array(text),
    ctaLabel: text,
    email: z.email(),
  }),
  contact: z.object({
    visible: z.boolean(),
    heading: text,
    buttonLabel: text,
    email: z.email(),
  }),
};

export type SectionKey = keyof typeof sectionSchemas;
export const SECTION_KEYS = Object.keys(sectionSchemas) as SectionKey[];
export type Content = { [K in SectionKey]: z.infer<(typeof sectionSchemas)[K]> };

// DOM ids used by the homepage / SideNav for each section.
export const SECTION_IDS: Record<SectionKey, string> = {
  home: "home",
  skills: "skill-parent",
  work: "work",
  experience: "experience",
  about: "about",
  contact: "contact",
};

export const imageUrl = (key: string) => `/api/assets/${key}`;

// Google Drive share links (…/file/d/ID/view, …/open?id=ID) open the viewer; rewrite them to a direct download.
export const resumeHref = (url: string) => {
  const id = url.includes("drive.google.com") && url.match(/\/d\/([\w-]+)|[?&]id=([\w-]+)/);
  return id ? `https://drive.google.com/uc?export=download&id=${id[1] ?? id[2]}` : url;
};

// Seed data + fallback: the content that used to be hardcoded in ClientWrapper.tsx.
export const DEFAULT_CONTENT: Content = {
  home: {
    introPrefix: "I'm a",
    highlight: "full-stack developer",
    introSuffix: "specializing in building modern, scalable web applications.",
    resumeUrl: "/resume/RaunakResume-2.pdf",
  },
  skills: {
    visible: true,
    heading: "What I Bring To The Table",
    groups: [
      { title: "Problem Solving & DSA", visible: true, items: ["Leetcode : 450+ Questions"] },
      { title: "Languages", visible: true, items: ["JavaScript", "TypeScript", "Java", "Python"] },
      { title: "Frontend", visible: true, items: ["React.js", "Next.js", "TailwindCSS", "GSAP", "Figma"] },
      { title: "Backend", visible: true, items: ["Node.js", "Next.js", "Web Sockets"] },
      { title: "Database", visible: true, items: ["PostgreSQL", "MongoDB"] },
      {
        title: "Machine Learning",
        visible: true,
        items: ["EDA (Exploratory Data Analysis)", "SQL", "Supervised Learning", "Unsupervised Learning"],
      },
      { title: "Version Control", visible: true, items: ["Git & Github"] },
    ],
  },
  work: {
    visible: true,
    heading: "What I Have Built",
    projects: [
      {
        title: "Locked In",
        description:
          "Locked In is a productivity web app that helps you stay focused and track your habits, tasks, and progress all in one place.",
        tech: ["React", "TypeScript", "Zod", "JWT", "Node.js", "Express", "Prisma", "PostgreSQL", "TailwindCSS"],
        githubUrl: "https://github.com/Raunakaga2004/LockedIn",
        liveUrl: "",
        visible: true,
      },
      {
        title: "Portfolio",
        description:
          "It is a personal website that showcases my work, skills, and projects, with a private admin panel to update content and track performance.",
        tech: ["Next.js", "TypeScript", "NextAuth", "Node.js", "TailwindCSS"],
        githubUrl: "https://github.com/Raunakaga2004/Portfolio",
        liveUrl: "https://portfolio-mu-smoky-91.vercel.app/",
        visible: true,
      },
      {
        title: "Sudoku Game",
        description:
          "It is a console-based game that lets users play Sudoku at different difficulty levels, use pencil marks, and view solutions.",
        tech: ["Core JAVA", "Backtracking", "Recursion", "Stack"],
        githubUrl: "https://github.com/Raunakaga2004/Sudoku-Game",
        liveUrl: "",
        visible: true,
      },
      {
        title: "Advance Task Managing",
        description:
          "It is a console-based app that lets users manage complex tasks with unlimited nested subtasks using a linked list structure.",
        tech: ["Core JAVA", "Nested Linked List", "ArrayList"],
        githubUrl: "https://github.com/Raunakaga2004/to-do-list-with-subtasks-features",
        liveUrl: "",
        visible: true,
      },
      {
        title: "Compile Storm",
        description:
          "Compile Storm is an online code editor that lets you write, run, and test code in multiple programming languages like Java, C, C++, and Python all in one place.",
        tech: ["React", "JavaScript", "Zod", "JWT", "Node.js", "Express", "Mongoose", "MongoDB", "TailwindCSS", "Monaco Editor"],
        githubUrl: "https://github.com/Raunakaga2004/CompileStorm",
        liveUrl: "https://compilestorm-frontend.netlify.app/",
        visible: true,
      },
      {
        title: "PomoFocus",
        description:
          "It is a simple and minimalist productivity web app based on the Pomodoro technique that helps users stay focused by working in timed sessions with regular breaks.",
        tech: ["React", "TailwindCSS"],
        githubUrl: "https://github.com/Raunakaga2004/PomoFocus",
        liveUrl: "https://pomofocus-vxuz.onrender.com/",
        visible: true,
      },
    ],
  },
  experience: {
    visible: true,
    heading: "Experience",
    items: [],
  },
  about: {
    visible: true,
    heading: "About Me",
    paragraphs: [
      "Hey, I'm Raunak — a full-stack developer passionate about building tools that boost productivity and solve real problems.",
      "My journey began with a curiosity for how things work under the hood, which led me to explore everything from Java and web development to machine learning and system design. I enjoy taking on challenges that require both creative problem-solving and solid engineering.",
      "When I'm not coding, you'll probably find me working out, reading about brilliant minds like Turing or Ramanujan, or refining side projects that keep me sharp.",
      "Ready to connect? Just scroll down — I'd be glad to hear from you.",
    ],
    ctaLabel: "Hire Me",
    email: "raunakaga12@gmail.com",
  },
  contact: {
    visible: true,
    heading: "Contact Me",
    buttonLabel: "Email Me",
    email: "raunakaga12@gmail.com",
  },
};
