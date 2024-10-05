import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../../../../lib/auth";
import { NextResponse,NextRequest } from "next/server";
import { getServerSession } from "next-auth";


const prisma = new PrismaClient();

export async function POST(req:NextRequest,{ params }: { params: { fid: string } },res:NextResponse){
    const session = await getServerSession(authOptions);
    
    const {fid} = params;
    const { answers, userId } = await req.json();
    
    if (req.method !== 'POST') {
        return NextResponse.json({ message: "Only POST request is allowed" }, { status: 405 });
      }
     
    
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try
    {   
        const response = await prisma.response.create({
            data:{
                answers,
                formId:fid,
                userId :session.user.id
            }
        });
        
        return NextResponse.json({ response }, { status: 200 });

    }
    catch(err)
    {
        console.error('Error creating response:', err);
        return NextResponse.json({ Error: "Internal Server error" }, { status: 500 });
    }

}