'use server';
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { fid: string } }) {

  try {
    type Question = string;
    type Answer = string[];  // Each answer array
    type MappedResponse = Record<string, string>;

    const mapResponsesToQuestions = (questions: Question[], responses: Answer[]): MappedResponse[] => {
      return responses.map((answerSet) => {
        const responseObject: MappedResponse = {};

        answerSet.forEach((answer, index) => {
          if (questions[index]) {
            responseObject[questions[index]] = answer;
          }
        });

        return responseObject;
      });
    };

    // Fetch responses and questions from your database
    const response = await prisma.response.findMany({
      where: {
        formId: params.fid
      },
    });

    const questions = await prisma.question.findMany({
      where: {
        formId: params.fid
      },
    });

    const responseArray: any = [];
    response.map((data:any) => {
      const values = Object.values(data.answers ?? {});
      responseArray.push(values);
    });

    const questionsArray: any = [];
    questions.map((data:any) => {
      questionsArray.push(data.text);
    });

    const mappedResponses = mapResponsesToQuestions(questionsArray, responseArray);

    const worksheet = XLSX.utils.json_to_sheet(mappedResponses);
    
    // Iterate over each cell to ensure it is stored as a string
    const range = XLSX.utils.decode_range(worksheet['!ref'] || "");
    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
        const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
        const cell = worksheet[cellAddress];

        if (cell && typeof cell.v === 'string' && !isNaN(Number(cell.v))) {
          // Set cell type to string explicitly
          cell.t = 's'; 
        }
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses');
    const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    
    const filePath = "sample.xlsx";
    const tableName = "sample";

    return new Response(buf, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="${tableName}.xlsx"`,
        'Content-Type': 'application/vnd.ms-excel',
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
