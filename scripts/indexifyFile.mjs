import { mkdir, rename } from "fs";
import { buildFilePattern, dir, nonIndexPattern } from "./constants.mjs";
import getFilePathsWithPattern from "./getFilesPathsWithPattern.mjs";

import * as path from "path";
async function indexifyFiles() {
  try {
    const files = getFilePathsWithPattern(dir, nonIndexPattern);
    const distinctFiles = [
      ...new Set(files.map((file) => file.replace(buildFilePattern, ""))),
    ];
    const fileGroups = {};

    // Group files by name
    distinctFiles.forEach((file) => {
      if (!fileGroups[file]) {
        fileGroups[file] = [];
      }
    });
    for (const file in fileGroups) {
      fileGroups[file] = files.filter((item) => {
        const regex = new RegExp(
          file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + buildFilePattern.source
        );
        return regex.test(item);
      });
    }
    console.log(fileGroups);
    // Create folders and move files
    for (const fileName in fileGroups) {
      await mkdir(fileName, () => {
        console.log("directory created");
      });
      for (const file of fileGroups[fileName]) {
        const fileExtension = file.replace(
          file.replace(buildFilePattern, ""),
          ""
        );
        const newFileName = `index${fileExtension}`;
        const newFilePath = path.join(
          file.replace(buildFilePattern, ""),
          newFileName
        );
        console.log(newFilePath);
        await rename(file, newFilePath, () => {
          console.log(file, newFilePath);
          console.log("file moved");
        });
      }
    }

    console.log("Files have been indexed successfully!");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
await indexifyFiles();
