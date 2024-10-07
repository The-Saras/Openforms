import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import * as XLSX from 'xlsx';
import { authOptions } from "../../../../../lib/auth";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { fid: string } }) {
  interface Form {
    title: string;
    description: string | null;
    id: string;
    ownerId: string;
  }

  const form: Form | null = await prisma.form.findUnique({
    where: {
      id: params.fid,
    },
  });

 
  if (!form) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 });
  }

  const session = await getServerSession(authOptions);

  if (session && session.user.id === form.ownerId) {
    try {
      type Question = string;
      type Answer = string[];
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

      
      const responses = await prisma.response.findMany({
        where: {
          formId: params.fid,
        },
      });

      const questions = await prisma.question.findMany({
        where: {
          formId: params.fid,
        },
      });

      const responseArray: any[] = responses.map((data) => Object.values(data.answers ?? {}));
      const questionsArray: string[] = questions.map((data) => data.text);

      const mappedResponses = mapResponsesToQuestions(questionsArray, responseArray);

      const worksheet = XLSX.utils.json_to_sheet(mappedResponses);

      const range = XLSX.utils.decode_range(worksheet['!ref'] || "");
      for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
        for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
          const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
          const cell = worksheet[cellAddress];

          if (cell && typeof cell.v === 'string' && !isNaN(Number(cell.v))) {
            cell.t = 's';
          }
        }
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses');
      const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

      return new Response(buf, {
        status: 200,
        headers: {
          'Content-Disposition': `attachment; filename="responses.xlsx"`,
          'Content-Type': 'application/vnd.ms-excel',
        },
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
}
