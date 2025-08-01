"use client"

import Logo from "@/components/Logo"
import NavLink from "@/components/NavLink"

import { signOut } from "next-auth/react"

export default function({children} : {children : React.ReactElement}){
  return <div className='text-white'>
    <div className='w-screen flex flex-row justify-around'>
      <Logo/>

      {/* navigations */}
      <div className='flex flex-row justify-center items-center gap-4'>
        <NavLink name="Dashboard" href="/admin"/>
        <NavLink name="Skills" href="/admin/skill"/>
        <NavLink name="Projects" href="/admin/project"/>
        <NavLink name="Contact Info" href="/admin/contact"/>
      </div>

      <button onClick= {()=>{signOut({
        callbackUrl : "/admin"
      })}}>Log Out</button>
    </div>

    {children}
  </div>
}