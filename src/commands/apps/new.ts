import {Command, flags} from "@oclif/command"
import { createTemplate } from '../../shipengine-core/create-template'
import { cliPrompt } from '../../shipengine-core/utils/cli-prompt'

export class New extends Command {
  static description = "create a new project to develop a custom ShipEngine app"

  static flags = {
    help: flags.help({char: "h"}),
  }

  static examples = [
    "apps:new",
  ]

  async run() {

    

    const answers = await cliPrompt(
      [
        {
          type: "input",
          name: "project-name",
          message: "What would you like to name your project?",
          default: "shipengine-integration",
          validate: (value: string) => {
            const re = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
            const pass = value.match(re);
  
            if (pass) {
              return true;
            }
  
            return "Please enter a valid npm package name (ex: shipengine-integration)";
          }
        },
        {
          type: "list",
          name: "app-type",
          message: "What project type would you like to build?",
          choices: ["carrier", "order-source"],
          default: "carrier"
        }
      ]
    );
  
    const projectName = answers["project-name"] as string;
    const appType = answers["app-type"] as string;

    await createTemplate(projectName, appType);
  }
}
