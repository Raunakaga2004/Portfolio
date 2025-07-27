"use client"

import { useEffect, useState } from "react";
import axios from "axios";

import TextAreaAutoSize from 'react-textarea-autosize'

export default function Content(props : {
  name : string,
  content_title : string
}){
  const [current, setCurrent] = useState<string>("...");
  const [content, setContent] = useState<string>("");

  const [html, setHtml] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(()=>{
    async function fetch(){
      const response = await axios.get(`${baseUrl}/api/content?content=${props.content_title}`).then((res)=>{
        setContent(res.data?.content?.content);
        setCurrent(res.data?.content?.content)
      }).catch((e)=>{
        console.log(e);
      });
    }
    fetch();
  }, [])

  const handleChanges = async ()=>{
    const response = await axios.put(`${baseUrl}/api/content?content=${props.content_title}`, {
      content: current
    })

    setContent(current);

    alert("Changes updated!");
  }

  return <div>
    <div>
      <div>{props.name}</div>
      <TextAreaAutoSize 
        value={current} 
        onChange={(e)=>{
          setCurrent(e.target.value);
        }}
        minRows={5}
        className="resize-none overflow-hidden"
      />

      {(content !== current && current!== "...") && <button onClick={()=>handleChanges()}>Save Changes</button>}
    </div>
  </div>
}