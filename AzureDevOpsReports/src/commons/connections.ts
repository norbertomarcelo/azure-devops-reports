import dotenv from "dotenv";

dotenv.config();

export class Connections {
  private token: string;
  private url: string;
  private org: string;

  constructor() {
    this.token = String(process.env.AZURE_DEVOPS_ACCESS_TOKEN);
    this.url = String(process.env.AZURE_DEVOPS_URL);
    this.org = String(process.env.AZURE_DEVOPS_ORGANIZATION);
  }

  async requestAzureDevOpsApi(endpoint: string): Promise<any[]> {
    try {
      const baseUrl: string = `${this.url}/${this.org}/${endpoint}`;
      const headers: Headers = new Headers({
        Accept: "application/json",
        Authorization: `Basic ${btoa(`:${this.token}`)}`,
      });
      const response: Response = await fetch(baseUrl, {
        method: "GET",
        headers: headers,
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const projects = data.value;

      return projects;
    } catch (error) {
      console.error("Erro ao consumir a API:", error);
      throw error;
    }
  }
}
