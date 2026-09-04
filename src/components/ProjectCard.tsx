import Github from "@/components/icons/Github";
import Live from "@/components/icons/Live";

type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  className?: string;
};

export default function ProjectCard({ title, description, tech, github, live, className }: ProjectCardProps) {
  return (
    <div className={`projectDiv md:w-[50vw] max-w-[80vw] ${className ?? ""}`}>
      <div className="text-[25px]">{title}</div>
      <div className="text-[14px]">{description}</div>
      <div className="flex flex-wrap gap-1">
        {tech.map((t) => (
          <div key={t} className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl text-[12px]">
            {t}
          </div>
        ))}
      </div>
      <div className="text-[12px] flex gap-1">
        <a href={github} className="flex flex-row items-center gap-1 mt-4 hover:border-[var(--color-primary)] px-2 py-1 rounded-4xl w-fit border border-[var(--color-projectDiv)]">
          <Github /> GitHub
        </a>
        {live && (
          <a href={live} className="flex flex-row items-center gap-1 mt-4 hover:border-[var(--color-primary)] px-2 py-1 rounded-4xl w-fit border border-[var(--color-projectDiv)]">
            <Live /> Live Link
          </a>
        )}
      </div>
    </div>
  );
}
