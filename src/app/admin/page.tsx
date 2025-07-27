"use client";

import {prisma} from '@/utils/prisma';

// components
import Logo from '@/components/Logo';
import Content from '@/components/Content';
import NavLink from '@/components/NavLink';

// we will change the image manually from public/image folder
// two images intro_image.jpg and who_am_i_image.jpg

export default function(){
  return <div>
    {/* header */}
    <div>
      <Logo/>

      {/* navigations */}
      <div>
        <NavLink name="Skills" href="/admin/skill"/>
        <NavLink name="Projects" href="/admin/project"/>
        <NavLink name="Contact Info" href="/admin/contact"/>
      </div>
    </div>

    {/* intro content */}
    <Content name="Intro Content"/>

    {/* who am i content */}
    <Content name="Who am I content"/>

    {/* what do i offer content */}
    <Content name="What do I offer content"/>
  </div>
}