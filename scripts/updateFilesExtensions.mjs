import * as path from "path";
import * as fs from "fs";

const updateFilesExtensions = (dir, callback) => {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory
      ? updateFilesExtensions(dirPath, callback)
      : callback(path.join(dir, f));
  });
};

export default updateFilesExtensions;
