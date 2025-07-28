import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
  const body = await req.json();
  const {username, link, icon_url} = body;

  await prisma.contact.create({
    data : {
      username,
      link,
      icon_url
    }
  })

  return NextResponse.json({
    message : "Contact created successfully",
  })
}

export async function DELETE(req : NextRequest){
  const body = await req.json();
  const {id} = body;

  await prisma.contact.delete({
    where : {
      id : id
    }
  })

  return NextResponse.json({
    message : "Contact deleted successfully",
  })
}

export async function PUT(req : NextRequest){
  const body = await req.json();

  const {id, username, link, icon_url} = body;

  await prisma.contact.update({
    where : {
      id : id
    }, 
    data : {
      username,
      link,
      icon_url
    }
  }
  )

  return NextResponse.json({
    message : "Contact updated successfully",
  })
}