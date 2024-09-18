import * as fs from "fs";
import * as XLSX from "xlsx";

export class ReportXlsx {
  async createProjectsReport(projectList: any[]) {
    if (projectList) {
      const worksheet = XLSX.utils.json_to_sheet(projectList);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "buffer",
      });
      fs.writeFileSync("../projects.xlsx", excelBuffer);
    }
  }
}
