"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function(){
  const [skills, setSkills] = useState([]);
  const [open, setopen] = useState(false);
  // const [update, setupdate] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(()=>{
    async function fetch(){
      await axios.get(`${baseUrl}/api/skill/all`).then((res)=>{
        setSkills(res.data?.data);
      })
    }
    fetch();
  },[])

  const handleAddSkill = ()=>{
    setopen(false);
    // add backend endpoint here
  }

  return <div>
    {(open) && <div className="absolute h-screen w-screen top-0 left-0 bg-black opacity-50 flex justify-center items-center">
      <div className="absolute bg-white">
        <div>
          <label>Skill name : </label>
          <input type="text" />
        </div>

        <div>
          <label>Description : </label>
          <input type="text" />
        </div>

        <div>
          <label>Status : </label>
          {/* we will create radio button */}
        </div>

        <div>
          <label>Show : </label>
          <input type="text" />
        </div>

        <div>
          <label>Icon url : </label>
          <input type="text" />
        </div>

        <button onClick={()=>handleAddSkill}>Add Skill</button>

        <button onClick={()=> setopen(false)}>Close</button>
      </div>
    </div>}

    <div className="flex flex-row justify-between items-center">
      <div>
        Skills
      </div>

      <button className="px-4 py-1 border" onClick={()=> setopen(true)}>Add Skill</button>
    </div>
    
    
  </div>
}