type SkillBoxProps = {
  title: string;
  items: string[];
};

export default function SkillBox({ title, items }: SkillBoxProps) {
  return (
    <div className="skill-box md:max-w-[30vw]">
      <div className="lg:text-[30px] xs:text-[16px]">{title}</div>
      <div className="skill-box-content">
        {items.map((item) => (
          <div key={item} className="bg-[var(--color-primary)] py-2 px-4 rounded-4xl lg:text-[16px] text-[12px]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
