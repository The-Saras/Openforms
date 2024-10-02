'use server';
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import path from 'path'; // Import path to manage file paths
import * as XLSX from 'xlsx'
import { promises as fs } from 'fs';

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
    response.map((data) => {
      const values = Object.values(data.answers ?? {});
      responseArray.push(values);
    });

    const questionsArray: any = [];
    questions.map((data) => {
      questionsArray.push(data.text);
    });

    const mappedResponses = mapResponsesToQuestions(questionsArray, responseArray);

    const worksheet = XLSX.utils.json_to_sheet(mappedResponses);
    console.log(worksheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses');
    const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })
    
    const filePath = "sample.xlsx"
    const tableName = "sample"
    
    
    return new Response(buf, {
      status: 200,
      headers: {
          'Content-Disposition': `attachment; filename="${tableName}.xlsx"`,
          'Content-Type': 'application/vnd.ms-excel',
      }
  })
  }
  catch (error) 
  {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
