"use strict";

const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");

const tmpPath = path.join(process.cwd(), "tmp");
const { createTemplate } = require("../../lib/shipengine-core/create-template");

describe("create template", () => {

  beforeEach(async () => {
    await fs.promises.mkdir(tmpPath);
  });

  it("should create a project template with the default name", async () => {
    await createTemplate("shipengine-integration", "carrier", tmpPath);
    const sampleAppPath = path.join(tmpPath, "shipengine-integration");
    expect(sampleAppPath).to.be.a.directory().with.contents(["src", "package.json", "tsconfig.json", "tslint.yaml"]);
  });

  afterEach(async () => {
    await fsExtra.remove(tmpPath);
  });
});
