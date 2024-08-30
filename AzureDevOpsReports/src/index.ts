import tl = require("azure-pipelines-task-lib/task");
import { listProjecsApi } from "./modules/project/service";

async function run() {
  try {
    let list = listProjecsApi();
    console.log(list)
    
  } catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
