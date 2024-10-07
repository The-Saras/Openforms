import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
import { authOptions } from "../../../../lib/auth"

const db = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse){
    const session = await getServerSession(authOptions);
    if (req.method !== 'GET') {
        return NextResponse.json({ message: "Only Post request is allowed" }, { status: 405 });
      }
     
    
      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      try {
        const forms = await db.form.findMany({
            where: {
                ownerId: session.user.id,
            },
            
        })  
        return NextResponse.json({ forms }, { status: 200 });
      } 
      catch (error) {
        console.error('Error creating form:', error);
      }
}