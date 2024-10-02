import path from 'path';
import fs from 'fs';

export async function createExcelFile(mappedResponses: any, fid: string): Promise<string> {
  const XLSX = await import('xlsx'); // Dynamically import xlsx

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(mappedResponses);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses');


  const directory = path.join(process.cwd(), 'files');
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const filePath = path.join(directory, `${fid}.xlsx`);


  XLSX.writeFile(workbook, filePath);

  return filePath;
}
