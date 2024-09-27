import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { PrismaClient } from '@prisma/client';
import { authOptions } from "../../../../../lib/auth";

const db = new PrismaClient();

export async function POST(req:NextRequest,{ params }: { params: { fid: string } },res:NextResponse){
    const session = await getServerSession(authOptions);
    const {fid} = params;
    if (req.method !== 'POST') {
        return NextResponse.json({ message: "Only POST request is allowed" }, { status: 405 });
      }
     
    
      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      try{
        const body = await req.json();
        const { text } = body;
        const question = await db.question.create({
          data: {
            text,
            formId: fid,
          },
        });
        return NextResponse.json({ question }, { status: 200 });
        
      }
      catch(err){
        console.error('Error creating question:', err);
      }
}