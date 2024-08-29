import * as azdev from "azure-devops-node-api";
import dotenv from "dotenv";

dotenv.config();

export function getSdkConnection() {
  let url = process.env.AZURE_DEVOPS_URL;
  let org = process.env.AZURE_DEVOPS_ORGANIZATION;
  let orgUrl = `${url}/${org}`;
  let token: string = `${process.env.AZURE_DEVOPS_ACCESS_TOKEN}`;
  let authHandler = azdev.getPersonalAccessTokenHandler(token);
  return new azdev.WebApi(orgUrl, authHandler);
}
