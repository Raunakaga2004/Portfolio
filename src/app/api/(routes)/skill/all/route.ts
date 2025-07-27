import {prisma} from '@/utils/prisma'
import { NextResponse } from 'next/server';

export async function GET(){
  const allSkills = await prisma.skill.findMany({});

  return NextResponse.json({
    data : allSkills
  })
}