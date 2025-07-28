import {prisma} from '@/utils/prisma'
import { NextResponse } from 'next/server';

export async function GET(){
  try{
    const allContacts = await prisma.contact.findMany({});
    return NextResponse.json({
      data : allContacts
    })
  }
  catch(e){
    console.log(e);

    return NextResponse.json({
      error : "error occured"
    })
  }
}