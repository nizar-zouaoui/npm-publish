const fs = require("fs");
const path = require("path");

const dir = "./build";
const pattern = /\.mjs$/;

const walk = (dir, callback) => {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
};

walk(dir, (filePath) => {
  if (filePath.endsWith(".js")) {
    const newFilePath = filePath.replace(".js", ".mjs");
    fs.rename(filePath, newFilePath, (err) => {
      if (err) throw err;
      console.log(`${filePath} renamed to ${newFilePath}`);
    });
  }
});

function getMjsFilePaths(dirPath, regexPattern, fileList = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      getMjsFilePaths(filePath, regexPattern, fileList);
    } else {
      if (file.match(regexPattern)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

function updateMjsExtensions(dir) {
  const files = getMjsFilePaths(dir, pattern);

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");

    const updatedContent = content.replace(
      /import\s+(.*?)\s+from\s+['"](.*?).js['"]/g,
      "import $1 from '$2.mjs'"
    );

    fs.writeFileSync(file, updatedContent, "utf8");
  });
}

// Usage
updateMjsExtensions(dir);
