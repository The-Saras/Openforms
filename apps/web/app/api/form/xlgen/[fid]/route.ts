import { PrismaClient } from "@prisma/client";
import XLSX from 'xlsx';
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { fid: string } }, res: NextResponse) {
    const { fid } = params; 

    try {
        // Fetch all responses for the form from the database
        const formResponses = await prisma.response.findMany({
          where: { formId: fid }, 
          include: { user: true }, 
        });

        if (!formResponses || formResponses.length === 0) {
          return NextResponse.json({ message: "No responses found for this form" }, { status: 404 });
        }

        // Prepare data for Excel
        const rows = formResponses.map((response) => {
          // Ensure answers are treated as JSON, not as strings
          const answerData = response.answers as unknown as Record<string, any>;

          return {
            UserId: response.userId,
            UserName: response.user.name, 
            FormId: response.formId,
            ...answerData, 
          };
        });

        // Create a new workbook and worksheet with the response data
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses');

        // Write the Excel file to a buffer (in-memory)
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        // Send the Excel file as a download response
        return new NextResponse(excelBuffer, {
          headers: {
            'Content-Disposition': 'attachment; filename="form_responses.xlsx"',
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        });
    } 
    catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ message: 'Error generating the Excel file' }, { status: 500 });
    }
}
