import axios from "axios";
import { useRef, useState } from "react";

type SkillType = {
  id : string,
  name : string,
  description :string,
  status : string,
  show : boolean,
  iconURL : string,
  categories : string[]
}

export default function({skills, fetchSkills} : {
  skills : SkillType[],
  fetchSkills : ()=>Promise<void>
}){
  const [open, setOpen] = useState(false);

  const [name, setname] = useState("")
  const [desc, setdesc] = useState("")
  const [icon, seticon] = useState("")

  const [status, setStatus] = useState("NOT_STARTED");
  const [show, setShow] = useState(false);

  const [categories, setcategories] = useState<string[]>([]);
  const category_name_ref = useRef<HTMLInputElement>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  return <div>
    {skills.map((skill : SkillType) => {

      const handleUpdateSkill = async ()=>{
        // add backend endpoint here

        // console.log(show);

        await axios.put(`${baseUrl}/api/skill`, {
          name : name ,
          description : desc,
          status : status,
          show : show,
          iconURL : icon,
          categories : categories
        }).then(()=>{
          alert("Skill Updated successfully!")
          setOpen(false);
          fetchSkills();
        }).catch((e)=> console.log(e));
      }
      
      const handleDelete = async () => {
        await axios.delete(`${baseUrl}/api/skill`, {
          data : {
            name : skill.name
          }
        }).then(async ()=>{
          alert("Skill deleted!");

          await fetchSkills();
        })
      }

      const handleUpdateWindow = ()=>{
        setname(skill.name);
        setdesc(skill.description);
        setStatus(skill.status);
        setShow(skill.show);
        seticon(skill.iconURL || "");
        setcategories(skill.categories);

        setOpen(true);
      }

      return <div key={skill.name}>

        {(open) && <div className="absolute h-screen w-screen top-0 left-0 bg-black opacity-50 flex justify-center items-center">
          <div className="absolute bg-white">
            <div>
              <label>Skill name : </label>
              <input type="text" onChange={(e)=>setname(e.target.value)} value={name}/>
            </div>

            <div>
              <label>Description : </label>
              <input type="text" onChange={(e)=>setdesc(e.target.value)} value={desc}/>
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

            <div>
              <label>Icon url : </label>
              <input type="text" onChange={(e)=>seticon(e.target.value)}/>
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

            <button onClick={()=>handleUpdateSkill()}>Update Skill</button>

            <button onClick={()=> {
              setcategories([]);
              setOpen(false)
            }}>Close</button>
          </div>
        </div>}


        <div> {skill.name} </div>
        <div> {skill.description} </div>
        <div> {skill.status} </div>
        <div> {"show : "}{skill.show ? "✅" : "❌"} </div>
        {/* <div> {"categories : "}{skill.categories.map((cat, id)=>{
          return <div key={id}> {cat} </div>
        })}
        </div> */}

        <button onClick={handleDelete}>delete</button>
        <button onClick={handleUpdateWindow}>update</button>
      </div>
    })}
  </div>
}