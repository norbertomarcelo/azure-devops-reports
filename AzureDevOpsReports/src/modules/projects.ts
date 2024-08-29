import { getSdkConnection } from "../commons/connections";

export async function listProjecs() {
  let connection = getSdkConnection();
  let coreApi = await connection.getCoreApi();
  try {
    let projects = await coreApi.getProjects();
    projects.forEach((project) => {
      console.log(`Project: ${project.name}, Id: ${project.id}`);
    });
  } catch (err) {
    console.error("Error fetching projects:", err);
  }
}
