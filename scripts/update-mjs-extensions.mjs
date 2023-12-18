import * as fs from "fs";
import { dir } from "./constants.mjs";
import updateLocalImportsWithMjsExtensions from "./updateLocalImportsWithMjsExtensions.mjs";
import updateFilesExtensions from "./updateFilesExtensions.mjs";
import updateLocalImports from "./updateLocalImports.mjs";

updateLocalImports(dir);

updateFilesExtensions(dir, (filePath) => {
  if (filePath.endsWith(".js")) {
    const newFilePath = filePath.replace(".js", ".mjs");
    fs.rename(filePath, newFilePath, (err) => {
      if (err) throw err;
      console.log(`${filePath} renamed to ${newFilePath}`);
    });
  }
});

updateLocalImportsWithMjsExtensions(dir);
