import * as fs from "fs";
import PDFDocument from "pdfkit";

import { Project } from "../modules/project/model";

export class ReportPdf {
  async createReport(projectList: Project[]): Promise<void> {
    const doc: PDFKit.PDFDocument = new PDFDocument();
    const writeStream: fs.WriteStream = fs.createWriteStream("../projects.pdf");
    await this.buildProjects(doc, projectList);
    doc.pipe(writeStream);
    doc.end();
    writeStream.on("finish", () => {
      console.log("Relatório PDF criado com sucesso!");
    });
  }

  async buildProjects(doc: PDFKit.PDFDocument, projectList: Project[]): Promise<void> {
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
  }
}
