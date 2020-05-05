"use strict";

const { expect, test } = require("@oclif/test");
const sinon = require("sinon");
const fs = require("fs");
const path = require("path");

const fsExtra = require("fs-extra");
const cliPrompt = require("../../lib/shipengine-core/utils/cli-prompt");
const { New } = require("../../lib/commands/apps/new");
const tmpPath = path.join(process.cwd(), "tmp");
let originalPath;

describe("apps:new", () => {

  beforeEach(async () => {
    await fs.promises.mkdir(tmpPath);

    sinon.stub(cliPrompt, "cliPrompt").resolves({
      "project-name": "shipengine-integration",
      "app-type": "carrier"
    });

    originalPath = process.cwd();
    process.chdir(tmpPath);
  });


  it("runs apps info message", async () => {
    await New.run([]);
    const sampleAppPath = path.join(tmpPath, "shipengine-integration");
    expect(sampleAppPath).to.be.a.directory().with.contents(["src", "package.json", "tsconfig.json", "tslint.yaml"]);
  });

  afterEach(async () => {
    process.chdir(originalPath);
    await fsExtra.remove(tmpPath);
  });
});
