import tl = require("azure-pipelines-task-lib/task");


async function run() {
  try {
    console.log("Hello!!")
    
  } catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
