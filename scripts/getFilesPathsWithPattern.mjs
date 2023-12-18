import * as path from "path";
import * as fs from "fs";

function getFilePathsWithPattern(dirPath, regexPattern, fileList = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      getFilePathsWithPattern(filePath, regexPattern, fileList);
    } else {
      if (file.match(regexPattern)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

export default getFilePathsWithPattern;
