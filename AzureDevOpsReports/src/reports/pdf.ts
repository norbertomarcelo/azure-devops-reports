import * as fs from "fs";

const PDFDocument = require("pdfkit");

export class ReportPdf {
  async createProjectsReport(projectList: any[]) {
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream("../projects.pdf");
    doc.pipe(writeStream);
    doc.fontSize(18).text("Relatório de Projetos", { align: "center" });
    doc.moveDown();
    projectList.forEach((project) => {
      doc.fontSize(12).text(`ID: ${project.id}`);
      doc.text(`Nome: ${project.name}`);
      doc.text(`URL: ${project.url}`);
      doc.text(`Estado: ${project.state}`);
      doc.text(`Revisão: ${project.revision}`);
      doc.text(`Visibilidade: ${project.visibility}`);
      doc.text(`Última Atualização: ${project.lastUpdateTime}`);
      doc.moveDown();
    });
    doc.end();
    writeStream.on("finish", () => {
      console.log("Relatório PDF criado com sucesso!");
    });
  }
}
