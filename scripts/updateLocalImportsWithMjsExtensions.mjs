import { importWithJsExtensionRegex, mjsPattern } from "./constants.mjs";
import getFilePathsWithPattern from "./getFilesPathsWithPattern.mjs";
import * as fs from "fs";

function updateLocalImportsWithMjsExtensions(dir) {
  const files = getFilePathsWithPattern(dir, mjsPattern);

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");

    const updatedContent = content.replace(
      importWithJsExtensionRegex,
      "import $1 from '$2.mjs'"
    );

    fs.writeFileSync(file, updatedContent, "utf8");
  });
  console.log("All imports with extension .js updated with extension .mjs");
}

export default updateLocalImportsWithMjsExtensions;
