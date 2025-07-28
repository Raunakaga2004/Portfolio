"use client"

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AllContacts from "@/components/AllContacts";

export default function(){
  const [loading, setloading] = useState(true);

  const [contacts, setContacts] = useState([]);
  const [open, setopen] = useState(false);

  const username_ref = useRef<HTMLInputElement>(null);
  const link_ref = useRef<HTMLInputElement>(null);
  const icon_url_ref = useRef<HTMLInputElement>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  async function fetchContacts(){
    await axios.get(`${baseUrl}/api/contact/all`).then((res)=>{
      setContacts(res.data?.data);
    })

    setloading(false);
  }

  useEffect(()=>{
    fetchContacts();
  },[])

  const handeleAddContact = async ()=>{
    // add backend endpoint here

    // console.log(show);

    await axios.post(`${baseUrl}/api/contact`, {
      username : username_ref.current?.value,
      link : link_ref.current?.value,
      icon_url : icon_url_ref.current?.value
    }).then(()=>{
      fetchContacts();
      alert("Contact added successfully!")
      setopen(false);
    }).catch((e)=> console.log(e));
  }

  return <div>
    {(open) && <div className="absolute h-screen w-screen top-0 left-0 bg-black opacity-50 flex justify-center items-center">
      <div className="absolute bg-white">
        <div>
          <label>Username : </label>
          <input type="text" ref={username_ref}/>
        </div>

        <div>
          <label>Link : </label>
          <input type="text" ref={link_ref}/>
        </div>

        <div>
          <label>Icon URL : </label>
          <input type="text" ref={icon_url_ref}/>
        </div>

        <button onClick={()=>handeleAddContact()}>Add Contact</button>

        <button onClick={()=> setopen(false)}>Close</button>
      </div>
    </div>}

    <div className="flex flex-row justify-between items-center">
      <div>
        Contacts
      </div>

      <button className="px-4 py-1 border" onClick={()=> setopen(true)}>Add Contact</button>
    </div>

    {(loading) && <div>
      loading...
      </div>
    }
    
    <AllContacts contacts={contacts} fetchContacts={fetchContacts}/>
  </div>
}