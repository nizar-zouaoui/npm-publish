const fs = require("fs");
const path = require("path");
const folderPath = "./build/@types";

function getDTsFiles(folderPath) {
  const files = [];

  function traverseDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        traverseDirectory(itemPath);
      } else if (stats.isFile() && item.endsWith(".d.ts")) {
        files.push(itemPath);
      }
    }
  }

  traverseDirectory(folderPath);
  return files;
}

function updatePackageTypesVersions() {
  const dtsFiles = getDTsFiles(folderPath);
  const dtsExportPaths = dtsFiles
    .map((file) =>
      file
        .replace(".d.ts", "")
        .replace("build\\@types\\index", "")
        .replace("build\\@types\\", "")
        .replace(/\\/g, "/")
    )
    .filter((file) => !!file.length);
  console.log(dtsExportPaths);
  const packagePath = path.join(__dirname, "..", "package.json");
  const packageData = fs.readFileSync(packagePath, "utf8");
  const packageJson = JSON.parse(packageData);

  packageJson.typesVersions = getTypesVersions(dtsExportPaths);
  packageJson.exports = getExports(dtsExportPaths);

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

  console.log("Package.json updated successfully!");
}

const getExports = (files) => {
  const exports = {
    ".": {
      require: "./build/cjs/index.js",
      import: "./build/esm/index.js",
    },
  };
  files.forEach((file) => {
    exports[`./${file.replace("/index", "")}`] = {
      require: `./build/cjs/${file}.js`,
      import: `./build/esm/${file}.js`,
    };
  });
  return exports;
};

const getTypesVersions = (files) => {
  const typesVersion = {
    ">=4": {},
  };
  files.forEach((file) => {
    typesVersion[">=4"][file.replace("/index", "")] = [`build/@types/${file}`];
  });
  return typesVersion;
};

updatePackageTypesVersions();
