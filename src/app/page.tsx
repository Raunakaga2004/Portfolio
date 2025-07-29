"use server";

// main portfolio website 

import Logo from "@/components/Logo";
import { qwigley } from "./layout";

export default async function Home() {
  return (
    <div className="h-screen w-screen">
      {/* intro section */}
      <div className="">
        <div className={`${qwigley.className}`}>
          <div className="text-fortext">Raunak</div>
          <div className="text-secondary">Agarwal</div>
        </div>

        

        <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-end overflow-y-hidden">
          
          <div className="absolute w-[530px] h-[700px] bg-primary rounded-[60%/60%_60%_60%_60%] rotate-325 -translate-y-[5%] "/>
          <img src={"/image/image.png"} className="h-[700px] absolute"/> 
          
          {/* <div className="absolute w-[430px] h-[600px] bg-primary rounded-[60%/60%_60%_60%_60%] rotate-325"/> */}
        </div>
        
      </div>
    </div>
  );
}
