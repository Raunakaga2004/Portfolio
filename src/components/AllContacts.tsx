import axios from "axios";
import { useRef, useState } from "react";

type ContactType = {
  id : string,
  username : string,
  link : string,
  icon_url : string
}

export default function({contacts, fetchContacts} : {
  contacts : ContactType[],
  fetchContacts : ()=>Promise<void>
}){
  const [open, setOpen] = useState(false);

  const [username, setusername] = useState("");
  const [link, setlink] = useState("");
  const [icon_url, seticon_url] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  return <div>
    {contacts.map((contact : {
      id : string
      username : string,
      link : string,
      icon_url : string
    }) => {

      const handleUpdateContact = async ()=>{
        // add backend endpoint here

        // console.log(show);

        await axios.put(`${baseUrl}/api/contact`, {
          id : contact.id,
          username : username,
          link : link,
          icon_url : icon_url
        }).then(()=>{
          alert("Contact Updated successfully!")
          setOpen(false);
          fetchContacts();
        }).catch((e)=> console.log(e));
      }
      
      const handleDelete = async () => {
        await axios.delete(`${baseUrl}/api/contact`, {
          data : {
            id : contact.id
          }
        }).then(async ()=>{
          alert("Contact deleted!");

          await fetchContacts();
        })
      }

      const handleUpdateWindow = ()=>{
        setusername(contact.username);
        setlink(contact.link);
        seticon_url(contact.icon_url);

        setOpen(true);
      }

      return <div key={contact.id}>

        {(open) && <div className="absolute h-screen w-screen top-0 left-0 bg-black opacity-50 flex justify-center items-center">
          <div className="absolute bg-white">
            <div>
              <label>Username: </label>
              <input type="text" onChange={(e)=>setusername(e.target.value)} value={username}/>
            </div>

            <div>
              <label>Link : </label>
              <input type="text" onChange={(e)=>setlink(e.target.value)} value={link}/>
            </div>

            <div>
              <label>Icon URL : </label>
              <input type="text" onChange={(e)=>seticon_url(e.target.value)} value={icon_url}/>
            </div>

            <button onClick={()=>handleUpdateContact()}>Update Contact</button>

            <button onClick={()=> setOpen(false)}>Close</button>
          </div>
        </div>}


        <div> {contact.username} </div>
        <div> {contact.link} </div>
        <div> {contact.icon_url} </div>

        <button onClick={handleDelete}>delete</button>
        <button onClick={handleUpdateWindow}>update</button>
      </div>
    })}
  </div>
}