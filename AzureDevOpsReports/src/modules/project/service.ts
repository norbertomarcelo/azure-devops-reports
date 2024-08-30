import { Connections } from "../../commons/connections";
import { Project } from "./model";
import dotenv from "dotenv";

dotenv.config();

export async function listProjecsApi() {
  let token = String(process.env.AZURE_DEVOPS_ACCESS_TOKEN);
  let url = String(process.env.AZURE_DEVOPS_URL);
  let org = String(process.env.AZURE_DEVOPS_ORGANIZATION);
  let endpoint = "_apis/projects?api-version=5.0";
  let connection = new Connections(token, url, org);
  try {
    let projectsList: Project[] = [];
    connection.requestAzureDevOpsApi(endpoint).then((projects) => {
      projects.forEach((project: any) => {
        let newProject = new Project(
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
