import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";
import { fileExists } from './utils/files';

/**
 * Create a new shipengine integration template
 */
export async function createTemplate(projectName: string, appType:string, cwd?: string): Promise<void> {

  const createCwd = cwd ? cwd : process.cwd();
  const templatePath = path.join(__dirname, "templates", appType);
  const newProjectPath = path.join(createCwd, projectName);

  const projectExists = await fileExists(newProjectPath);

  if (!projectExists) {
    await fs.promises.mkdir(newProjectPath);
    await fsExtra.copy(templatePath, newProjectPath);

    const data = await fs.promises.readFile(path.join(newProjectPath, "package.json"), "utf-8");
    const replacedData = data.replace(/<PROJECT_NAME>/g, projectName);
    await fs.promises.writeFile(path.join(newProjectPath, "package.json"), replacedData, "utf-8");

    // TODO: uncomment this once the package is publicly available, there's some weird linking issues.
    // execSync("npm install", { cwd: newProjectPath });
  }
  else {
    throw new Error(`A project with the name ${projectName} already exists`);
  }
}
