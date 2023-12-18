const dir = "./build";
const mjsPattern = /\.mjs$/;
const jsPattern = /\.js$/;
const dtsPattern = /\.d\.ts$/;
const buildFilePattern = /\.(js|mjs|d.ts)$/g;
const nonIndexPattern = /(?<!index)\.(js|mjs|d.ts)$/g;
const importWithoutExtensionRegex = /import\s+(.*?)\s+from\s+['"]\.(.*?)['"]/g;
const importWithJsExtensionRegex = /import\s+(.*?)\s+from\s+['"](.*?).js['"]/g;

export {
  dir,
  jsPattern,
  mjsPattern,
  importWithoutExtensionRegex,
  importWithJsExtensionRegex,
  nonIndexPattern,
  dtsPattern,
  buildFilePattern,
};
