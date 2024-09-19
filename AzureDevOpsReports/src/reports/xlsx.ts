import * as fs from "fs";
import * as XLSX from "xlsx";

import { Project } from "../modules/project/model";

export class ReportXlsx {
  async createReport(projectList: Project[]): Promise<void> {
    const workbook = await this.buildProjects(projectList);
    if (workbook) {
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "buffer",
      });
      fs.writeFileSync("../output.xlsx", excelBuffer);
    }
  }

  async buildProjects(projectList: Project[]): Promise<XLSX.WorkBook> {
      const worksheet = XLSX.utils.json_to_sheet(projectList);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
      return workbook
    }
  }

