import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { authOptions } from "../../../../lib/auth"

const db = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  
  if (req.method !== 'POST') {
    return NextResponse.json({ message: "Only Post request is allowed" }, { status: 405 });
  }
 

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  
  const { title, des } = body; 
  console.log(title, des);
  try {
    // Create a new form in the database
    const form = await db.form.create({
      data: {
        title,
        description: des, 
        ownerId: session.user.id,
      },
    });

    return NextResponse.json({ form }, { status: 200 });
  } catch (error) {
    console.error('Error creating form:', error);
    return NextResponse.json({ Error: "Internal Server error" }, { status: 500 });
  }
}
