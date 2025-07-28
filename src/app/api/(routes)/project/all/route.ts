import {prisma} from '@/utils/prisma'
import { NextResponse } from 'next/server';

export async function GET(){
  try{
    console.log("hi");
    const allProjects = await prisma.project.findMany({});
    return NextResponse.json({
      data : allProjects
    })
  }
  catch(e){
    console.log(e);

    return NextResponse.json({
      error : "error occured"
    })
  }
}