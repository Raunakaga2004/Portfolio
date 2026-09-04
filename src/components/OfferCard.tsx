import { Fragment } from "react";

type OfferPoint = {
  emoji: string;
  title: string;
  desc: string;
};

type OfferCardProps = {
  id: string;
  className: string;
  heading: string;
  description: string;
  points: OfferPoint[];
};

export default function OfferCard({ id, className, heading, description, points }: OfferCardProps) {
  return (
    <div id={id} className={className}>
      <div className="md:text-[30px] xs:text-[20px] font-semibold">
        {heading}
      </div>
      <div className="md:text-[20px] xs:text-[12px] mb-[8px] md:mb-[28px] mt-[8px] md:mt-[12px]">
        {description}
      </div>
      <div className="md:text-[20px] xs:text-[12px] text-left px-5">
        {points.map((point) => (
          <Fragment key={point.title}>
            {point.emoji} {point.title} <div className="pl-5 text-[10px] pb-2 md:text-[16px]">{point.desc}</div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
