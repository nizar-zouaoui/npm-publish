import { dir } from "./constants.mjs";
import * as fs from "fs";
import * as path from "path";

function getIndexedFolders(rootDir) {
  let foldersWithIndex = [];

  function traverseDir(currentDir) {
    const files = fs.readdirSync(currentDir);

    if (files.includes("index.js") && currentDir !== rootDir) {
      foldersWithIndex.push(currentDir);
    }

    files.forEach((file) => {
      const filePath = path.join(currentDir, file);
      if (fs.statSync(filePath).isDirectory()) {
        traverseDir(filePath);
      }
    });
  }

  traverseDir(rootDir);
  return foldersWithIndex;
}

const getReturnToRoot = (file) => {
  const treeLevel = file.split("\\").length - 1;
  let returns = "";
  for (let i = 0; i < treeLevel; i++) {
    returns = "../" + returns;
  }
  return returns;
};

const createPackageFileContent = (file) => {
  const directoryTree = file.split("\\");
  directoryTree.shift();
  const fileName = directoryTree[directoryTree.length - 1];
  const indexPath = `${getReturnToRoot(file)}${directoryTree.join("/")}`;
  return `
{
        "name": "${fileName}",
        "description": "This is the export package for ${fileName}",
        "main": "${indexPath}/index.js",
        "module": "${indexPath}/index.mjs",
        "types": "${indexPath}/index.d.ts"
}
`;
};
const folders = getIndexedFolders(dir);
folders.forEach((folder) => {
  const packageFileContent = createPackageFileContent(folder);
  const packageFilePath = path.join(folder, "package.json");
  fs.writeFileSync(packageFilePath, packageFileContent);
  console.log(`Created package.json for ${folder}`);
});

// fs.writeFileSync(
//   path.join(dir, "package.json"),
//   `
// {
//     "name": "nizar-npm-publish-test",
//     "description": "this is a temp project to test exports after build",
//     "version": "0.0.12",
//     "repository": {
//       "type": "git",
//       "url": "https://github.com/nizar-zouaoui/npm-publish"
//     },
//     "main": "index.js",
//     "module": "index.mjs",
//     "types": "index.d.ts",
//     "type": "module",
//     "license": "MIT",
//     "scripts": {
//       "clean": "rimraf build",
//       "build": "yarn clean && yarn build:esm && node ./scripts/update-mjs-extensions.mjs && yarn build:cjs && node ./scripts/indexifyFile.mjs",
//       "build:esm": "tsc -p tsconfig.esm.json",
//       "build:cjs": "tsc -p tsconfig.cjs.json",
//       "test": "echo \\"Error: no test specified\\" && exit 1",
//       "launch": "npx ts-node index"
//     },
//     "devDependencies": {
//       "ts-node": "^10.9.2",
//       "typescript": "^5.3.3"
//     },
//     "dependencies": {
//       "@digitak/tsc-esm": "^3.1.4",
//       "@types/rimraf": "^4.0.5",
//       "date-fns": "^2.30.0",
//       "dynamodb-onetable": "^2.7.1",
//       "rimraf": "^5.0.5",
//       "tsup": "^8.0.1"
//     }
//   }
// `
// );
