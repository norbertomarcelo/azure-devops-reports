import tl = require("azure-pipelines-task-lib/task");
import { listProjecs } from "./modules/projects";

async function run() {
  try {
    listProjecs();
    
  } catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
