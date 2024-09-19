import tl = require("azure-pipelines-task-lib/task");

import { ReportCsv } from "./reports/csv";
import { ReportPdf } from "./reports/pdf";
import { ReportXlsx } from "./reports/xlsx";
import { ProjectService } from "./modules/project/service";

async function run() {
  try {
    const projectService = new ProjectService();
    const projectList = await projectService.listProjects();
    
    if (projectList.length > 0) {
      const csv = new ReportCsv();
      await csv.createReport(projectList);

      const xlsx = new ReportXlsx();
      await xlsx.createReport(projectList);

      const pdf = new ReportPdf();
      await pdf.createReport(projectList);
    } else{
      console.log("Array vazio.");      
    }
  } catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
