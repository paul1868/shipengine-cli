import {Command, flags} from "@oclif/command"

export default class IntegrationIndex extends Command {
  static description = "commands based around creating, testing, and deploying a ShipEngine app"

  static flags = {
    help: flags.help({char: "h"}),
  }

  static examples = [
    "apps:new",
  ]

  async run() {
    this._help();
  }
}
