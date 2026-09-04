import SkillBox from "@/components/SkillBox";

const skillCategories = [
  { title: "Problem Solving & DSA", items: ["Leetcode : 450+ Questions"] },
  { title: "Languages", items: ["JavaScript", "TypeScript", "Java", "Python"] },
  { title: "Frontend", items: ["React.js", "Next.js", "TailwindCSS", "GSAP", "Figma"] },
  { title: "Backend", items: ["Node.js", "Next.js", "Web Sockets"] },
  { title: "Database", items: ["PostgreSQL", "MongoDB"] },
  { title: "Machine Learning", items: ["EDA (Exploratory Data Analysis)", "SQL", "Supervised Learning", "Unsupervised Learning"] },
  { title: "Version Control", items: ["Git & Github"] },
];

export default function SkillsSection() {
  return (
    <div id="skill-parent" className="page-section text-white flex flex-col justify-center items-center md:gap-10 xs:gap-4 xs:h-fit md:h-screen z-0">

      {/* Heading */}
      <div className="md:text-[50px] text-[30px] md:mt-[0px] xs:mt-[60px] px-6 text-center">What I Bring To The Table</div>

      {/* content (temporary hard-coded) */}
      <div className="flex md:flex-row flex-col md:max-h-[70vh] xs:max-h-[80vh] xs:p-8 md:p-0">
        <div className="flex flex-col flex-wrap gap-4">
          {skillCategories.map((category) => (
            <SkillBox key={category.title} title={category.title} items={category.items} />
          ))}
        </div>
      </div>
    </div>
  );
}
