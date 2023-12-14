// make this file go through an entire directory ./build and its subdirectories and update all the files' extensions that are .js to .mjs

const fs = require("fs");
const path = require("path");

const dir = "./build";

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
