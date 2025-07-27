import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

// extract content
export async function GET(req : NextRequest){
  const { searchParams} = new URL(req.url);
  const content_name = searchParams.get("content");

  // console.log(content_name)

  if(!content_name || typeof content_name !== "string"){
    return NextResponse.json({
      message : "Not a valid content name!"
    })
  }

  const content = await prisma.content.findUnique({
    where : {
      title : content_name
    }
  })

  if(!content){
    return NextResponse.json({
      message : "Content not found!"
    })
  }

  return NextResponse.json({
    content : content
  })
}


export async function PUT(req : NextRequest){
  const { searchParams} = new URL(req.url);
  const content_name = searchParams.get("content");

  const body = await req.json(); // need to parse to json first
  const {content} : {content : string} = body;

  if(!content_name || typeof content_name !== "string"){
    return NextResponse.json({
      message : "Not a valid content name!"
    })
  }

  const content_fromtable = await prisma.content.findUnique({
    where : {
      title : content_name
    }
  })

  if(!content_fromtable){
    return NextResponse.json({
      message : "Content not found!"
    })
  }

  await prisma.content.update({
    where : {
      title : content_name
    }, data :{
      content : content
    }
  })

  return NextResponse.json({
    message : "Content updated successfully!"
  })
}