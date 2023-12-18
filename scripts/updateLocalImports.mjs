import { importWithoutExtensionRegex, jsPattern } from "./constants.mjs";
import getFilePathsWithPattern from "./getFilesPathsWithPattern.mjs";
import * as fs from "fs";

function updateLocalImports(dir) {
  const files = getFilePathsWithPattern(dir, jsPattern);

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");

    const updatedContent = content.replace(
      importWithoutExtensionRegex,
      `import $1 from '$2/index.js'`
    );

    fs.writeFileSync(file, updatedContent, "utf8");
  });

  console.log("All local imports updated with extension .js");
}

export default updateLocalImports;
