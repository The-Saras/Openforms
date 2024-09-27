import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { PrismaClient } from '@prisma/client';
import { authOptions } from "../../../../../lib/auth";

const db = new PrismaClient();

export async function GET (req: NextRequest, { params }: { params: { fid: string } }, res: NextResponse){
    const session = await getServerSession(authOptions);
    const {fid} = params;
    if (req.method !== 'GET') {
        return NextResponse.json({ message: "Only GET request is allowed" }, { status: 405 });
      }
     
    
      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      try {
        
        const form = await db.form.findUnique({
            where: {
                id: fid,
            },
            include: {
              questions: true, 
            },
            
        })  
        return NextResponse.json( form , { status: 200 });
      } 
      catch (error) {
        console.error('Error creating form:', error);
      }
}