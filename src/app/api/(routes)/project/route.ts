import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
  const body = await req.json();
  const {title, description, tech_stack_used, project_image_URL, project_video_URL, status, show, live_link, github_link} = body;

  await prisma.project.create({
    data : {
      title,
      description,
      tech_stack_used,
      project_image_URL,
      project_video_URL,
      status,
      show,
      live_link,
      github_link
    }
  })

  return NextResponse.json({
    message : "Project created successfully",
  })
}

export async function DELETE(req : NextRequest){
  const body = await req.json();
  const {id} = body;

  await prisma.project.delete({
    where : {
      id : id
    }
  })

  return NextResponse.json({
    message : "Project deleted successfully",
  })
}

export async function PUT(req : NextRequest){
  const body = await req.json();

  const {id, title, description, tech_stack_used, project_image_URL, project_video_URL, status, show, live_link, github_link} = body;

  await prisma.project.update({
    where : {
      id : id
    }, 
    data : {
      title,
      description,
      tech_stack_used,
      project_image_URL,
      project_video_URL,
      status,
      show,
      live_link,
      github_link
    }
  }
  )

  return NextResponse.json({
    message : "Project updated successfully",
  })
}