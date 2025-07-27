"use client";

// utils
import {prisma} from '@/utils/prisma';

// components
import Logo from '@/components/Logo';
import Content from '@/components/Content';
import NavLink from '@/components/NavLink';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// we will change the image manually from public/image folder
// two images intro_image.jpg and who_am_i_image.jpg

export default function(){
  const {data : session, status} = useSession(); // useSession() is a react hook provided by next auth that gives user's current authentication session
  // here we are renaming data to session
  const router = useRouter();

  useEffect(()=>{
    if(status === 'unauthenticated'){
      router.push("/login")
    }
  }, [status, router])

  if(status === "loading"){
    return <div className='h-screen w-screen flex justify-center items-center'>
      ... loading
    </div>
  }

  if(status === "authenticated"){
    return<div>
      {/* header */}
      {/* {session?.user?.name}  */}

      <div className='h-[80vh] flex justify-center items-center'>
        This is the admin page
        {/* we will add the analytics */}
      </div>
    </div>
  }
}