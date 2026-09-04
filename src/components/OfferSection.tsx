import OfferCard from "@/components/OfferCard";

const clientOffer = {
  heading: "For Clients",
  description: "I collaborate with clients to turn ideas into fast, scalable, and appealing products.",
  points: [
    { emoji: "💡", title: "Custom Web Apps", desc: "Full-stack solutions tailored to your goals" },
    { emoji: "⚡", title: "Responsive Design", desc: "Optimized for all devices" },
    { emoji: "🔍", title: "SEO & Speed", desc: "Fast load times, search-friendly" },
    { emoji: "🧱", title: "Modular Codebase", desc: "Easy to scale and maintain" },
    { emoji: "🤝", title: "Clear Communication", desc: "Regular updates and feedback" },
  ],
};

const hiringTeamOffer = {
  heading: "For Hiring Team",
  description: "I strive to work closely with my team, contributing honestly and supporting shared goals.",
  points: [
    { emoji: "🧠", title: "Strong Core Skills", desc: "DSA + full-stack development" },
    { emoji: "✍️", title: "Clean Code", desc: "Focused on quality and maintainability" },
    { emoji: "🚀", title: "Ownership", desc: "Proactive and solution-driven" },
    { emoji: "🤝", title: "Team Player", desc: "Open to feedback, collaborative" },
  ],
};

export default function OfferSection() {
  return (
    <div id="offer-parent" className="page-section h-screen text-white flex flex-col justify-center items-center md:gap-[10vh] xs:gap-[4vh] ">
      <div id="offer-heading" className="sm:text-[30px] xs:text-[20px] lg:text-[50px] opacity-0 xs:translate-y-[20px] md:translate-y-[0px]">How I Can Help</div>

      <div className="flex flex-col md:flex-row justify-center items-center md:gap-[5vw] gap-[1vh]">
        <OfferCard
          id="offer-div-left"
          className="-translate-x-[60vw] md:max-w-[400px] max-w-[350px] md:min-h-[68vh] xs:max-h-[36vh] rounded-md bg-primary offer-div md:p-5 p-2 text-center text"
          {...clientOffer}
        />
        <OfferCard
          id="offer-div-right"
          className="translate-x-[60vw] md:max-w-[400px] max-w-[350px] md:max-h-[80vh] md:min-h-[68vh] xs:max-h-[36vh] rounded-md bg-primary offer-div text-center p-2 md:p-5"
          {...hiringTeamOffer}
        />
      </div>
    </div>
  );
}
