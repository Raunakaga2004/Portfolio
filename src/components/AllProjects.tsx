import axios from "axios";
import { useRef, useState } from "react";

type ProjectType = {
  id : string,
  title : string,
  description :string,
  tech_stack_used : string[],
  project_image_URL? : string,
  video_image_URL? : string,
  status : string,
  show : boolean,
}

export default function({projects, fetchProjects} : {
  projects : ProjectType[],
  fetchProjects : ()=>Promise<void>
}){
  const [open, setOpen] = useState(false);

  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")
  const [image_url, setimage_url] = useState("");
  const [video_url, setvideo_url] = useState("");

  const [tech_stack, settechstack] = useState<string[]>([]);
  const tech_name_ref = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState("NOT_STARTED");
  const [show, setShow] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  return <div>
    {projects.map((project : {
      id : string
      title : string,
      description : string,
      tech_stack_used : string[],
      project_image_URL? : string,
      project_video_URL? : string,
      status : string,
      show : boolean,
    }) => {

      const handleUpdateProject = async ()=>{
        // add backend endpoint here

        // console.log(show);

        await axios.put(`${baseUrl}/api/project`, {
          id : project.id,
          title : title ,
          description : desc,
          tech_stack_used : tech_stack,
          project_image_URL : image_url,
          project_video_URL : video_url,
          status : status,
          show : show,
        }).then(()=>{
          alert("Project Updated successfully!")
          setOpen(false);
          fetchProjects();
        }).catch((e)=> console.log(e));
      }
      
      const handleDelete = async () => {
        await axios.delete(`${baseUrl}/api/project`, {
          data : {
            id : project.id
          }
        }).then(async ()=>{
          alert("Project deleted!");

          await fetchProjects();
        })
      }

      const handleUpdateWindow = ()=>{
        settitle(project.title);
        setdesc(project.description);
        settechstack(project.tech_stack_used);
        setimage_url(project.project_image_URL || "");
        setvideo_url(project.project_video_URL || "");
        setStatus(project.status);
        setShow(project.show);

        setOpen(true);
      }

      return <div key={project.id}>

        {(open) && <div className="absolute h-screen w-screen top-0 left-0 bg-black opacity-50 flex justify-center items-center">
          <div className="absolute bg-white">
            <div>
              <label>Project name : </label>
              <input type="text" onChange={(e)=>settitle(e.target.value)} value={title}/>
            </div>

            <div>
              <label>Description : </label>
              <input type="text" onChange={(e)=>setdesc(e.target.value)} value={desc}/>
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
              <input type="text" onChange={(e)=>setimage_url(e.target.value)}/>
            </div>

            <div>
              <label>Video url : </label>
              <input type="text" onChange={(e)=>setvideo_url(e.target.value)}/>
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
              <input type="checkbox" onChange={()=>setShow(!show)} checked={show}/>
            </div>


            <button onClick={()=>handleUpdateProject()}>Update Project</button>

            <button onClick={()=> setOpen(false)}>Close</button>
          </div>
        </div>}


        <div> {project.title} </div>
        <div> {project.description} </div>
        {project.tech_stack_used.map((tech)=>{
          return <div key={tech}>{tech}</div>
        })}
        <div> {project.status} </div>
        <div> {"show : "}{project.show ? "✅" : "❌"} </div>

        <button onClick={handleDelete}>delete</button>
        <button onClick={handleUpdateWindow}>update</button>
      </div>
    })}
  </div>
}