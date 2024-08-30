import * as azdev from "azure-devops-node-api";

export class Connections {
  private token: string;
  private url: string;
  private org: string;

  constructor(token: string, url: string, org: string) {
    this.token = token;
    this.url = url;
    this.org = org;
  }

  async requestAzureDevOpsApi(endpoint: string): Promise<[]> {
    try {
      let baseUrl = `${this.url}/${this.org}/${endpoint}`;
      let headers = new Headers({
        Accept: "application/json",
        Authorization: `Basic ${btoa(`:${this.token}`)}`,
      });
      let response = await fetch(baseUrl, {
        method: "GET",
        headers: headers,
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Erro ao consumir a API:", error);
      throw error;
    }
  }

  getSdkConnection() {
    let orgUrl = `${this.url}/${this.org}`;
    let authHandler = azdev.getPersonalAccessTokenHandler(this.token);
    return new azdev.WebApi(orgUrl, authHandler);
  }
}
