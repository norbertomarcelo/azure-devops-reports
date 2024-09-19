import { Connections } from "../../commons/connections";
import { Project } from "./model";

export class ProjectService {
  async listProjects(): Promise<Project[]> {
    const endpoint: string = "_apis/projects?api-version=5.0";
    const connection: Connections = new Connections();
    try {
      const response: any[] = await connection.requestAzureDevOpsApi(endpoint);
      const projectsList: Project[] = Project.fromJSONArray(response);
      return projectsList;
    } catch (err) {
      console.error("Error fetching projects:", err);
      return [];
    }
  }
}
