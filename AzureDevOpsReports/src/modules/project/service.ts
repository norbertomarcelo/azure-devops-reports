import { Connections } from "../../commons/connections";
import { Project } from "./model";
import dotenv from "dotenv";

dotenv.config();

export class ProjectService {
  async listProjecsApi() {
    const endpoint = "_apis/projects?api-version=5.0";
    const connection = new Connections();
    try {
      const projectsList: Project[] = [];
      connection.requestAzureDevOpsApi(endpoint).then((projects) => {
        projects.forEach((project: Project) => {
          const newProject = new Project(
            project.id,
            project.name,
            project.url,
            project.state,
            project.revision,
            project.visibility,
            new Date(project.lastUpdateTime)
          );
          projectsList.push(newProject);
        });
      });
      return projectsList;
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  }
}
