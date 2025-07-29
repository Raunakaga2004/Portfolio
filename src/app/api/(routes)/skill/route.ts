import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
  const body = await req.json();
  const {name, description, status, show, iconURL, category} = body;

  await prisma.skill.create({
    data : {
      name,
      description,
      status,
      show,
      iconURL,
      category
    }
  })

  return NextResponse.json({
    message : "Skill created successfully",
  })
}

export async function DELETE(req : NextRequest){
  const body = await req.json();
  const {name} = body;

  await prisma.skill.delete({
    where : {
      name : name
    }
  })

  return NextResponse.json({
    message : "Skill deleted successfully",
  })
}

export async function PUT(req : NextRequest){
  const body = await req.json();

  const {name, description, status, show, iconURL, category} = body;

  await prisma.skill.update({
    where : {
      name : name
    }, 
    data : {
      description : description,
      status : status,
      show : show,
      iconURL : iconURL,
      category : category
    }
  }
  )

  return NextResponse.json({
    message : "Skill updated successfully",
  })
}