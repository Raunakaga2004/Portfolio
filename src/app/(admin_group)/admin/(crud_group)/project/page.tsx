"use client"

import { useState, useEffect, useRef } from "react";
import axios from "axios";

import AllProjects from "@/components/AllProjects";

export default function(){
  const [loading, setloading] = useState(true);

  const [projects, setProjects] = useState([]);
  const [open, setopen] = useState(false);

  const [status, setStatus] = useState("NOT_STARTED");
  const [show, setShow] = useState(false);

  const title_ref = useRef<HTMLInputElement>(null);
  const desc_ref = useRef<HTMLInputElement>(null);
  const image_url_ref = useRef<HTMLInputElement>(null);
  const video_url_ref = useRef<HTMLInputElement>(null);

  const [tech_stack, settechstack] = useState<string[]>([]);
  const tech_name_ref = useRef<HTMLInputElement>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  async function fetchProjects(){
    await axios.get(`${baseUrl}/api/project/all`).then((res)=>{
      setProjects(res.data?.data);
    })

    setloading(false);
  }

  useEffect(()=>{
    fetchProjects();
  },[])

  const handleAddProject = async ()=>{
    // add backend endpoint here

    // console.log(show);

    await axios.post(`${baseUrl}/api/project`, {
      title : title_ref.current?.value || "",
      description : desc_ref.current?.value || "",
      tech_stack_used : tech_stack,
      project_image_URL : image_url_ref.current?.value,
      project_video_URL : video_url_ref.current?.value,
      status : status,
      show : show,
    }).then(()=>{
      fetchProjects();
      alert("Project added successfully!")
      setopen(false);
    }).catch((e)=> console.log(e));


    setStatus("NOT_STARTED");
    setShow(false);
    settechstack([]);
  }

  return <div>
    {(open) && <div className="absolute h-screen w-screen top-0 left-0 bg-black opacity-50 flex justify-center items-center">
      <div className="absolute bg-white">
        <div>
          <label>Project title : </label>
          <input type="text" ref={title_ref}/>
        </div>

        <div>
          <label>Description : </label>
          <input type="text" ref={desc_ref}/>
        </div>

        <div>
          <label>Tech Stack used : </label>
          <input ref={tech_name_ref}/>
          <button onClick={()=>{
            if(tech_name_ref.current)
              settechstack([...tech_stack, tech_name_ref.current?.value])
          }}>+</button>
          {tech_stack.map((tech, index)=>{
            return <div key={index} onClick={()=>{
              settechstack(tech_stack.filter((_,id)=>id !== index));
            }}>
              {tech}
            </div>
          })}
        </div>

        <div>
          <label>Image url : </label>
          <input type="text" ref={image_url_ref}/>
        </div>

        <div>
          <label>Video url : </label>
          <input type="text" ref={video_url_ref}/>
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

        <button onClick={()=>handleAddProject()}>Add Project</button>

        <button onClick={()=> setopen(false)}>Close</button>
      </div>
    </div>}

    <div className="flex flex-row justify-between items-center">
      <div>
        Projects
      </div>

      <button className="px-4 py-1 border" onClick={()=> setopen(true)}>Add Project</button>
    </div>

    {(loading) && <div>
      loading...
      </div>
    }
    
    <AllProjects projects={projects} fetchProjects={fetchProjects}/>
  </div>
}