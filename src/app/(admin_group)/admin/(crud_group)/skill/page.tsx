"use client"

import { useState, useEffect, useRef } from "react";
import axios from "axios";

import AllSkills from "@/components/AllSkills";

export default function(){
  const [loading, setloading] = useState(true);

  const [skills, setSkills] = useState([]);
  const [open, setopen] = useState(false);

  const [status, setStatus] = useState("NOT_STARTED");
  const [show, setShow] = useState(false);

  const name_ref = useRef<HTMLInputElement>(null);
  const desc_ref = useRef<HTMLInputElement>(null);
  const icon_url_ref = useRef<HTMLInputElement>(null);

  const [categories, setcategories] = useState<string[]>([]);
  const category_name_ref = useRef<HTMLInputElement>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  async function fetchSkills(){
    await axios.get(`${baseUrl}/api/skill/all`).then((res)=>{
      setSkills(res.data?.data);
    })

    setloading(false);
  }

  useEffect(()=>{
    fetchSkills();
  },[])

  const handleAddSkill = async ()=>{
    // add backend endpoint here

    await axios.post(`${baseUrl}/api/skill`, {
      name : name_ref.current?.value || "",
      description : desc_ref.current?.value || "",
      status : status,
      show : show,
      categories : categories,
      iconURL : icon_url_ref.current?.value || ""
    }).then(()=>{
      fetchSkills();
      alert("Skill added successfully!")
      setopen(false);
    }).catch((e)=> console.log(e));

    setcategories([]);
    setStatus("NOT_STARTED");
    setShow(false);
  }

  return <div>
    {(open) && <div className="absolute h-screen w-screen top-0 left-0 bg-black opacity-50 flex justify-center items-center">
      <div className="absolute bg-white">
        <div>
          <label>Skill name : </label>
          <input type="text" ref={name_ref}/>
        </div>

        <div>
          <label>Description : </label>
          <input type="text" ref={desc_ref}/>
        </div>

        <div>
          <label>Status : </label>
          {/* we will create radio button */}
          
          <div>
            <button onClick={()=>setStatus("NOT_STARTED")} className={`${status === "NOT_STARTED" && "bg-red-400" }`}>NOT_STARTED</button>
            <button onClick={()=>setStatus("IN_PROGRESS")} className={`${status === "IN_PROGRESS" && "bg-red-400" }`}>IN_PROGRESS</button>
            <button onClick={()=>setStatus("COMPLETED")} className={`${status === "COMPLETED" && "bg-red-400" }`}>COMPLETED</button>
          </div>
        </div>

        <div>
          <label>Show : </label>
          <input type="checkbox" onChange={()=>setShow(!show)}/>
        </div>

        <div>
          <label>Icon url : </label>
          <input type="text" ref={icon_url_ref}/>
        </div>

        <div>
          <label>Categories : </label>
          <input ref={category_name_ref}/>
          <button onClick={()=>{
            if(category_name_ref.current)
              setcategories([...categories, category_name_ref.current?.value])
          }}>+</button>
          {categories.map((cat, index)=>{
            return <div key={index} onClick={()=>{
              setcategories(categories.filter((_,id)=>id !== index));
            }}>
              {cat}
            </div>
          })}
        </div>

        <button onClick={()=>{
          handleAddSkill()
        }}>Add Skill</button>

        <button onClick={()=> {
          setcategories([]);
          setopen(false)
        }}>Close</button>
      </div>
    </div>}

    <div className="flex flex-row justify-between items-center">
      <div>
        Skills
      </div>

      <button className="px-4 py-1 border" onClick={()=> setopen(true)}>Add Skill</button>
    </div>

    {(loading) && <div>
      loading...
      </div>
    }
    
    <AllSkills skills={skills} fetchSkills={fetchSkills}/>
  </div>
}