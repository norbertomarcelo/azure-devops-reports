import * as fs from "fs";

export class ReportCsv {
  async createProjectsReport(projectList: any[]) {
    const headers = Object.keys(projectList[0]).join(",");
    const rows = projectList
      .map((item) => Object.values(item).join(","))
      .join("\n");

    const csvFile = `${headers}\n${rows}`;

    fs.writeFile("../projects.csv", csvFile, (err) => {
      if (err) {
        console.error("Erro ao escrever o arquivo CSV:", err);
        return;
      }
      console.log("Arquivo CSV criado com sucesso!");
    });
  }
}
