import tl = require("azure-pipelines-task-lib/task");
import { ProjectService } from "./modules/project/service";
import * as XLSX from "xlsx";
import * as fs from "fs";

async function run() {
  try {
    const projectService = new ProjectService();
    const projectList = await projectService.listProjecsApi();
    if (projectList) {
      const worksheet = XLSX.utils.json_to_sheet(projectList);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "buffer",
      });
      fs.writeFileSync("../output.xlsx", excelBuffer);
    }
    
  } catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
