import * as fs from "fs";

import { Project } from "../modules/project/model";

export class ReportCsv {
  async createReport(projectList: Project[]): Promise<void> {
    const content: string = await this.buildProjects(projectList);
    fs.writeFile("../projects.csv", content, (err) => {
      if (err) {
        console.error("Erro ao escrever o arquivo CSV:", err);
      }
      console.log("Arquivo CSV criado com sucesso!");
    });
  }

  async buildProjects(projectList: Project[]): Promise<string> {
    const headers: string[] = Object.keys(projectList[0]);
    const rows = projectList.map((project) => {
      return headers.map((header) => {
        const value = (project as any)[header];
        return value instanceof Date ? value.toISOString() : value;
      });
    });
    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  }
}
